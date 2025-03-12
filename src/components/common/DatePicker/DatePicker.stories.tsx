import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { GumbandDateProvider } from '../DatePickerCalendar/gumbandDateProvider';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Design System/Components/DatePicker',
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
  component: DatePicker,
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    label: 'Date Picker',
  },
};
export const Error: Story = {
  args: {
    label: 'Date Picker',
    error: true,
    helperText: 'Error text',
  },
};
