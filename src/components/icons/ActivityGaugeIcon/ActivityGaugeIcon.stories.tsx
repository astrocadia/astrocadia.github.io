import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { ActivityGaugeIcon } from './ActivityGaugeIcon';

const meta: Meta<typeof ActivityGaugeIcon> = {
  title: 'Design System/Composite Components/ActivityGaugeIcon',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: ActivityGaugeIcon,
};

export default meta;
type Story = StoryObj<typeof ActivityGaugeIcon>;

export const Low: Story = {
  args: {
    gaugeState: 'low',
  },
};

export const Med: Story = {
  args: {
    gaugeState: 'med',
  },
};

export const High: Story = {
  args: {
    gaugeState: 'high',
  },
};
