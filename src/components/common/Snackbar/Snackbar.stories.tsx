import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { Snackbar } from './Snackbar';

const meta: Meta<typeof Snackbar> = {
  title: 'Design System/Components/Snackbar',
  tags: ['autodocs'],
  component: Snackbar,
  args: {
    message: 'This is a snackbar message',
    open: true,
  },
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <div style={{ marginTop: '4rem' }}>
          <Story />
        </div>
      </ThemeProviderWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {};
