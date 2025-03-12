import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../../styles/helpers/ThemeProviderWrapper';
import { CustomChartComponent } from './CustomChartComponent';

const meta: Meta<typeof CustomChartComponent> = {
  title: 'Design System/Composite Components/Metrics/CustomChartComponent',
  tags: ['autodocs'],
  component: CustomChartComponent,
};

export default meta;
type Story = StoryObj<typeof CustomChartComponent>;

export const Default: Story = {
  render: () => {
    const datasetName = 'Demo';
    const NOW_IN_MS = new Date().getTime();
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

    const dataset = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const buckets = [...Array(10)].map((_, i) => {
      return {
        label: new Date(NOW_IN_MS - ONE_DAY_IN_MS * i).toISOString(),
        data: [
          {
            datasetName,
            value: dataset[i],
          },
        ],
      };
    });

    return (
      <ThemeProviderWrapper>
        <CustomChartComponent
          chartConfiguration={{
            graphType: 'stackedBar',
            metricsCards: [
              {
                title: 'Int Metrics Card',
                metricScope: 'period',
                dataType: 'int',
              },
              {
                title: 'Decimal Metrics Card',
                metricScope: 'period',
                dataType: 'number',
              },
              {
                title: 'Text Metrics Card',
                metricScope: 'period',
                dataType: 'text',
              },
              {
                title: 'Duration Metrics Card',
                metricScope: 'period',
                dataType: 'duration',
              },
            ],
          }}
          chartData={{
            datasets: [
              {
                name: datasetName,
                hue: 'orange',
              },
            ],
            cardValues: [
              1,
              9.467,
              [
                'Lorem ipsum dolor sit amet consectetur',
                'adipisicing elit. Quidem rerum eum numquam',
                'accusantium dolorem error inventore ducimus non cum praesentium',
              ],
              60 * 60 * 3 + 60 * 15,
            ],
            buckets,
          }}
        />
      </ThemeProviderWrapper>
    );
  },
};

export const CustomTooltipContent: Story = {
  render: () => {
    const datasetName = 'Demo';
    const NOW_IN_MS = new Date().getTime();
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

    const dataset = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const buckets = [...Array(10)].map((_, i) => {
      return {
        label: new Date(NOW_IN_MS - ONE_DAY_IN_MS * i).toISOString(),
        data: [
          {
            datasetName,
            value: dataset[i],
          },
        ],
      };
    });
    const tooltipData = [...Array(10)].map((_, i) => {
      return [
        { label: `Box ${i}`, value: i + 10 },
        { label: 'Average Views', value: i + 5 },
        { label: 'Total Views', value: i + 20 },
      ];
    });
    return (
      <ThemeProviderWrapper>
        <CustomChartComponent
          chartConfiguration={{
            graphType: 'stackedBar',
            metricsCards: [
              {
                title: 'Int Metrics Card',
                metricScope: 'period',
                dataType: 'int',
              },
              {
                title: 'Decimal Metrics Card',
                metricScope: 'period',
                dataType: 'number',
              },
              {
                title: 'Text Metrics Card',
                metricScope: 'period',
                dataType: 'text',
              },
              {
                title: 'Duration Metrics Card',
                metricScope: 'period',
                dataType: 'duration',
              },
            ],
          }}
          chartData={{
            datasets: [
              {
                name: datasetName,
                hue: 'orange',
              },
            ],
            cardValues: [
              1,
              9.467,
              [
                'Lorem ipsum dolor sit amet consectetur',
                'adipisicing elit. Quidem rerum eum numquam',
                'accusantium dolorem error inventore ducimus non cum praesentium',
              ],
              60 * 60 * 3 + 60 * 15,
            ],
            buckets,
            tooltipData,
          }}
        />
      </ThemeProviderWrapper>
    );
  },
};

