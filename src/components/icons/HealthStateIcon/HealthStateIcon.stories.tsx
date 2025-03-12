import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { HealthStateIcon } from './HealthStateIcon';

const meta: Meta<typeof HealthStateIcon> = {
  title: 'Design System/Composite Components/HealthStateIcon',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: HealthStateIcon,
};

export default meta;
type Story = StoryObj<typeof HealthStateIcon>;

export const AllConnectionsOK: Story = {
  args: {
    healthState: 'ALL_CONNECTIONS_OK',
  },
};

export const SomeConnectionsOK: Story = {
  args: {
    healthState: 'SOME_CONNECTIONS_OK',
  },
};

export const NoConnections: Story = {
  args: {
    healthState: 'NO_CONNECTIONS',
  },
};
