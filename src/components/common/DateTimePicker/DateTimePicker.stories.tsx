import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { GumbandDateProvider } from '../DatePickerCalendar/gumbandDateProvider';
import { DateTimePicker } from './DateTimePicker';

const meta: Meta<typeof DateTimePicker> = {
  title: 'Design System/Components/DateTimePicker',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <GumbandDateProvider>
          <div>
            <Story />
          </div>
        </GumbandDateProvider>
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: DateTimePicker,
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

export const Default: Story = {
  args: {
    label: 'Date Time Picker',
  },
};
export const Error: Story = {
  args: {
    label: 'Date Time Picker',
    error: true,
    helperText: 'Error text',
  },
};
