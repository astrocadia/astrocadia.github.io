import {
  type CustomChartCardValueResponse,
  type ChartColor,
  type MetricsCardDataType,
} from '../../../../../app/services/metrics';
import { convertHexToRGB } from '../../../../../utils/color';
import { humanize } from '../../../../../utils/humanizeDuration';
import { type MetricsCardValue } from '../../../../common/MetricsCard';
import { type DataPoints } from '../../../../common/charts/common/chartTypes';

type ChartPalette = Record<ChartColor, string>;

// These are the values defined in the design
const hexBaseChartPalette: ChartPalette = {
  pink: '#F4A7D1',
  orange: '#FECF98',
  yellow: '#F2EF85',
  green: '#8CD7AE',
  blue: '#8CCDEB',
  purple: '#BAB1EE',
} as const;

export const rgbBaseChartPalette: ChartPalette = {
  pink: convertHexToRGB(hexBaseChartPalette.pink),
  orange: convertHexToRGB(hexBaseChartPalette.orange),
  yellow: convertHexToRGB(hexBaseChartPalette.yellow),
  green: convertHexToRGB(hexBaseChartPalette.green),
  blue: convertHexToRGB(hexBaseChartPalette.blue),
  purple: convertHexToRGB(hexBaseChartPalette.purple),
} as const;

export const parseDisplayValue = (
  type: MetricsCardDataType,
  value?: CustomChartCardValueResponse,
  unit = ''
): MetricsCardValue => {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (type === 'number' || type === 'int' || type === 'duration') {
    let numberValue: number;
    if (typeof value === 'number') {
      numberValue = value;
    } else if (typeof value === 'string') {
      numberValue = parseFloat(value);
    } else {
      // Take the first value in the list
      numberValue = parseFloat(value[0]);
    }
    if (!Number.isNaN(numberValue)) {
      switch (type) {
        case 'number':
          // round to the nearest tenth
          return `${Math.round(numberValue * 10) / 10}${unit}`;
        case 'int':
          // round to the nearest int
          return `${Math.round(numberValue)}${unit}`;
        case 'duration':
          // parse duration from seconds
          return humanize(numberValue);
        default:
          break;
      }
    }
  } else if (type === 'text') {
    if (Array.isArray(value)) {
      return value;
    }
    return value.toString();
  }
  return undefined;
};

export const addDataPoint = (
  dataset: DataPoints,
  value: number,
  bucketIndex: number
) => {
  // Back-fill any missing datapoints with 'undefined's
  while (dataset.length < bucketIndex) {
    dataset.push(undefined);
  }

  dataset.push(value);
};
