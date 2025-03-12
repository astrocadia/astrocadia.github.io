import type { Meta, StoryObj } from '@storybook/react';
import { DatePickerCalendar } from './DatePickerCalendar';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { GumbandDateProvider } from './gumbandDateProvider';

const meta: Meta<typeof DatePickerCalendar> = {
  title: 'Design System/Components/DatePickerCalendar',
  tags: ['autodocs'],
  component: DatePickerCalendar,
  argTypes: {
    view: {
      options: ['day', 'week', 'month', 'year'],
      control: { type: 'select' },
      defaultValue: 'day',
      description:
        'A selection for what type of calendar to show. This element does grant much more granular controls on which calendar view we show',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePickerCalendar>;
export const Default: Story = {
  render: ({ ...props }) => (
    <ThemeProviderWrapper>
      <GumbandDateProvider>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <DatePickerCalendar {...props} />
        </div>
      </GumbandDateProvider>
    </ThemeProviderWrapper>
  ),
  args: {
    view: 'day',
  },
};
export const DayPicker: Story = {
  render: () => (
    <GumbandDateProvider>
      <ThemeProviderWrapper>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <DatePickerCalendar view='day' />
        </div>
      </ThemeProviderWrapper>
    </GumbandDateProvider>
  ),
};
export const WeekPicker: Story = {
  render: () => (
    <GumbandDateProvider>
      <ThemeProviderWrapper>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <DatePickerCalendar view='week' />
        </div>
      </ThemeProviderWrapper>
    </GumbandDateProvider>
  ),
};

export const MonthPicker: Story = {
  render: () => (
    <GumbandDateProvider>
      <ThemeProviderWrapper>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <DatePickerCalendar view='month' />
        </div>
      </ThemeProviderWrapper>
    </GumbandDateProvider>
  ),
};
export const YearPicker: Story = {
  render: () => (
    <GumbandDateProvider>
      <ThemeProviderWrapper>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <DatePickerCalendar view='year' />
        </div>
      </ThemeProviderWrapper>
    </GumbandDateProvider>
  ),
};
