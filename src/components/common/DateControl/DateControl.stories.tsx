import type { Meta, Parameters, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { DateControl, type DatePeriod } from './DateControl';

const meta: Meta<typeof DateControl> = {
  title: 'Design System/Components/DateControl',
  tags: ['autodocs'],
  component: DateControl,
  argTypes: {
    helperText: {
      control: { type: 'text' },
    },
    label: {
      control: { type: 'text' },
    },
  },
};

const parameters: Parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/U8xSFJcUV67F4dCpQGhh4N/Exhibit-Metrics-Date-Controls?type=design&node-id=2289-10136&mode=design&t=xPaTRheQoXyQzlrV-0',
  },
};

export default meta;
type Story = StoryObj<typeof DateControl>;

const handleOnChange = (period: DatePeriod) => {
  // eslint-disable-next-line no-alert
  alert(`onChange: ${period}`);
};

export const Default: Story = {
  render: ({ onChange = handleOnChange, ...props }) => (
    <ThemeProviderWrapper>
      <div
        style={{
          display: 'flex',
          gap: 10,
          minHeight: '50px',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '100%' }}>
          <DateControl onChange={onChange} {...props} />
        </div>
      </div>
    </ThemeProviderWrapper>
  ),
  parameters,
};
