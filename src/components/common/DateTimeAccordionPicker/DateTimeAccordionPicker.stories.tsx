import type { Meta, StoryObj } from '@storybook/react';
import { DateTime } from 'luxon';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { GumbandDateProvider } from '../DatePickerCalendar/gumbandDateProvider';
import { DateTimeAccordionPicker } from './DateTimeAccordionPicker';

const handleOnChange = (value: DateTime | null) => {
  // eslint-disable-next-line no-console
  console.log(`onChange: ${value}`);
};

const meta: Meta<typeof DateTimeAccordionPicker> = {
  title: 'Design System/Composite Components/DateTimeAccordionPicker',
  tags: ['autodocs'],
  component: DateTimeAccordionPicker,
  decorators: [
    (Story) => (
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
            <div style={{ width: '100%' }}>
              <Story />
            </div>
          </div>
        </ThemeProviderWrapper>
      </GumbandDateProvider>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/U8xSFJcUV67F4dCpQGhh4N/Exhibit-Metrics-Date-Controls?type=design&node-id=2254-40832&mode=design&t=WVkGOtb6OuHofv7c-0',
    },
  },
  args: {
    onChange: handleOnChange,
  },
};

export default meta;
type Story = StoryObj<typeof DateTimeAccordionPicker>;

export const Default: Story = {
  args: {
    value: DateTime.now(),
  },
};

export const NoValue: Story = {
  args: {},
};

export const DateInMiddleOfMonth: Story = {
  args: {
    value: DateTime.fromFormat('2023-11-20', 'yyyy-MM-dd'),
  },
};

export const DateWithWeekCrossingMonth: Story = {
  args: {
    value: DateTime.fromFormat('2023-11-27', 'yyyy-MM-dd'),
  },
};

export const DateWithWeekCrossingYear: Story = {
  args: {
    value: DateTime.fromFormat('2022-12-26', 'yyyy-MM-dd'),
  },
};

export const Open: Story = {
  args: {
    value: DateTime.fromFormat('2022-12-26', 'yyyy-MM-dd'),
    open: true,
  },
};
