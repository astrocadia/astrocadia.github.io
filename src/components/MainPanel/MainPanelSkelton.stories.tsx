import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { MainPanelSkeleton } from './MainPanelSkeleton';

const meta: Meta<typeof MainPanelSkeleton> = {
  title: 'Design System/Views/Main Panel/Main Panel Skeleton',
  tags: ['autodocs'],
  component: MainPanelSkeleton,
};

export default meta;
type Story = StoryObj<typeof MainPanelSkeleton>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <MainPanelSkeleton />
    </ThemeProviderWrapper>
  ),
};
