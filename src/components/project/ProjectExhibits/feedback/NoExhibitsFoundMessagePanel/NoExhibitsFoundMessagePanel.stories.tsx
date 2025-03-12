import type { Meta, StoryObj } from '@storybook/react';
import { NoExhibitsFoundMessagePanel } from './NoExhibitsFoundMessagePanel';
import { ThemeProviderWrapper } from '../../../../../styles/helpers/ThemeProviderWrapper';

const meta: Meta<typeof NoExhibitsFoundMessagePanel> = {
  title: 'Design System/Feedback/No Exhibits Found Message Panel',
  tags: ['autodocs'],
  component: NoExhibitsFoundMessagePanel,
};

export default meta;
type Story = StoryObj<typeof NoExhibitsFoundMessagePanel>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div
        style={{
          height: '50dvh',
          backgroundColor: 'var(--background-workspace-color)',
        }}
      >
        <NoExhibitsFoundMessagePanel />
      </div>
    </ThemeProviderWrapper>
  ),
};
