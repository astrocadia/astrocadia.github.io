import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { LogLevelFilterSelect } from './LogLevelFilterSelect';

const meta: Meta<typeof LogLevelFilterSelect> = {
  title: 'Design System/Composite Components/LogLevelFilterSelect',
  tags: ['autodocs'],
  component: LogLevelFilterSelect,
  argTypes: {},
};
export default meta;

const render = ({ ...props }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState<string | string[]>([]);

  return (
    <ThemeProviderWrapper>
      <LogLevelFilterSelect
        {...props}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </ThemeProviderWrapper>
  );
};

type Story = StoryObj<typeof LogLevelFilterSelect>;
export const Default: Story = {
  render,
};
