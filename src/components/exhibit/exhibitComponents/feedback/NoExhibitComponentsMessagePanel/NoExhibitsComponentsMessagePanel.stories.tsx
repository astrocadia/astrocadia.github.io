import type { Meta, StoryObj } from '@storybook/react';
import { NoExhibitComponentsMessagePanel } from './NoExhibitComponentsMessagePanel';
import { ThemeProviderWrapper } from '../../../../../styles/helpers/ThemeProviderWrapper';

const meta: Meta<typeof NoExhibitComponentsMessagePanel> = {
  title:
    'Design System/Feedback/Exhibit/Components/No Exhibit Components Message Panel',
  tags: ['autodocs'],
  component: NoExhibitComponentsMessagePanel,
};

export default meta;
type Story = StoryObj<typeof NoExhibitComponentsMessagePanel>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div
        style={{
          height: '50dvh',
          backgroundColor: 'var(--background-workspace-color)',
        }}
      >
        <NoExhibitComponentsMessagePanel />
      </div>
    </ThemeProviderWrapper>
  ),
};
