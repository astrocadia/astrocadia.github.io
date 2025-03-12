import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import type { ChartOptions, TooltipItem, TooltipModel } from 'chart.js';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js';
import cx from 'classnames';
import { DateTime } from 'luxon';
import { FunctionComponent, useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { CircularProgress } from '../../CircularProgress';
import { useMobileMediaQuery } from '../../hooks/useMobileMediaQuery';
import { AxisOptions } from '../common/chartTypes';
import { useSplitChart } from '../common/hooks/useSplitChart';
import './BarChart.css';
import {
  HORIZONTAL_BAR_OPTIONS_LOADED,
  HORIZONTAL_BAR_OPTIONS_UNLOADED,
  formatBarDataChartjs,
  type BarChartVariant,
  type BarDataSetProps,
} from './BarChartHelpers';
import { IconButton } from '../../buttons/IconButton';
import { DatePeriod } from '../../DateControl';
import { TooltipBox } from '../../TooltipBox';
import {
  ListTooltipContent,
  ListTooltipContentData,
} from '../../ListTooltipContent';
import { PresenceTooltipContent } from '../../PresenceTooltipContent/PresenceTooltipContent';
import { CustomTooltipDataPoints } from '../../../../app/services/metrics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
type TooltipData = {
  top: number;
  left: number;
  label: string;
  value: TooltipItem<'bar'>[];
  drawDirection: 'left' | 'right' | 'center';
  dataIndex: number;
};

export interface BarChartProps {
  datasets: Array<BarDataSetProps>;
  buckets: Array<string>; // ISO date strings
  axisOptions?: AxisOptions;
  bucketCount?: number;
  isLoading?: boolean;
  variant?: BarChartVariant;
  showLegend?: boolean;
  period?: DatePeriod;
  topNDatasets?: number;
  tooltipConfiguration?: 'standard' | 'presence';
  tooltipContextualData?: Array<Array<number>>;
  tooltipDataset?: Array<Array<CustomTooltipDataPoints>>;
}

export const BarChart: FunctionComponent<BarChartProps> = ({
  datasets,
  buckets,
  isLoading = false,
  variant = 'stacked',
  axisOptions = { position: 'end', label: '' },
  showLegend = true,
  bucketCount = 10,
  period = 'day',
  topNDatasets = undefined,
  tooltipConfiguration = 'standard',
  tooltipContextualData = [[]],
  tooltipDataset = [],
}) => {
  const hasSeparateTooltipDataset = tooltipDataset.length > 0;
  const browserTimezoneOffset = new Date().getTimezoneOffset();
  const mobile = useMobileMediaQuery();
  const [tooltipConfig, setTooltipConfig] = useState<TooltipData>({
    top: 0,
    left: 0,
    label: '',
    value: [],
    drawDirection: 'left',
    dataIndex: 0,
  });
  const [tooltipShown, setTooltipShown] = useState(false);
  const defaultLabels = useMemo(
    () =>
      [...Array(bucketCount)]
        .map((_, i) =>
          DateTime.now()
            .minus({ days: i + 1 })
            .toFormat('MMM dd')
        )
        .reverse(),
    [bucketCount]
  );

  const noData = useMemo(() => {
    const dataFound = datasets?.some((dataset) =>
      dataset.data?.some((value) => value)
    );
    return !dataFound;
  }, [datasets]);
  const barChartOptions: ChartOptions<'bar'> = useMemo(() => {
    if (!noData && !isLoading) {
      const chartOpts = HORIZONTAL_BAR_OPTIONS_LOADED({
        variant,
        axisOptions,
        showLegend,
      });
      if (chartOpts.plugins && chartOpts.plugins.tooltip) {
        chartOpts.plugins.tooltip = {
          enabled: false,
          external: (data: { tooltip: TooltipModel<'bar'> }) => {
            const { tooltip } = data;
            // hide the tooltip
            if (tooltipShown && tooltip.opacity === 0) {
              setTooltipShown(false);
            }
            if (!tooltipShown && tooltip.opacity !== 0) {
              const left = tooltip.caretX;
              const top = tooltip.caretY;

              // set values
              const { label } = tooltip.dataPoints[0];
              const { dataIndex } = tooltip.dataPoints[0];
              let value;
              if (
                hasSeparateTooltipDataset &&
                dataIndex < tooltipDataset.length
              ) {
                const currentTooltipData = tooltipDataset[dataIndex];
                value = currentTooltipData.map((item, index) => {
                  return {
                    dataset: {
                      label: item.label,
                    },
                    formattedValue: item.value,
                    raw: item.value,
                    datasetIndex: index,
                  } as TooltipItem<'bar'>;
                });
              } else {
                value = tooltip.dataPoints;
              }
              const drawDirection = tooltip.xAlign;

              setTooltipConfig({
                top,
                left,
                label,
                value,
                drawDirection,
                dataIndex,
              });
              setTooltipShown(true);
            }
          },
        };
      }
      return chartOpts;
    }
    return HORIZONTAL_BAR_OPTIONS_UNLOADED({
      variant,
      axisOptions,
      showLegend,
    });
  }, [
    noData,
    isLoading,
    variant,
    axisOptions,
    showLegend,
    tooltipShown,
    hasSeparateTooltipDataset,
    tooltipDataset,
  ]);

  const allData = useMemo(() => {
    if (isLoading) {
      return {
        labels: defaultLabels,
        datasets: [
          { label: 'Loading', data: defaultLabels.map(() => undefined) },
        ],
      };
    }
    if (!noData) {
      return formatBarDataChartjs(
        buckets,
        datasets,
        browserTimezoneOffset,
        period,
        variant,
        topNDatasets
      );
    }
    return {
      labels: formatBarDataChartjs(
        buckets,
        datasets,
        browserTimezoneOffset,
        period,
        variant,
        topNDatasets
      ).labels,
      datasets: datasets.map((dataset) => {
        return {
          label: dataset.label,
          data: defaultLabels.map(() => undefined),
          backgroundColor: dataset.backgroundColor,
          stack: dataset.stack,
        };
      }),
    };
  }, [
    isLoading,
    noData,
    buckets,
    datasets,
    browserTimezoneOffset,
    period,
    variant,
    defaultLabels,
    topNDatasets,
  ]);

  const { displayedData, leftButtonProps, rightButtonProps } = useSplitChart(
    allData,
    mobile
  );

  return (
    <div className={cx('BarChart', { BarChart__mobile: mobile })}>
      <div className='BarChart__chart'>
        {isLoading && <CircularProgress className='BarChart__spinner' />}
        <Bar options={barChartOptions} data={displayedData} />
      </div>
      {tooltipShown && (
        <TooltipBox
          caretX={tooltipConfig.left}
          caretY={tooltipConfig.top}
          drawDirection={tooltipConfig.drawDirection}
          tooltipLabel={tooltipConfig.label}
        >
          {/* TODO - split out tooltip content selection into a separate class  */}
          {tooltipConfiguration === 'standard' && (
            <ListTooltipContent
              tooltipData={
                tooltipConfig.value as unknown as Array<ListTooltipContentData>
              }
              showDot={!hasSeparateTooltipDataset}
            />
          )}
          {tooltipConfiguration === 'presence' && (
            <PresenceTooltipContent
              tooltipData={
                tooltipConfig.value as unknown as Array<ListTooltipContentData>
              }
              activityScoreArrays={tooltipContextualData}
              viewIndex={tooltipConfig.dataIndex}
            />
          )}
        </TooltipBox>
      )}
      {noData && !isLoading && (
        <div className='BarChart__emptyText'>No data available</div>
      )}
      {mobile && !noData && (
        <div className='BarChart__chartButtons'>
          <IconButton
            onClick={leftButtonProps.onClick}
            disabled={leftButtonProps.disabled}
            size='small'
            className='BarChart_chartButton'
          >
            <ArrowBackIosNewIcon className='BarChart__buttonIcon' />
          </IconButton>
          <IconButton
            onClick={rightButtonProps.onClick}
            disabled={rightButtonProps.disabled}
            size='small'
            className='BarChart_chartButton'
          >
            <ArrowForwardIosIcon className='BarChart__buttonIcon' />
          </IconButton>
        </div>
      )}
    </div>
  );
};
