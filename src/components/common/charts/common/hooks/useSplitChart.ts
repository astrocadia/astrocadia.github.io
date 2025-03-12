import { useMemo, useState } from 'react';
import { deepClone } from '../../../../../utils/jsonUtils';
import { GenericChartData } from '../chartTypes';

const splitData = (chartData: GenericChartData) => {
  const half = Math.ceil(chartData.labels.length / 2);
  const first = deepClone(chartData);
  const second = deepClone(chartData);
  first.labels = chartData.labels.slice(0, half);
  second.labels = chartData.labels.slice(half);
  chartData.datasets.forEach((dataset, i) => {
    first.datasets[i].data = dataset.data.slice(0, half);
    second.datasets[i].data = dataset.data.slice(half);
  });
  return [first, second];
};

export const useSplitChart = (
  allData: GenericChartData,
  activateSplitChart: boolean
) => {
  const [currentGraphPageIndex, setCurrentGraphPageIndex] = useState(1);

  // Used to compute mobile graphs and which mobile graph to display
  const preSplitData = useMemo(() => {
    return splitData(allData);
  }, [allData]);

  const displayedData = useMemo(() => {
    if (activateSplitChart) {
      return preSplitData[currentGraphPageIndex];
    }
    return allData;
  }, [currentGraphPageIndex, allData, activateSplitChart, preSplitData]);

  const leftButtonProps = {
    disabled: useMemo(() => {
      return currentGraphPageIndex === 0;
    }, [currentGraphPageIndex]),
    onClick: () => {
      if (currentGraphPageIndex === 1) {
        setCurrentGraphPageIndex(0);
      }
    },
  };

  const rightButtonProps = {
    disabled: useMemo(() => {
      return currentGraphPageIndex === 1;
    }, [currentGraphPageIndex]),
    onClick: () => {
      if (currentGraphPageIndex === 0) {
        setCurrentGraphPageIndex(1);
      }
    },
  };

  return {
    displayedData,
    leftButtonProps,
    rightButtonProps,
  };
};
