import { useEffect, useMemo, useState, type FunctionComponent } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useListExhibitsQuery } from '../../../app/services/exhibit';
import type { ProjectSummary } from '../../../app/services/workspace';
import { sortCompareObjectByStringField } from '../../../utils/sort';
import { PROJECT_TAB } from '../../../views/routes/projectRoutePaths';
import { MainPanelContent, MainPanelHeader } from '../../MainPanel';
import { CardList } from '../../common/CardList';
import { ExhibitCard, ExhibitCardSkeleton } from '../../exhibit/ExhibitCard';
import { CloudConnectErrorMessagePanel } from '../../feedback/CloudConnectErrorMessagePanel/CloudConnectErrorMessagePanel';
import { NoExhibitsFoundMessagePanel } from '../ProjectExhibits/feedback';
import { PlusIcon } from '../../common/icons';
import { Button } from '../../common/buttons';
import { MenuItem } from '../../common/MenuItem';
import { TextField } from '../../common/TextField';
import {
  ComparableChartSummary,
  useGetComparableExhibitsQuery,
} from '../../../app/services/metrics';
import { CustomComparisonChart } from './CustomComparisonChart';
import { isNil } from '../../../utils/lang';
import './ProjectChartComparison.css';

const DEFAULT_NUMBER_OF_SKELETONS = 3;
export interface ProjectChartComparisonProps {
  projectId: number;
}

export const ProjectChartComparison: FunctionComponent<
  ProjectChartComparisonProps
