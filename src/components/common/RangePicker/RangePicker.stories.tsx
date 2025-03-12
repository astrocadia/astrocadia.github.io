import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  RangePicker,
  type DateTimeRangeValue,
  DEFAULT_DATE_RANGE,
} from './RangePicker';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { defaultShortcuts } from './defaultShortcuts';

const meta: Meta<typeof RangePicker> = {
  title: 'Design System/Composite Components/RangePicker',
  tags: ['autodocs'],
  component: RangePicker,
};
export default meta;

const Render = ({ ...props }) => {
  const initialValue: DateTimeRangeValue =
    defaultShortcuts
      .find((shortcut) => shortcut.default)
      ?.getValue({ isValid: () => true }) ?? DEFAULT_DATE_RANGE;
  const [value, setValue] = useState<DateTimeRangeValue>(initialValue);
  const handleChange = (newValue: DateTimeRangeValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProviderWrapper>
      <RangePicker {...props} onChange={handleChange} value={value} />
    </ThemeProviderWrapper>
  );
};
type Story = StoryObj<typeof RangePicker>;
export const Default: Story = { render: Render };
export const Disabled: Story = { args: { disabled: true }, render: Render };
