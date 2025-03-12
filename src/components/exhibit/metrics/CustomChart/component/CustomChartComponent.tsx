import { FunctionComponent, useMemo } from 'react';
import {
  BulkCustomChartData,
  type ChartColor,
  type ChartConfiguration,
  type CustomChartData,
} from '../../../../../app/services/metrics';
import { applyOpacity, darken } from '../../../../../utils/color';
import { exhaustiveGuard } from '../../../../../utils/usefulTS';
import { MetricsCardProps } from '../../../../common/MetricsCard';
import { MetricsPanel } from '../../../../common/MetricsPanel';
import {
  BarChart,
  type BarChartProps,
} from '../../../../common/charts/BarChart';
import { type BarDataSetProps } from '../../../../common/charts/BarChart/BarChartHelpers';
import {
  addDataPoint,
  parseDisplayValue,
  rgbBaseChartPalette,
} from './CustomChartComponentHelpers';
import { DatePeriod } from '../../../../common/DateControl';

interface CustomChartComponentProps {
  chartConfiguration?: ChartConfiguration;
  isConfigLoading?: boolean;
  chartData?: CustomChartData;
  isDataLoading?: boolean;
  period?: DatePeriod;
  comparisonChartData?: Array<BulkCustomChartData>;
}

type ChartPalette = Record<string, { hover: string; default: string }>;

type ColorCounts = Record<ChartColor, number>;

type BarDataSets = Record<string, BarDataSetProps>;

const defaultBucketCount = 10; // This should be dynamically set by date range filter

export const CustomChartComponent: FunctionComponent<
  CustomChartComponentProps
