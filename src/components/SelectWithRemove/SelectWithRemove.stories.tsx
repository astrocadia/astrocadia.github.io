import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import {
  SelectWithRemove,
  type SelectWithRemoveValues,
} from './SelectWithRemove';

const animalOptions = [
  { label: 'Dog', value: 'dog' },
  { label: 'Cat', value: 'cat' },
  { label: 'Bird', value: 'bird' },
];

type Story = StoryObj<typeof SelectWithRemove>;

const meta: Meta<typeof SelectWithRemove> = {
  args: {
    options: animalOptions,
    onDelete: () => {
      // eslint-disable-next-line no-alert
      alert('Delete');
    },
  },
  title: 'Design System/Composite Components/SelectWithRemove',
  tags: ['autodocs'],
  component: SelectWithRemove,
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  render: ({ value: _value, onChange: _onChange, ...args }) => {
    const [value, setValue] = useState<string>('dog');

    return (
      <SelectWithRemove
        value={value}
        onChange={setValue as (newValue: SelectWithRemoveValues) => void}
        {...args}
      />
    );
  },
};
export default meta;

export const Default: Story = {};

export const NoDotIndicator: Story = {
  args: {
    disableDotIndicator: true,
  },
};

const mixedValueTypeOptions = [
  { label: 'Dog', value: 'dog' },
  { label: 'Cat', value: 1 },
  { label: 'Bird', value: 'bird' },
];

export const MixedValues: Story = {
  args: {
    options: mixedValueTypeOptions,
  },
};

export const NoRemove: Story = {
  args: {
    onDelete: undefined,
  },
};
