import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { CircularProgress } from './CircularProgress';

const meta: Meta<typeof CircularProgress> = {
  title: 'Design System/Components/CircularProgress',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Default: Story = {
  render: (props) => (
    <ThemeProviderWrapper>
      <CircularProgress {...props} />
    </ThemeProviderWrapper>
  ),
};
