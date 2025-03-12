import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { BarChart } from './BarChart';

const meta: Meta<typeof BarChart> = {
  title: 'Design System/Components/BarChart',
  tags: ['autodocs'],
  component: BarChart,
};

export default meta;
type Story = StoryObj<typeof BarChart>;

export const Default: Story = {
  render: () => {
    const NOW_IN_MS = new Date().getTime();
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

    const buckets = [...Array(10)].map((_, i) => {
      return new Date(NOW_IN_MS - ONE_DAY_IN_MS * i).toISOString();
    });

    return (
      <ThemeProviderWrapper>
        <BarChart
          datasets={[
            {
              data: [30, 41, 22, 3, 14, 45, 26, 28, 0, 19],
              backgroundColor: 'rgba(158, 196, 253, .6)',
              hoverBackgroundColor: 'rgba(158, 196, 253, 1)',
              label: 'Demo',
            },
          ]}
          buckets={buckets}
          bucketCount={10}
        />
      </ThemeProviderWrapper>
    );
  },
};

export const HiddenLegend: Story = {
  render: () => {
    const NOW_IN_MS = new Date().getTime();
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

    const buckets = [...Array(10)].map((_, i) => {
      return new Date(NOW_IN_MS - ONE_DAY_IN_MS * i).toISOString();
    });

    return (
      <ThemeProviderWrapper>
        <BarChart
          datasets={[
            {
              data: [30, 41, 22, 3, 14, 45, 26, 28, 0, 19],
              backgroundColor: 'rgba(158, 196, 253, .6)',
              hoverBackgroundColor: 'rgba(158, 196, 253, 1)',
              label: 'Demo',
            },
          ]}
          buckets={buckets}
          bucketCount={10}
          showLegend={false}
        />
      </ThemeProviderWrapper>
    );
  },
};

export const Loading: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <BarChart datasets={[]} buckets={[]} bucketCount={10} isLoading />
    </ThemeProviderWrapper>
  ),
};

export const NoData: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <h2>No Datasets</h2>
      <BarChart datasets={[]} buckets={[]} bucketCount={10} />
      <h2>Dataset with no data</h2>
      <BarChart
        datasets={[
          {
            data: [],
            backgroundColor: 'rgba(158, 196, 253, .6)',
            hoverBackgroundColor: 'rgba(158, 196, 253, 1)',
            label: 'Demo',
          },
        ]}
        buckets={[]}
        bucketCount={10}
      />
      <h2>Dataset with all 0 data</h2>
      <BarChart
        datasets={[
          {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: 'rgba(158, 196, 253, .6)',
            hoverBackgroundColor: 'rgba(158, 196, 253, 1)',
            label: 'Demo',
          },
        ]}
        buckets={[]}
        bucketCount={10}
      />
    </ThemeProviderWrapper>
  ),
};

export const StackedBar: Story = {
  render: () => {
    const NOW_IN_MS = new Date().getTime();
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

    const buckets = [...Array(10)].map((_, i) => {
      return new Date(NOW_IN_MS - ONE_DAY_IN_MS * i).toISOString();
    });

    return (
      <ThemeProviderWrapper>
        <BarChart
          datasets={[
            {
              data: [30, 41, 22, 3, 14, 45, 26, 28, 0, 19],
              backgroundColor: 'rgba(158, 196, 253, .6)',
              hoverBackgroundColor: 'rgba(158, 196, 253, 1)',
              label: 'Demo 1',
            },
            {
              data: [31, 41, 22, 3, 14, 45, 26, 28, 0, 19],
              backgroundColor: 'rgba(140, 215, 174, .6)',
              hoverBackgroundColor: 'rgba(140, 215, 174, 1)',
              label: 'Demo 2',
            },
          ]}
          buckets={buckets}
          bucketCount={10}
          variant='stacked'
        />
        <BarChart
          datasets={[
            {
              data: [30, 41, 22, 3, 14, 25, 26, 28, 0, 19],
              backgroundColor: 'rgba(158, 196, 253, .6)',
              hoverBackgroundColor: 'rgba(158, 196, 253, 1)',
              label: 'Demo 1',
            },
            {
              data: [31, 41, 22, 3, 14, 25, 26, 28, 0, 19],
              backgroundColor: 'rgba(140, 215, 174, .6)',
              hoverBackgroundColor: 'rgba(140, 215, 174, 1)',
              label: 'Demo 2',
            },
            {
              data: [31, 41, 22, 3, 14, 25, 26, 28, 0, 19],
              backgroundColor: 'rgba(254, 207, 152, .6)',
              hoverBackgroundColor: 'rgba(254, 207, 152, 1)',
              label: 'Demo 3',
            },
          ]}
          buckets={buckets}
          bucketCount={10}
          variant='stacked'
        />
      </ThemeProviderWrapper>
    );
  },
};