export const MoreMetricsCardOptions: Story = {
  render: () => {
    const datasetName = 'Demo';

    return (
      <ThemeProviderWrapper>
        <CustomChartComponent
          chartConfiguration={{
            graphType: 'stackedBar',
            metricsCards: [
              {
                title: 'With Unit',
                metricScope: 'period',
                dataType: 'number',
                unit: 'm',
              },
              {
                title: 'Unit With Leading Space',
                metricScope: 'period',
                dataType: 'int',
                unit: ' m/s',
              },
              {
                title: 'Color Dot',
                metricScope: 'period',
                dataType: 'int',
                datasetName,
              },
            ],
          }}
          chartData={{
            datasets: [
              {
                name: datasetName,
                hue: 'orange',
              },
            ],
            cardValues: [2, 2, 2, 2],
            buckets: [],
          }}
        />
        <CustomChartComponent
          chartConfiguration={{
            graphType: 'stackedBar',
            metricsCards: [
              {
                title: 'Period Subtitle',
                metricScope: 'period',
                dataType: 'int',
              },
              {
                title: 'Session Subtitle',
                metricScope: 'session',
                dataType: 'int',
              },
              {
                title: 'User Subtitle',
                metricScope: 'user',
                dataType: 'int',
              },
              {
                title: 'Bucket Subtitle',
                metricScope: 'bucket',
                dataType: 'int',
              },
            ],
          }}
          chartData={{
            datasets: [],
            cardValues: [1, 1, 1, 1],
            buckets: [],
          }}
        />
      </ThemeProviderWrapper>
    );
  },
};

export const DataLoading: Story = {
  render: () => {
    const datasetName = 'Demo';

    return (
      <ThemeProviderWrapper>
        <CustomChartComponent
          chartConfiguration={{
            graphType: 'stackedBar',
            metricsCards: [
              {
                title: 'Example Metrics Card',
                metricScope: 'period',
                dataType: 'int',
                datasetName,
              },
            ],
          }}
          chartData={undefined}
          isDataLoading
        />
      </ThemeProviderWrapper>
    );
  },
};

export const ConfigLoading: Story = {
  render: () => {
    const datasetName = 'Demo';
    const NOW_IN_MS = new Date().getTime();
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

    const dataset = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const buckets = [...Array(10)].map((_, i) => {
      return {
        label: new Date(NOW_IN_MS - ONE_DAY_IN_MS * i).toISOString(),
        data: [
          {
            datasetName,
            value: dataset[i],
          },
        ],
      };
    });

    return (
      <ThemeProviderWrapper>
        <CustomChartComponent
          chartConfiguration={undefined}
          chartData={{
            datasets: [
              {
                name: datasetName,
                hue: 'orange',
              },
            ],
            cardValues: [],
            buckets,
          }}
          isConfigLoading
        />
      </ThemeProviderWrapper>
    );
  },
};

export const NoData: Story = {
  render: () => {
    return (
      <ThemeProviderWrapper>
        <CustomChartComponent
          chartConfiguration={{
            graphType: 'stackedBar',
            metricsCards: [
              {
                title: 'No Data',
                metricScope: 'period',
                dataType: 'int',
              },
              {
                title: 'No Data Text',
                metricScope: 'period',
                dataType: 'text',
              },
            ],
          }}
          chartData={undefined}
        />
      </ThemeProviderWrapper>
    );
  },
};

export const NoConfig: Story = {
  render: () => {
    const datasetName = 'Demo';
    const NOW_IN_MS = new Date().getTime();
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

    const dataset = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const buckets = [...Array(10)].map((_, i) => {
      return {
        label: new Date(NOW_IN_MS - ONE_DAY_IN_MS * i).toISOString(),
        data: [
          {
            datasetName,
            value: dataset[i],
          },
        ],
      };
    });

    return (
      <ThemeProviderWrapper>
        <CustomChartComponent
          chartConfiguration={undefined}
          chartData={{
            datasets: [
              {
                name: datasetName,
                hue: 'orange',
              },
            ],
            cardValues: [
              1,
              9.467,
              [
                'Lorem ipsum dolor sit amet consectetur',
                'adipisicing elit. Quidem rerum eum numquam',
                'accusantium dolorem error inventore ducimus non cum praesentium',
              ],
              60 * 60 * 3 + 60 * 15,
            ],
            buckets,
          }}
        />
      </ThemeProviderWrapper>
    );
  },
};

