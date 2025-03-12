import type { Meta, Parameters, StoryObj } from '@storybook/react';
import { DateTime } from 'luxon';
import type { FunctionComponent, ReactNode } from 'react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { GumbandDateProvider } from '../DatePickerCalendar/gumbandDateProvider';
import { DatePickerDropdown } from './DatePickerDropdown';

const meta: Meta<typeof DatePickerDropdown> = {
  title: 'Design System/Components/DatePickerDropdown',
  tags: ['autodocs'],
  component: DatePickerDropdown,
};

const parameters: Parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/U8xSFJcUV67F4dCpQGhh4N/Exhibit-Metrics-Date-Controls?type=design&node-id=2254-40832&mode=design&t=WVkGOtb6OuHofv7c-0',
  },
};

export default meta;
type Story = StoryObj<typeof DatePickerDropdown>;

const handleOnChange = (value: DateTime | null) => {
  // eslint-disable-next-line no-console
  console.log(`onChange: ${value}`);
};

const Wrapper: FunctionComponent<{ children: ReactNode }> = ({ children }) => (
  <GumbandDateProvider>
    <ThemeProviderWrapper>
      <div
        style={{
          display: 'flex',
          gap: 10,
          padding: 15,
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <div style={{ width: '100%' }}>{children}</div>
      </div>
    </ThemeProviderWrapper>
  </GumbandDateProvider>
);

export const Default: Story = {
  render: ({ onChange = handleOnChange, value = DateTime.now(), ...props }) => (
    <Wrapper>
      <DatePickerDropdown onChange={onChange} value={value} {...props} />
    </Wrapper>
  ),
  parameters,
};

export const NoValue: Story = {
  render: ({ onChange = handleOnChange, ...props }) => (
    <Wrapper>
      <DatePickerDropdown onChange={onChange} {...props} />
    </Wrapper>
  ),
  parameters,
};

export const DateInMiddleOfMonth: Story = {
  render: ({
    onChange = handleOnChange,
    value = DateTime.fromFormat('2023-11-20', 'yyyy-MM-dd'),
    view = 'week',
    ...props
  }) => (
    <Wrapper>
      <DatePickerDropdown
        onChange={onChange}
        value={value}
        view={view}
        {...props}
      />
    </Wrapper>
  ),
  parameters,
};

export const DateWithWeekCrossingMonth: Story = {
  render: ({
    onChange = handleOnChange,
    value = DateTime.fromFormat('2023-11-27', 'yyyy-MM-dd'),
    view = 'week',
    ...props
  }) => (
    <Wrapper>
      <DatePickerDropdown
        onChange={onChange}
        value={value}
        view={view}
        {...props}
      />
    </Wrapper>
  ),
  parameters,
};

export const DateWithWeekCrossingYear: Story = {
  render: ({
    onChange = handleOnChange,
    value = DateTime.fromFormat('2022-12-26', 'yyyy-MM-dd'),
    view = 'week',
    ...props
  }) => (
    <Wrapper>
      <DatePickerDropdown
        onChange={onChange}
        value={value}
        view={view}
        {...props}
      />
    </Wrapper>
  ),
  parameters,
};