> = ({ projectId }) => {
  const {
    data: exhibits,
    error,
    isLoading,
  } = useListExhibitsQuery({ projectId });

  const [selectedChart, setSelectedChart] = useState<string | undefined>();
  const [selectedExhibits, setSelectedExhibits] = useState<Array<number>>([]);
  const [primaryExhibit, setPrimaryExhibit] = useState<number>();
  const [showChart, setShowChart] = useState(false);

  const { data: exhibitChartsList, isLoading: exhibitChartsListIsLoading } =
    useGetComparableExhibitsQuery(
      !isNil(primaryExhibit)
        ? {
            exhibitId: primaryExhibit,
            siteId: projectId,
          }
        : skipToken
    );

  const chartSelectDisabled = useMemo(() => {
    return selectedExhibits.length === 0;
  }, [selectedExhibits]);

  const chartMap: Map<number, Array<ComparableChartSummary>> = useMemo(() => {
    if (exhibitChartsList && !exhibitChartsListIsLoading) {
      return new Map(
        exhibitChartsList.comparableExhibits.map((exhibitChart) => [
          exhibitChart.exhibitId,
          exhibitChart.charts,
        ])
      );
    }
    return new Map();
  }, [exhibitChartsList, exhibitChartsListIsLoading]);

  const chartNames = useMemo(() => {
    if (!isNil(primaryExhibit)) {
      let list = chartMap.get(primaryExhibit);
      if (selectedExhibits.length > 1 && list) {
        const comparableCharts = new Map();
        selectedExhibits.forEach((exhibit) => {
          if (exhibit !== primaryExhibit) {
            const currentList = chartMap.get(exhibit);
            currentList?.forEach((chart) => {
              comparableCharts.set(chart.chartId, chart.name);
            });
          }
        });
        list = list.filter(
          (chart) => comparableCharts.get(chart.chartId) !== undefined
        );
      }
      return list === undefined ? [] : list;
    }
    return [];
  }, [chartMap, primaryExhibit, selectedExhibits]);

  const chartIds = useMemo(() => {
    return chartNames.map((chart) => {
      return chart.chartId;
    });
  }, [chartNames]);

  const validExhibits = useMemo(() => {
    let validList: Array<number> = [];
    if (exhibitChartsList && !exhibitChartsListIsLoading) {
      validList = exhibitChartsList.comparableExhibits.flatMap(
        (exhibitChart) => {
          for (let i = 0; i < exhibitChart.charts.length; i++) {
            if (chartIds.includes(exhibitChart.charts[i].chartId)) {
              return exhibitChart.exhibitId;
            }
          }
          return [];
        }
      );
    }
    if (!isNil(primaryExhibit) && !validList.includes(primaryExhibit)) {
      validList.push(primaryExhibit);
    }
    return validList;
  }, [chartIds, exhibitChartsList, exhibitChartsListIsLoading, primaryExhibit]);

  useEffect(() => {
    if (validExhibits.length === 1 && validExhibits[0] !== primaryExhibit) {
      setPrimaryExhibit(validExhibits[0]);
    }
  }, [primaryExhibit, validExhibits]);

  const sortedExhibits = useMemo(() => {
    if (exhibits) {
      return [...exhibits]
        .sort(sortCompareObjectByStringField<ProjectSummary>('name', true))
        .filter((exhibit) => {
          return validExhibits.includes(exhibit.id) || isNil(primaryExhibit);
        });
    }
    return undefined;
  }, [exhibits, primaryExhibit, validExhibits]);

  const isEmptyList = useMemo(
    () => !isLoading && sortedExhibits && sortedExhibits.length === 0,
    [isLoading, sortedExhibits]
  );

  const exhibitNameMap = useMemo(() => {
    const exhibitMap = new Map();
    sortedExhibits?.forEach((exhibit) => {
      exhibitMap.set(exhibit.id, exhibit.name);
    });
    return exhibitMap;
  }, [sortedExhibits]);

  const exhibitComparisonListTitle = useMemo(() => {
    if (selectedExhibits.length > 0) {
      const names: Array<string> = [];
      const orderedIds = [...selectedExhibits].sort((a, b) => a - b);
      orderedIds.forEach((id) => {
        const selectedExhibitName = exhibitNameMap.get(id);
        if (selectedExhibitName) {
          names.push(selectedExhibitName);
        }
      });
      return `- ${names.join(' <-> ')}`;
    }
    return '';
  }, [exhibitNameMap, selectedExhibits]);

  return (
    <>
      <MainPanelHeader
        title={`${PROJECT_TAB.comparison} ${showChart ? exhibitComparisonListTitle : ''}`}
        actions={[
          <Button
            startIcon={<PlusIcon />}
            onClick={() => {
              setSelectedExhibits([]);
              setPrimaryExhibit(undefined);
              setSelectedChart(undefined);
              setShowChart(false);
            }}
            aria-label='Clear button'
            key='clear'
          >
            Clear
          </Button>,
          <Button
            startIcon={<PlusIcon />}
            onClick={() => {
              if (selectedExhibits.length && !isNil(selectedChart)) {
                setShowChart(true);
              }
            }}
            aria-label='Compare Button'
            key='compare'
          >
            Compare
          </Button>,
        ]}
      />
      {error && (
        <CloudConnectErrorMessagePanel title='Unable To Load Exhibits' />
      )}
      {!error && isEmptyList && !showChart && <NoExhibitsFoundMessagePanel />}
      {!error && !isEmptyList && !showChart && (
        <MainPanelContent className='ProjectChartComparison'>
          <TextField
            label='Select Chart'
            onChange={(e) => setSelectedChart(e.target.value)}
            select
            value={selectedChart}
            disabled={chartSelectDisabled}
            className='ProjectChartComparison__selectChartDropdown'
            fullWidth
          >
            {chartNames.map((item) => (
              <MenuItem
                key={item.chartId}
                value={item.chartId}
                title={item.name}
              >
                {item.name}
              </MenuItem>
            ))}
          </TextField>
          <CardList>
            {isLoading &&
              Array.from({ length: DEFAULT_NUMBER_OF_SKELETONS }, (_, i) => (
                <ExhibitCardSkeleton key={i} />
              ))}
            {!isLoading &&
              !isEmptyList &&
              sortedExhibits?.map((exhibit) => (
                <ExhibitCard
                  key={exhibit.id}
                  exhibitId={exhibit.id}
                  name={exhibit.name}
                  healthState={exhibit.healthState}
                  numberDisconnectedComponents={
                    exhibit.numberDisconnectedComponents
                  }
                  onClick={() => {
                    if (!selectedExhibits.includes(exhibit.id)) {
                      if (selectedExhibits.length === 0) {
                        setPrimaryExhibit(exhibit.id);
                      }
                      setSelectedExhibits([...selectedExhibits, exhibit.id]);
                    } else {
                      if (selectedExhibits.length === 1) {
                        setPrimaryExhibit(undefined);
                      }
                      setSelectedExhibits(
                        selectedExhibits.filter((id) => id !== exhibit.id)
                      );
                    }
                  }}
                  selected={selectedExhibits.includes(exhibit.id)}
                />
              ))}
          </CardList>
        </MainPanelContent>
      )}
      <MainPanelContent>
        {showChart && !isNil(primaryExhibit) && !isNil(selectedChart) && (
          <CustomComparisonChart
            chartId={parseInt(selectedChart, 10)}
            exhibitIds={selectedExhibits}
            primaryExhibit={primaryExhibit}
          />
        )}
      </MainPanelContent>
    </>
  );
};