> = ({
  isConfigLoading = false,
  isDataLoading = false,
  chartConfiguration,
  chartData,
  period = 'day',
  comparisonChartData,
}) => {
  const isLoading: boolean = useMemo(() => {
    return isConfigLoading || isDataLoading;
  }, [isConfigLoading, isDataLoading]);

  const chartPalette: ChartPalette = useMemo(() => {
    const pallette: ChartPalette = {};

    const colorCounts: ColorCounts = {
      pink: 0,
      orange: 0,
      yellow: 0,
      green: 0,
      blue: 0,
      purple: 0,
    };
    if (chartData) {
      chartData?.datasets?.forEach((datasetConfig) => {
        const { hue } = datasetConfig;
        const datasetColor = darken(
          rgbBaseChartPalette[hue],
          0.1 * colorCounts[hue]
        );

        colorCounts[hue] += 1;

        pallette[datasetConfig.name] = {
          default: applyOpacity(datasetColor, 0.6),
          hover: datasetColor,
        };
      });
    } else if (comparisonChartData) {
      comparisonChartData.forEach((chartDataPoint) => {
        chartDataPoint.chartData?.datasets?.forEach((datasetConfig) => {
          const { hue } = datasetConfig;
          const datasetColor = darken(
            rgbBaseChartPalette[hue],
            0.1 * colorCounts[hue]
          );

          colorCounts[hue] += 1;

          pallette[datasetConfig.name] = {
            default: applyOpacity(datasetColor, 0.6),
            hover: datasetColor,
          };
        });
      });
    }

    return pallette;
  }, [chartData, comparisonChartData]);

  const metricsCardProps: Array<MetricsCardProps> = useMemo(() => {
    const cards = chartConfiguration?.metricsCards?.map(
      (cardFormat, i): MetricsCardProps => {
        let subtitle = '';
        switch (cardFormat.metricScope) {
          case 'user':
            subtitle = 'Per User';
            break;
          case 'session':
            subtitle = 'Per Session';
            break;
          case 'bucket':
            // When date range filters are introduced, this logic will have to be updated
            subtitle = 'Per Day';
            break;
          case 'period':
            subtitle = 'In Selected Period';
            break;
          default:
            exhaustiveGuard(cardFormat.metricScope);
        }

        return {
          title: cardFormat.title,
          subtitle,
          DotProps: cardFormat.datasetName
            ? { color: chartPalette?.[cardFormat.datasetName]?.default }
            : undefined,
          value: parseDisplayValue(
            cardFormat.dataType,
            chartData?.cardValues?.[i],
            cardFormat.unit
          ),
          variant: cardFormat.dataType === 'text' ? 'textual' : 'numerical',
        };
      }
    );

    return cards !== undefined ? cards : [];
  }, [chartConfiguration, chartData, chartPalette]);

  const barChartProps: BarChartProps = useMemo(() => {
    if (
      chartConfiguration?.graphType === 'groupedBar' ||
      chartConfiguration?.graphType === 'stackedBar'
    ) {
      const datasets: BarDataSets = {};
      const comparisonData: Array<BarDataSetProps> = [];
      const buckets: Array<string> = [];

      if (chartData) {
        const dataPointCounts: Record<string, Array<number>> = {};

        chartData.datasets.forEach((datasetConfig) => {
          datasets[datasetConfig.name] = {
            label: datasetConfig.name,
            backgroundColor: chartPalette[datasetConfig.name].default,
            hoverBackgroundColor: chartPalette[datasetConfig.name].hover,
            data: [],
          };

          dataPointCounts[datasetConfig.name] = [];
        });

        chartData.buckets.forEach((bucket, i) => {
          buckets.push(bucket.label);

          bucket.data.forEach((dataPoint) => {
            const name = dataPoint.datasetName;
            if (datasets[name]) {
              // Check how many datapoints in this set we've seen so far
              if (dataPointCounts[name][i] >= 1) {
                dataPointCounts[name][i] += 1;

                const newDatasetName = `${name}${dataPointCounts[name][i]}`;
                if (datasets[newDatasetName] === undefined) {
                  datasets[newDatasetName] = {
                    backgroundColor: datasets[name].backgroundColor,
                    hoverBackgroundColor: datasets[name].hoverBackgroundColor,
                    label: datasets[name].label,
                    data: [],
                  };
                }

                addDataPoint(datasets[newDatasetName].data, dataPoint.value, i);
              } else {
                // We've only seen one dataPoint in this set so far
                dataPointCounts[name][i] = 1;
                addDataPoint(datasets[name].data, dataPoint.value, i);
              }
            }
          });
        });
      } else if (comparisonChartData) {
        let bucketsAdded = false;
        comparisonChartData.forEach((bulkChartDataSet) => {
          const comparisonDataSet: BarDataSets = {};
          const dataPointCounts: Record<string, Array<number>> = {};

          bulkChartDataSet.chartData.datasets.forEach((datasetConfig) => {
            comparisonDataSet[datasetConfig.name] = {
              label: datasetConfig.name,
              backgroundColor: chartPalette[datasetConfig.name].default,
              hoverBackgroundColor: chartPalette[datasetConfig.name].hover,
              data: [],
              stack: bulkChartDataSet.exhibitId.toString(),
            };

            dataPointCounts[datasetConfig.name] = [];
          });

          bulkChartDataSet.chartData.buckets.forEach((bucket, i) => {
            if (!bucketsAdded) {
              buckets.push(bucket.label);
            }

            bucket.data.forEach((dataPoint) => {
              const name = dataPoint.datasetName;
              if (comparisonDataSet[name]) {
                // Check how many datapoints in this set we've seen so far
                if (dataPointCounts[name][i] >= 1) {
                  dataPointCounts[name][i] += 1;

                  const newDatasetName = `${name}${dataPointCounts[name][i]}`;
                  if (comparisonDataSet[newDatasetName] === undefined) {
                    comparisonDataSet[newDatasetName] = {
                      backgroundColor: comparisonDataSet[name].backgroundColor,
                      hoverBackgroundColor:
                        comparisonDataSet[name].hoverBackgroundColor,
                      label: comparisonDataSet[name].label,
                      data: [],
                      stack: comparisonDataSet[name].stack,
                    };
                  }

                  addDataPoint(
                    comparisonDataSet[newDatasetName].data,
                    dataPoint.value,
                    i
                  );
                } else {
                  // We've only seen one dataPoint in this set so far
                  dataPointCounts[name][i] = 1;
                  addDataPoint(
                    comparisonDataSet[name].data,
                    dataPoint.value,
                    i
                  );
                }
              }
            });
          });
          bucketsAdded = true;
          comparisonData.push(...Object.values(comparisonDataSet));
        });
      }

      return {
        buckets,
        datasets:
          comparisonData.length !== 0
            ? comparisonData
            : Object.values(datasets),
        axisOptions:
          chartConfiguration.chartOptions?.yAxisOptions === 'duration'
            ? { position: 'end', label: 'm' }
            : undefined,
        bucketCount: defaultBucketCount,
        isLoading,
        variant:
          chartConfiguration.graphType === 'stackedBar' ? 'stacked' : 'grouped',
        showLegend: !chartConfiguration.chartOptions?.hiddenLegend, // If this is false-y, the legend will be shown
        topNDatasets: chartConfiguration.chartOptions?.topNDatasets,
        tooltipDataset: chartData?.tooltipData,
      };
    }

    return {
      buckets: [],
      datasets: [],
      bucketCount: defaultBucketCount,
      isLoading,
    };
  }, [
    chartConfiguration,
    chartData,
    isLoading,
    chartPalette,
    comparisonChartData,
  ]);

  return (
    <MetricsPanel
      className='CustomChart'
      metricsCardProps={metricsCardProps}
      isLoading={isLoading}
    >
      <BarChart period={period} {...barChartProps} />
    </MetricsPanel>
  );
};
