import type { Meta, StoryObj } from '@storybook/react';
import { NoProjectsFoundMessagePanel } from './NoProjectsFoundMessagePanel';
import { ThemeProviderWrapper } from '../../../../../styles/helpers/ThemeProviderWrapper';

const meta: Meta<typeof NoProjectsFoundMessagePanel> = {
  title: 'Design System/Feedback/No Projects Found Message Panel',
  tags: ['autodocs'],
  component: NoProjectsFoundMessagePanel,
};

export default meta;
type Story = StoryObj<typeof NoProjectsFoundMessagePanel>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div
        style={{
          height: '50dvh',
          backgroundColor: 'var(--background-workspace-color)',
        }}
      >
        <NoProjectsFoundMessagePanel />
      </div>
    </ThemeProviderWrapper>
  ),
};