export const MissingDataEdgeCase: Story = {
  render: () => {
    const NOW_IN_MS = new Date().getTime();
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

    const buckets = [
      {
        label: new Date(NOW_IN_MS).toISOString(),
        data: [
          {
            datasetName: 'Demo 1',
            value: 7,
          },
          {
            datasetName: 'Demo 2',
            value: 2,
          },
          {
            datasetName: 'Demo 3',
            value: 3,
          },
        ],
      },
      {
        label: new Date(NOW_IN_MS - ONE_DAY_IN_MS).toISOString(),
        data: [
          {
            datasetName: 'Demo 1',
            value: 5,
          },
          {
            datasetName: 'Demo 3',
            value: 1,
          },
        ],
      },
      {
        label: new Date(NOW_IN_MS - 2 * ONE_DAY_IN_MS).toISOString(),
        data: [
          {
            datasetName: 'Demo 1',
            value: 3,
          },
          {
            datasetName: 'Demo 2',
            value: 8,
          },
          {
            datasetName: 'Demo 3',
            value: 3,
          },
        ],
      },
    ];

    return (
      <ThemeProviderWrapper>
        <CustomChartComponent
          chartConfiguration={{
            graphType: 'stackedBar',
            metricsCards: [],
          }}
          chartData={{
            datasets: [
              {
                name: 'Demo 1',
                hue: 'purple',
              },
              {
                name: 'Demo 2',
                hue: 'orange',
              },
              {
                name: 'Demo 3',
                hue: 'blue',
              },
            ],
            cardValues: [],
            buckets,
          }}
        />
      </ThemeProviderWrapper>
    );
  },
};

export const MultipleDataPointsInOneBucketEdgeCase: Story = {
  render: () => {
    const NOW_IN_MS = new Date().getTime();
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

    const buckets = [
      {
        label: new Date(NOW_IN_MS).toISOString(),
        data: [
          {
            datasetName: 'Demo 1',
            value: 7,
          },
          {
            datasetName: 'Demo 2',
            value: 2,
          },
          {
            datasetName: 'Demo 3',
            value: 3,
          },
        ],
      },
      {
        label: new Date(NOW_IN_MS - ONE_DAY_IN_MS).toISOString(),
        data: [
          {
            datasetName: 'Demo 1',
            value: 5,
          },
          {
            datasetName: 'Demo 2',
            value: 2,
          },
          {
            datasetName: 'Demo 2',
            value: 3,
          },
          {
            datasetName: 'Demo 3',
            value: 1,
          },
        ],
      },
      {
        label: new Date(NOW_IN_MS - 2 * ONE_DAY_IN_MS).toISOString(),
        data: [
          {
            datasetName: 'Demo 1',
            value: 3,
          },
          {
            datasetName: 'Demo 2',
            value: 8,
          },
          {
            datasetName: 'Demo 3',
            value: 3,
          },
        ],
      },
    ];

    return (
      <ThemeProviderWrapper>
        <CustomChartComponent
          chartConfiguration={{
            graphType: 'stackedBar',
            metricsCards: [],
          }}
          chartData={{
            datasets: [
              {
                name: 'Demo 1',
                hue: 'purple',
              },
              {
                name: 'Demo 2',
                hue: 'orange',
              },
              {
                name: 'Demo 3',
                hue: 'blue',
              },
            ],
            cardValues: [],
            buckets,
          }}
        />
      </ThemeProviderWrapper>
    );
  },
};

export const SessionDurationExample: Story = {
  render: () => {
    const NOW_IN_MS = new Date().getTime();
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

    // Values in minutes
    const demo1Data = [7, 5, 3, 5, 8, 0.5, 3, 3, 14, 1];
    const demo2Data = [2, 7, 8, 7, 3, 0.5, 7, 3, 5, 1];
    const demo3Data = [3, 1, 3, 5, 4, 0.5, 3, 1, 3.5, 1];

    const buckets = [...Array(10)]
      .map((_, i) => {
        return {
          label: new Date(NOW_IN_MS - ONE_DAY_IN_MS * i).toISOString(),
          data: [
            {
              datasetName: 'Session',
              value: demo1Data[9 - i],
            },
            {
              datasetName: 'Session',
              value: demo2Data[9 - i],
            },
            {
              datasetName: 'Session',
              value: demo3Data[9 - i],
            },
          ],
        };
      })
      .reverse();

    return (
      <ThemeProviderWrapper>
        <CustomChartComponent
          chartConfiguration={{
            graphType: 'stackedBar',
            metricsCards: [
              {
                title: 'Avg. User Sessions',
                metricScope: 'bucket',
                dataType: 'number',
              },
              {
                title: 'Avg. Session Duration',
                metricScope: 'period',
                dataType: 'duration',
              },
            ],
            chartOptions: {
              hiddenLegend: true,
              yAxisOptions: 'duration',
            },
          }}
          chartData={{
            datasets: [
              {
                name: 'Session',
                hue: 'purple',
              },
            ],
            cardValues: [
              5.68,
              19 * 60 + 2, // Value in seconds
            ],
            buckets,
          }}
        />
      </ThemeProviderWrapper>
    );
  },
};

