import BarChartIcon from '@mui/icons-material/BarChart';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { DateTime } from 'luxon';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FunctionComponent,
  type ReactNode,
  type SyntheticEvent,
} from 'react';
import { useGetExhibitQuery } from '../../../app/services/exhibit';
import {
  type ChartSummary,
  type CustomChartSummary,
  useListChartsQuery,
} from '../../../app/services/metrics';
import { startOf } from '../../../utils/date';
import { isNil } from '../../../utils/lang';
import { sortCompareObjectByStringField } from '../../../utils/sort';
import { EXHIBIT_TAB } from '../../../views/routes/exhibitRoutePaths';
import { MainPanelContent, MainPanelHeader } from '../../MainPanel';
import type { DatePeriod } from '../../common/DateControl';
import { DatePickerBar } from '../../common/DatePickerBar/DatePickerBar';
import { Tab, type TabProps } from '../../common/Tab';
import { Tabs } from '../../common/Tabs';
import { CustomChart } from './CustomChart';
import { InteractionChart } from './InteractionsChart';
import { PresenceIcon } from '../../common/icons';
import { PresenceAnalyticsChart } from './PresenceAnalysticsChart';
import { VisitorsChart } from './VisitorsChart';
import './ExhibitMetrics.css';

interface ExhibitMetricsProps {
  exhibitId: number;
}

interface LabeledTabProps extends TabProps {
  label: string;
}

export type ChartOption = {
  tabProps: LabeledTabProps;
  chart: ReactNode;
};

export const ExhibitMetrics: FunctionComponent<ExhibitMetricsProps> = ({
  exhibitId,
}) => {
  const { data: exhibit } = useGetExhibitQuery({ exhibitId });
  const [date, setDate] = useState<DateTime | null>(
    startOf(DateTime.now(), 'week')
  );
  const [period, setPeriod] = useState<DatePeriod>('week');
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const { data: chartList, isLoading: chartsLoading } = useListChartsQuery(
    !isNil(exhibitId) ? { exhibitId } : skipToken
  );

  // We need to reset the tab index when the exhibitId changes because we don't know if the next exhibit will have the same chart set
  useEffect(() => {
    setCurrentTabIndex(0);
  }, [exhibitId]);

  const minCheckedDate = useMemo(() => {
    const defaultDate = date || startOf(DateTime.now(), 'week');

    if (!exhibit?.createdAt) {
      return defaultDate;
    }

    const createdAt = DateTime.fromISO(exhibit.createdAt);

    if (defaultDate < createdAt) {
      return startOf(createdAt, period);
    }

    return defaultDate;
  }, [date, exhibit?.createdAt, period]);

  const handleTabChange = useCallback(
    (e: SyntheticEvent, tabIndex: number) => {
      setCurrentTabIndex(tabIndex);
    },
    [setCurrentTabIndex]
  );

  const availableCharts: Array<ChartOption> = useMemo(() => {
    const charts: Map<string, ChartOption> = new Map<string, ChartOption>();
    if (minCheckedDate) {
      [...(chartList || [])]
        // Ensure the same sorting, regardless if the BE sorts or not
        .sort(sortCompareObjectByStringField('name'))
        .forEach((chart: ChartSummary | CustomChartSummary) => {
          switch (chart.type) {
            case 'presence':
              charts.set(chart.name, {
                tabProps: {
                  label: chart.name,
                  icon: <PresenceIcon />,
                },
                chart: (
                  <PresenceAnalyticsChart
                    exhibitId={exhibitId}
                    start={minCheckedDate}
                    period={period}
                  />
                ),
              });
              break;
            case 'visitors':
              charts.set(chart.name, {
                tabProps: {
                  label: chart.name,
                  icon: <PresenceIcon />,
                },
                chart: (
                  <VisitorsChart
                    exhibitId={exhibitId}
                    start={minCheckedDate}
                    period={period}
                  />
                ),
              });
              break;
            case 'interactions':
              charts.set(chart.name, {
                tabProps: {
                  label: chart.name,
                  icon: <BarChartIcon />,
                },
                chart: (
                  <InteractionChart
                    exhibitId={exhibitId}
                    start={minCheckedDate}
                    period={period}
                  />
                ),
              });
              break;
            case 'custom':
              if (charts.get(chart.name) === undefined) {
                charts.set(chart.name, {
                  tabProps: {
                    label: chart.name,
                    icon: <BarChartIcon />,
                  },
                  chart: (
                    <CustomChart
                      chartId={chart.chartId}
                      exhibitId={exhibitId}
                      start={minCheckedDate}
                      period={period}
                    />
                  ),
                });
              }
              break;
            default:
              break;
          }
        });
    }

    return Array.from(charts.values());
  }, [minCheckedDate, chartList, exhibitId, period]);

  const displayedChart = useMemo(() => {
    return (
      availableCharts[currentTabIndex]?.chart || <h2> No Chart Selected </h2>
    );
  }, [currentTabIndex, availableCharts]);

  return (
    <>
      <MainPanelHeader title={EXHIBIT_TAB.analytics} />

      <MainPanelContent className='ExhibitMetrics__content'>
        {availableCharts.length > 0 && !chartsLoading && (
          <>
            <Tabs value={currentTabIndex} onChange={handleTabChange}>
              {availableCharts.map((chartOption) => (
                <Tab
                  {...chartOption.tabProps}
                  key={chartOption.tabProps.label}
                />
              ))}
            </Tabs>
            <DatePickerBar
              DateControlProps={{
                disableDay: true,
              }}
              minDate={
                exhibit?.createdAt
                  ? DateTime.fromISO(exhibit.createdAt)
                  : undefined
              }
              maxDate={DateTime.now()}
              onChange={setDate}
              onPeriodChange={setPeriod}
              period={period}
              value={minCheckedDate}
            />
            {displayedChart}
          </>
        )}
        {(isNil(availableCharts) || availableCharts.length === 0) &&
          !chartsLoading && (
            <h2> Charts will be displayed once data is collected</h2>
          )}
      </MainPanelContent>
    </>
  );
};
