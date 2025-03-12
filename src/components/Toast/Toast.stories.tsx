import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Design System/Composite Components/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    message: 'This is a toast message',
    open: true,
    type: 'info',
  },
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <div
          style={{
            backgroundColor: 'var(--background-workspace-color)',
            height: '100vh',
            width: '100vw',
          }}
        >
          <Story />
        </div>
      </ThemeProviderWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {};
export const LongMessage: Story = {
  args: {
    message:
      'This is a toast message that is long enough to wrap to the next line. This is a toast message that is long enough to wrap to the next line. This is a toast message that is long enough to wrap to the next line.',
  },
};
