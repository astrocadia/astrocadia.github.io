import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { BarChart } from '../charts/BarChart';
import { MetricsPanel } from './MetricsPanel';

const meta: Meta<typeof MetricsPanel> = {
  title: 'Design System/Composite Components/Metrics/MetricsPanel',
  tags: ['autodocs'],
  component: MetricsPanel,
};

export default meta;
type Story = StoryObj<typeof MetricsPanel>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <MetricsPanel
        metricsCardProps={Array.from({ length: 3 }, (_, i) => {
          return {
            title: 'Lorem ipsem',
            subtitle: 'dolor sit amet',
            value: i.toString(),
          };
        })}
      >
        <div style={{ backgroundColor: 'blue', height: 550, width: '100%' }} />
      </MetricsPanel>
    </ThemeProviderWrapper>
  ),
};

export const NoMetricsCards: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <MetricsPanel metricsCardProps={[]}>
        <div style={{ backgroundColor: 'blue', height: 550, width: '100%' }} />
      </MetricsPanel>
    </ThemeProviderWrapper>
  ),
};

export const Loading: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <MetricsPanel metricsCardProps={[]} isLoading>
        <div style={{ backgroundColor: 'blue', height: 550, width: '100%' }} />
      </MetricsPanel>
    </ThemeProviderWrapper>
  ),
};

export const BarChartView: Story = {
  render: () => {
    const NOW_IN_MS = new Date().getTime();
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

    const buckets = [...Array(10)].map((_, i) => {
      return new Date(NOW_IN_MS - ONE_DAY_IN_MS * i).toISOString();
    });

    return (
      <ThemeProviderWrapper>
        <MetricsPanel
          metricsCardProps={Array.from({ length: 3 }, (_, i) => {
            return {
              title: 'Lorem ipsem',
              subtitle: 'dolor sit amet',
              value: i.toString(),
            };
          })}
        >
          <BarChart
            datasets={[
              {
                label: 'Demo',
                data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                backgroundColor: 'rgba(255, 109, 66, 0.6)',
                hoverBackgroundColor: 'rgba(255, 109, 66, 1)',
              },
            ]}
            bucketCount={10}
            buckets={buckets}
          />
        </MetricsPanel>
      </ThemeProviderWrapper>
    );
  },
};
