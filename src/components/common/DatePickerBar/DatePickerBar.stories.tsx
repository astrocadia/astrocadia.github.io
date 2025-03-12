import type { Meta, Parameters, StoryObj } from '@storybook/react';
import { DateTime } from 'luxon';
import { type FunctionComponent, type ReactNode, useState } from 'react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { DatePickerBar, type DatePickerBarProps } from './DatePickerBar';
import { GumbandDateProvider } from '../DatePickerCalendar/gumbandDateProvider';
import type { DatePeriod } from '../DateControl';

const meta: Meta<typeof DatePickerBar> = {
  title: 'Design System/Components/DatePickerBar',
  tags: ['autodocs'],
  component: DatePickerBar,
};

const parameters: Parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/U8xSFJcUV67F4dCpQGhh4N/Exhibit-Metrics-Date-Controls?type=design&node-id=2165-92507&mode=design&t=Vyq94WwApIKh4kZl-0',
  },
};

export default meta;
type Story = StoryObj<typeof DatePickerBar>;

const Wrapper: FunctionComponent<{ children: ReactNode }> = ({ children }) => (
  <GumbandDateProvider>
    <ThemeProviderWrapper>
      <div
        style={{
          padding: 15,
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        {children}
      </div>
    </ThemeProviderWrapper>
  </GumbandDateProvider>
);

const DateBarPickerWithState: FunctionComponent<DatePickerBarProps> = (
  props
) => {
  const [value, setValue] = useState<DateTime | null>(DateTime.now());
  const [period, setPeriod] = useState<DatePeriod>('week');

  return (
    <DatePickerBar
      {...props}
      onChange={setValue}
      onPeriodChange={setPeriod}
      period={period}
      value={value}
    />
  );
};

export const Default: Story = {
  render: (props) => (
    <Wrapper>
      <DateBarPickerWithState {...props} />
    </Wrapper>
  ),
  parameters,
};
