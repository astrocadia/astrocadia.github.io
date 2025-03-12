import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../../styles/helpers/ThemeProviderWrapper';
import { FlowButton } from './FlowButton';

const meta: Meta<typeof FlowButton> = {
  title: 'Design System/Components/Button/Flow',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: FlowButton,
};

export default meta;
type Story = StoryObj<typeof FlowButton>;

export const Flow: Story = {
  args: {
    children: 'January 2024',
  },
};

export const FlowBaseWithStartIconDisabled: Story = {
  args: {
    ...Flow.args,
    disabled: true,
  },
};