export const GroupedBar: Story = {
  render: () => {
    const NOW_IN_MS = new Date().getTime();
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

    const buckets = [...Array(10)].map((_, i) => {
      return new Date(NOW_IN_MS - ONE_DAY_IN_MS * i).toISOString();
    });

    return (
      <ThemeProviderWrapper>
        <BarChart
          datasets={[
            {
              data: [30, 41, 22, 3, 14, 45, 26, 28, 0, 19],
              backgroundColor: 'rgba(158, 196, 253, .6)',
              hoverBackgroundColor: 'rgba(158, 196, 253, 1)',
              label: 'Demo 1',
            },
            {
              data: [31, 41, 22, 3, 14, 45, 26, 28, 0, 19],
              backgroundColor: 'rgba(140, 215, 174, .6)',
              hoverBackgroundColor: 'rgba(140, 215, 174, 1)',
              label: 'Demo 2',
            },
          ]}
          buckets={buckets}
          bucketCount={10}
          variant='grouped'
        />
        <BarChart
          datasets={[
            {
              data: [30, 41, 22, 3, 14, 45, 26, 28, 0, 19],
              backgroundColor: 'rgba(158, 196, 253, .6)',
              hoverBackgroundColor: 'rgba(158, 196, 253, 1)',
              label: 'Demo 1',
            },
            {
              data: [31, 41, 22, 3, 14, 45, 26, 28, 0, 19],
              backgroundColor: 'rgba(140, 215, 174, .6)',
              hoverBackgroundColor: 'rgba(140, 215, 174, 1)',
              label: 'Demo 2',
            },
            {
              data: [31, 41, 22, 3, 14, 45, 26, 28, 0, 19],
              backgroundColor: 'rgba(254, 207, 152, .6)',
              hoverBackgroundColor: 'rgba(254, 207, 152, 1)',
              label: 'Demo 3',
            },
          ]}
          buckets={buckets}
          bucketCount={10}
          variant='grouped'
        />
      </ThemeProviderWrapper>
    );
  },
};

export const AxisOptions: Story = {
  render: () => {
    const NOW_IN_MS = new Date().getTime();
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

    const buckets = [...Array(10)].map((_, i) => {
      return new Date(NOW_IN_MS - ONE_DAY_IN_MS * i).toISOString();
    });

    return (
      <ThemeProviderWrapper>
        <BarChart
          datasets={[
            {
              data: [30, 41, 22, 3, 14, 45, 26, 28, 0, 19],
              backgroundColor: 'rgba(158, 196, 253, .6)',
              hoverBackgroundColor: 'rgba(158, 196, 253, 1)',
              label: 'Demo',
            },
          ]}
          buckets={buckets}
          bucketCount={10}
          axisOptions={{
            position: 'start',
            label: '$',
          }}
        />
        <BarChart
          datasets={[
            {
              data: [30, 41, 22, 3, 14, 45, 26, 28, 0, 19],
              backgroundColor: 'rgba(158, 196, 253, .6)',
              hoverBackgroundColor: 'rgba(158, 196, 253, 1)',
              label: 'Demo',
            },
          ]}
          buckets={buckets}
          bucketCount={10}
          axisOptions={{
            position: 'end',
            label: '%',
          }}
        />
        <BarChart
          datasets={[
            {
              data: [30, 41, 22, 3, 14, 45, 26, 28, 0, 19],
              backgroundColor: 'rgba(158, 196, 253, .6)',
              hoverBackgroundColor: 'rgba(158, 196, 253, 1)',
              label: 'Demo',
            },
          ]}
          buckets={buckets}
          bucketCount={10}
          axisOptions={{
            position: 'end',
            label: 'm',
          }}
        />
      </ThemeProviderWrapper>
    );
  },
};
