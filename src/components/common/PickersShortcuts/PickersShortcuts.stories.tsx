import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { PickersShortcuts } from './PickersShortcuts';

const meta: Meta<typeof PickersShortcuts> = {
  title: 'Design System/Components/PickersShortcuts',
  tags: ['autodocs'],
  component: PickersShortcuts,
};
export default meta;

const Render = ({ ...props }) => {
  const handleChange = (newValue: unknown) => {
    // eslint-disable-next-line no-alert
    alert(newValue);
  };
  return (
    <ThemeProviderWrapper>
      <PickersShortcuts
        {...props}
        onChange={handleChange}
        isValid={() => true}
      />
    </ThemeProviderWrapper>
  );
};

type Story = StoryObj<typeof PickersShortcuts>;

export const Default: Story = {
  render: Render,
  args: {
    items: [
      {
        label: 'example',
        getValue: () => 'example - Value',
      },
    ],
  },
};

export const WithLabel: Story = {
  render: Render,
  args: {
    label: 'Quick Select',
    items: [
      {
        label: 'example',
        getValue: () => 'example - Value',
      },
    ],
  },
};

export const Empty: Story = {
  render: Render,
  args: {
    label: 'Quick Select',
  },
};
