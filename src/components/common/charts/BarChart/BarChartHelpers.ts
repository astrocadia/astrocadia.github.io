import type {
  BarOptions,
  BorderOptions,
  ChartOptions,
  FontSpec,
} from 'chart.js';
import { DateTime } from 'luxon';
import { DatePeriod } from '../../DateControl';
import {
  type AxisOptions,
  type GenericChartData,
  type GenericDataSet,
} from '../common/chartTypes';

export type BarChartVariant = 'stacked' | 'grouped';

const defaultAxisOptions: AxisOptions = {
  position: 'end',
  label: '',
};

type BarChartConfig = {
  variant: BarChartVariant;
  axisOptions: AxisOptions;
  showLegend: boolean;
};

const CHART_FONT: Partial<FontSpec> = {
  family: '"DM Sans Regular 400", sans-serif',
  size: 12.8, // --typescale-size-default-s
  style: 'normal',
};

const AXIS_FONT_COLOR = 'rgb(109, 117, 128, 1)'; // --typography-secondary-color
const LEGEND_FONT_COLOR = AXIS_FONT_COLOR;
const LEGEND_POINT_HEIGHT = 5;
const LEGEND_POINT_WIDTH = LEGEND_POINT_HEIGHT;

const GRID_COLOR = 'rgb(235, 238, 242, 1)'; // --base-color-neutral-300

const AXIS_BORDER: Partial<BorderOptions> = {
  display: true,
  color: 'rgb(218, 222, 226, 1)', // --base-color-neutral-400
};

export const HORIZONTAL_BAR_OPTIONS_LOADED = ({
  variant = 'stacked',
  axisOptions = defaultAxisOptions,
  showLegend = true,
}: BarChartConfig): ChartOptions<'bar'> => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
    },
    plugins: {
      legend: {
        display: showLegend,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          boxHeight: LEGEND_POINT_HEIGHT,
          boxWidth: LEGEND_POINT_WIDTH,
          pointStyle: 'circle',
          padding: 16,
          font: CHART_FONT,
          color: LEGEND_FONT_COLOR,
          filter: (legendItem, chartData) => {
            /* 
             This callback seems to be called for every data point in every bucket.
             So creating a hash map to track which legend items we've seen before in the legendItem array
             doesn't work because every legendItem appears multiple times in the legendItem array.
             Also because the legendItem array is managed by ChartJS, we have no other way to filter it at this point.

             So this strategy determines the unique datasets from the chartData param and
             will filter the legendItems properly no matter how often they appear in the legendItem array.
            */
            const allDatasets = chartData.datasets.map(
              (dataset) =>
                // Dataset descriptor string based on the dataset name and color
                `${dataset.label}+${dataset.hoverBackgroundColor}`
            );

            const uniqueDatasets = [...new Set(allDatasets)];

            const uniqueDatasetIndexes = uniqueDatasets.map((dataset) => {
              return allDatasets.indexOf(dataset);
            });

            if (legendItem.datasetIndex) {
              return uniqueDatasetIndexes.includes(legendItem.datasetIndex);
            }
            // Benefit of the doubt: if this legendItem is somehow not tied to a datasetIndex, we include it
            return true;
          },
        },
      },
      tooltip: {},
    },
    scales: {
      y: {
        stacked: variant === 'stacked',
        type: 'linear',
        grace: '5%',
        ticks: {
          callback: (value) => {
            if (axisOptions.position === 'start') {
              return axisOptions.label + value;
            }
            return value + axisOptions.label;
          },
          precision: 0,
          maxTicksLimit: 7,
          padding: 8,
          color: AXIS_FONT_COLOR,
          font: CHART_FONT,
        },
        grid: {
          tickLength: 0,
          color: GRID_COLOR,
        },
        border: AXIS_BORDER,
      },
      x: {
        stacked: variant === 'stacked',
        ticks: {
          padding: 16,
          color: AXIS_FONT_COLOR,
          font: CHART_FONT,
        },
        grid: {
          tickLength: 0,
          color: GRID_COLOR,
        },
        border: AXIS_BORDER,
      },
    },
  };
};

export const HORIZONTAL_BAR_OPTIONS_UNLOADED = ({
  axisOptions = defaultAxisOptions,
  showLegend = true,
}: BarChartConfig): ChartOptions<'bar'> => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
    },
    plugins: {
      legend: {
        display: showLegend,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          boxWidth: LEGEND_POINT_WIDTH,
          boxHeight: LEGEND_POINT_HEIGHT,
          padding: 16,
          font: CHART_FONT,
          color: LEGEND_FONT_COLOR,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 50,
        ticks: {
          callback: (value) => {
            if (axisOptions.position === 'start') {
              return axisOptions.label + value;
            }
            return value + axisOptions.label;
          },
          stepSize: 10,
          padding: 8,
          color: AXIS_FONT_COLOR,
          font: CHART_FONT,
        },
        grid: {
          tickLength: 0,
          color: GRID_COLOR,
        },
        border: AXIS_BORDER,
      },
      x: {
        ticks: {
          padding: 16,
          color: AXIS_FONT_COLOR,
          font: CHART_FONT,
        },
        grid: {
          tickLength: 0,
          color: GRID_COLOR,
        },
        border: AXIS_BORDER,
      },
    },
  };
};

