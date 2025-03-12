import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { CopyIconButton } from './CopyIconButton';

const meta: Meta<typeof CopyIconButton> = {
  title: 'Design System/Composite Components/CopyIconButton',
  tags: ['autodocs'],
  component: CopyIconButton,
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  args: {
    value: "I have no idea what's going on...",
  },
};

export default meta;
type Story = StoryObj<typeof CopyIconButton>;

export const Default: Story = {};
