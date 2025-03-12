import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { MetricsCard } from '../MetricsCard/MetricsCard';
import { MetricsCardList } from './MetricsCardList';

const meta: Meta<typeof MetricsCardList> = {
  title: 'Design System/Composite Components/MetricsCardList',
  tags: ['autodocs'],
  component: MetricsCardList,
};

export default meta;
type Story = StoryObj<typeof MetricsCardList>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <MetricsCardList>
        {Array.from({ length: 3 }, (_, i) => (
          <MetricsCard
            key={i}
            title='Lorem ipsem'
            subtitle='dolor sit amet'
            value={i.toString()}
          />
        ))}
      </MetricsCardList>
    </ThemeProviderWrapper>
  ),
};

export const LowCardCount: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <MetricsCardList>
        {Array.from({ length: 2 }, (_, i) => (
          <MetricsCard
            key={i}
            title='Lorem ipsem'
            subtitle='dolor sit amet'
            value={i.toString()}
          />
        ))}
      </MetricsCardList>
    </ThemeProviderWrapper>
  ),
};

export const HighCardCount: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <MetricsCardList>
        {Array.from({ length: 5 }, (_, i) => (
          <MetricsCard
            key={i}
            title='Lorem ipsem'
            subtitle='dolor sit amet'
            value={i.toString()}
          />
        ))}
      </MetricsCardList>
    </ThemeProviderWrapper>
  ),
};
