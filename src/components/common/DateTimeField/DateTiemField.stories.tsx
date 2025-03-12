import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { DateTimeField } from './DateTimeField';
import { GumbandDateProvider } from '../DatePickerCalendar/gumbandDateProvider';

const meta: Meta<typeof DateTimeField> = {
  title: 'Design System/Components/DateTimeField',
  tags: ['autodocs'],
  component: DateTimeField,
};
export default meta;

type Story = StoryObj<typeof DateTimeField>;

export const Default: Story = {
  render: ({ ...props }) => (
    <ThemeProviderWrapper>
      <GumbandDateProvider>
        <DateTimeField {...props} />
      </GumbandDateProvider>
    </ThemeProviderWrapper>
  ),
};
