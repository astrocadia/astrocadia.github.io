export type DataPoints = Array<number | undefined>;

export interface GenericDataSet {
  label: string;
  data: DataPoints;
}

export interface GenericChartData {
  labels: Array<string>;
  datasets: Array<GenericDataSet>;
}

export type AxisOptions = {
  position: 'start' | 'end';
  label: string;
};
