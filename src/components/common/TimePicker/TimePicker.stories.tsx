import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { TimePicker } from './TimePicker';
import { GumbandDateProvider } from '../DatePickerCalendar/gumbandDateProvider';

const meta: Meta<typeof TimePicker> = {
  title: 'Design System/Components/TimePicker',
  tags: ['autodocs'],
  component: TimePicker,
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <GumbandDateProvider>
          <Story />
        </GumbandDateProvider>
      </ThemeProviderWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {};
export const Error: Story = {
  args: {
    error: true,
    helperText: 'Error text',
  },
};