export const ChartPalette: Story = {
  render: () => {
    const NOW_IN_MS = new Date().getTime();
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

    const buckets = [
      {
        label: new Date(NOW_IN_MS - ONE_DAY_IN_MS * 5).toISOString(),
        data: [
          {
            datasetName: 'Pink 1',
            value: 2,
          },
          {
            datasetName: 'Pink 2',
            value: 1,
          },
          {
            datasetName: 'Pink 3',
            value: 1,
          },
          {
            datasetName: 'Pink 4',
            value: 1,
          },
          {
            datasetName: 'Pink 5',
            value: 1,
          },
          {
            datasetName: 'Pink 6',
            value: 1,
          },
          {
            datasetName: 'Pink 7',
            value: 1,
          },
          {
            datasetName: 'Pink 8',
            value: 1,
          },
        ],
      },
      {
        label: new Date(NOW_IN_MS - ONE_DAY_IN_MS * 4).toISOString(),
        data: [
          {
            datasetName: 'Orange 1',
            value: 2,
          },
          {
            datasetName: 'Orange 2',
            value: 1,
          },
          {
            datasetName: 'Orange 3',
            value: 1,
          },
          {
            datasetName: 'Orange 4',
            value: 1,
          },
          {
            datasetName: 'Orange 5',
            value: 1,
          },
          {
            datasetName: 'Orange 6',
            value: 1,
          },
          {
            datasetName: 'Orange 7',
            value: 1,
          },
          {
            datasetName: 'Orange 8',
            value: 1,
          },
        ],
      },
      {
        label: new Date(NOW_IN_MS - ONE_DAY_IN_MS * 3).toISOString(),
        data: [
          {
            datasetName: 'Yellow 1',
            value: 2,
          },
          {
            datasetName: 'Yellow 2',
            value: 1,
          },
          {
            datasetName: 'Yellow 3',
            value: 1,
          },
          {
            datasetName: 'Yellow 4',
            value: 1,
          },
          {
            datasetName: 'Yellow 5',
            value: 1,
          },
          {
            datasetName: 'Yellow 6',
            value: 1,
          },
          {
            datasetName: 'Yellow 7',
            value: 1,
          },
          {
            datasetName: 'Yellow 8',
            value: 1,
          },
        ],
      },
      {
        label: new Date(NOW_IN_MS - ONE_DAY_IN_MS * 2).toISOString(),
        data: [
          {
            datasetName: 'Green 1',
            value: 2,
          },
          {
            datasetName: 'Green 2',
            value: 1,
          },
          {
            datasetName: 'Green 3',
            value: 1,
          },
          {
            datasetName: 'Green 4',
            value: 1,
          },
          {
            datasetName: 'Green 5',
            value: 1,
          },
          {
            datasetName: 'Green 6',
            value: 1,
          },
          {
            datasetName: 'Green 7',
            value: 1,
          },
          {
            datasetName: 'Green 8',
            value: 1,
          },
        ],
      },
      {
        label: new Date(NOW_IN_MS - ONE_DAY_IN_MS).toISOString(),
        data: [
          {
            datasetName: 'Blue 1',
            value: 2,
          },
          {
            datasetName: 'Blue 2',
            value: 1,
          },
          {
            datasetName: 'Blue 3',
            value: 1,
          },
          {
            datasetName: 'Blue 4',
            value: 1,
          },
          {
            datasetName: 'Blue 5',
            value: 1,
          },
          {
            datasetName: 'Blue 6',
            value: 1,
          },
          {
            datasetName: 'Blue 7',
            value: 1,
          },
          {
            datasetName: 'Blue 8',
            value: 1,
          },
        ],
      },
      {
        label: new Date(NOW_IN_MS).toISOString(),
        data: [
          {
            datasetName: 'Purple 1',
            value: 2,
          },
          {
            datasetName: 'Purple 2',
            value: 1,
          },
          {
            datasetName: 'Purple 3',
            value: 1,
          },
          {
            datasetName: 'Purple 4',
            value: 1,
          },
          {
            datasetName: 'Purple 5',
            value: 1,
          },
          {
            datasetName: 'Purple 6',
            value: 1,
          },
          {
            datasetName: 'Purple 7',
            value: 1,
          },
          {
            datasetName: 'Purple 8',
            value: 1,
          },
        ],
      },
    ];

    return (
      <ThemeProviderWrapper>
        <CustomChartComponent
          chartConfiguration={{
            graphType: 'stackedBar',
            metricsCards: [],
          }}
          chartData={{
            datasets: [
              {
                name: 'Pink 1',
                hue: 'pink',
              },
              {
                name: 'Pink 2',
                hue: 'pink',
              },
              {
                name: 'Pink 3',
                hue: 'pink',
              },
              {
                name: 'Pink 4',
                hue: 'pink',
              },
              {
                name: 'Pink 5',
                hue: 'pink',
              },
              {
                name: 'Pink 6',
                hue: 'pink',
              },
              {
                name: 'Pink 7',
                hue: 'pink',
              },
              {
                name: 'Pink 8',
                hue: 'pink',
              },
              {
                name: 'Orange 1',
                hue: 'orange',
              },
              {
                name: 'Orange 2',
                hue: 'orange',
              },
              {
                name: 'Orange 3',
                hue: 'orange',
              },
              {
                name: 'Orange 4',
                hue: 'orange',
              },
              {
                name: 'Orange 5',
                hue: 'orange',
              },
              {
                name: 'Orange 6',
                hue: 'orange',
              },
              {
                name: 'Orange 7',
                hue: 'orange',
              },
              {
                name: 'Orange 8',
                hue: 'orange',
              },
              {
                name: 'Yellow 1',
                hue: 'yellow',
              },
              {
                name: 'Yellow 2',
                hue: 'yellow',
              },
              {
                name: 'Yellow 3',
                hue: 'yellow',
              },
              {
                name: 'Yellow 4',
                hue: 'yellow',
              },
              {
                name: 'Yellow 5',
                hue: 'yellow',
              },
              {
                name: 'Yellow 6',
                hue: 'yellow',
              },
              {
                name: 'Yellow 7',
                hue: 'yellow',
              },
              {
                name: 'Yellow 8',
                hue: 'yellow',
              },
              {
                name: 'Green 1',
                hue: 'green',
              },
              {
                name: 'Green 2',
                hue: 'green',
              },
              {
                name: 'Green 3',
                hue: 'green',
              },
              {
                name: 'Green 4',
                hue: 'green',
              },
              {
                name: 'Green 5',
                hue: 'green',
              },
              {
                name: 'Green 6',
                hue: 'green',
              },
              {
                name: 'Green 7',
                hue: 'green',
              },
              {
                name: 'Green 8',
                hue: 'green',
              },
              {
                name: 'Blue 1',
                hue: 'blue',
              },
              {
                name: 'Blue 2',
                hue: 'blue',
              },
              {
                name: 'Blue 3',
                hue: 'blue',
              },
              {
                name: 'Blue 4',
                hue: 'blue',
              },
              {
                name: 'Blue 5',
                hue: 'blue',
              },
              {
                name: 'Blue 6',
                hue: 'blue',
              },
              {
                name: 'Blue 7',
                hue: 'blue',
              },
              {
                name: 'Blue 8',
                hue: 'blue',
              },
              {
                name: 'Purple 1',
                hue: 'purple',
              },
              {
                name: 'Purple 2',
                hue: 'purple',
              },
              {
                name: 'Purple 3',
                hue: 'purple',
              },
              {
                name: 'Purple 4',
                hue: 'purple',
              },
              {
                name: 'Purple 5',
                hue: 'purple',
              },
              {
                name: 'Purple 6',
                hue: 'purple',
              },
              {
                name: 'Purple 7',
                hue: 'purple',
              },
              {
                name: 'Purple 8',
                hue: 'purple',
              },
            ],
            cardValues: [],
            buckets,
          }}
        />
      </ThemeProviderWrapper>
    );
  },
};
