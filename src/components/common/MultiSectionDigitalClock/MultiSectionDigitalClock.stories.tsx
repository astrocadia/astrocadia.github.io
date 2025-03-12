import type { Meta, StoryObj } from '@storybook/react';
import { DateTime } from 'luxon';
import { MultiSectionDigitalClock } from './MultiSectionDigitalClock';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { GumbandDateProvider } from '../DatePickerCalendar/gumbandDateProvider';

const meta: Meta<typeof MultiSectionDigitalClock> = {
  title: 'Design System/Components/MultiSectionDigitalClock',
  tags: ['autodocs'],
  component: MultiSectionDigitalClock,
};
export default meta;

const render = ({ ...props }) => (
  <ThemeProviderWrapper>
    <GumbandDateProvider>
      <MultiSectionDigitalClock {...props} />
    </GumbandDateProvider>
  </ThemeProviderWrapper>
);

type Story = StoryObj<typeof MultiSectionDigitalClock>;
export const Default: Story = { render };

export const Disabled: Story = { args: { disabled: true }, render };

const dateTimeValue = DateTime.fromObject({ hour: 15, minute: 30 });
export const DisabledAndSelected: Story = {
  args: { disabled: true, value: dateTimeValue },
  render,
};