export interface BarDataSetProps extends GenericDataSet {
  backgroundColor: string;
  hoverBackgroundColor: string;
  stack?: string;
}

interface BarDataSet extends BarDataSetProps {
  borderRadius: number;
  barPercentage: number;
  categoryPercentage: number;
  borderWidth: BarOptions['borderWidth'];
  borderColor: string;
}

export interface BarChartData extends GenericChartData {
  datasets: Array<BarDataSet>;
}

export const showTopNData = (
  dataset: Array<BarDataSetProps>,
  topNDatasets: number,
  bucketCount: number
): Array<BarDataSetProps> => {
  // Sort our dataset by highest total number of it's data values across the time interval
  const sortedDataset = dataset
    .map((data) => {
      return {
        label: data.label,
        total: data.data.reduce((a: number, curr = 0) => a + curr, 0),
      };
    })
    .sort((a, b) => b.total - a.total);

  // Determine how many datasets we're actually showing with equal numbers of values
  // This is done first to determine if we actually need to filter data at all,
  // or with collisions we already have the top N data displayed
  let includedDataCount = topNDatasets;
  const numberDatasets = sortedDataset.length;
  for (let i = 0; i < includedDataCount; i++) {
    if (sortedDataset[i].total === sortedDataset[i + 1].total) {
      includedDataCount += 1;
      if (includedDataCount > numberDatasets) {
        return dataset;
      }
    }
  }

  // Now that we know how many datasets to actually include
  if (numberDatasets > includedDataCount) {
    const showList = [];
    for (let j = 0; j < includedDataCount; j++) {
      showList.push(sortedDataset[j].label);
    }

    const filteredDataProps = [];
    let otherDataTotal: Array<number> = Array(bucketCount).fill(0);
    // Iterate through the dataset - if we are showing the data, add it straight to the array.
    // Otherwise, add it to our other tracking array
    for (let k = 0; k < dataset.length; k++) {
      if (showList.includes(dataset[k].label)) {
        filteredDataProps.push(dataset[k]);
      } else {
        otherDataTotal = otherDataTotal.map(
          (num, index) => num + (dataset[k].data[index] ?? 0)
        );
      }
    }
    // Put our other prop at the beginning of the list so it's drawn first and at the bottom of the stack
    filteredDataProps.unshift({
      label: 'Other',
      data: otherDataTotal,
      backgroundColor: 'rgba(176, 183, 191, 0.6)',
      hoverBackgroundColor: 'rgba(176, 183, 191, 1)',
    });
    return filteredDataProps;
  }

  return dataset;
};

export const formatBarDataChartjs = (
  buckets: Array<string>,
  dataProps: Array<BarDataSetProps>,
  timezoneOffset: number,
  period: DatePeriod,
  variant: BarChartVariant = 'stacked',
  topNDatasets?: number
): BarChartData => {
  let labels: Array<string> = [];
  if (period === 'day' || period === 'week' || period === 'month') {
    labels = buckets.map((bucket) => {
      return DateTime.fromISO(bucket)
        .plus({ minutes: timezoneOffset })
        .toFormat('MMM dd');
    });
  } else if (period === 'year') {
    labels = buckets.map((bucket) => {
      return DateTime.fromISO(bucket)
        .plus({ minutes: timezoneOffset })
        .toFormat('MMM');
    });
  }
  let filteredData = dataProps;
  if (topNDatasets && topNDatasets < dataProps.length) {
    filteredData = showTopNData(dataProps, topNDatasets, buckets.length);
  }

  const datasets = filteredData.map((props) => {
    return {
      label: props.label,
      data: props.data,
      backgroundColor: props.backgroundColor,
      hoverBackgroundColor: props.hoverBackgroundColor,
      borderRadius: variant === 'stacked' ? 6 : 4,
      barPercentage: variant === 'stacked' ? 0.5 : 0.8,
      categoryPercentage: variant === 'stacked' ? 0.8 : 0.7,
      stack: props.stack,
      // Create the gap for stacked bars
      borderWidth: {
        top: variant === 'stacked' ? 2 : 0,
      },
      borderColor: 'rgba(0,0,0,0)',
    };
  });

  return {
    labels,
    datasets,
  };
};
