import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { Badge } from '../badges';
import { Button } from '../buttons';
import { HardwareComponentIcon, SoftwareComponentIcon } from '../icons';
import {
  SelectWithActions,
  SelectWithActionsOption,
  type SelectWithActionsInternalValue,
  type SelectWithActionsProps,
} from './SelectWithActions';

type Story = StoryObj<typeof SelectWithActions>;

const meta: Meta<typeof SelectWithActions> = {
  title: 'Design System/Composite Components/SelectWithActions',
  tags: ['autodocs'],
  component: SelectWithActions,
};
export default meta;

const basicOptions: SelectWithActionsOption[] = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', caption: 'This is a caption.', value: 'option-3' },
];

const Render = ({
  onChange: onChangeProp,
  ...props
}: SelectWithActionsProps) => {
  const [value, setValue] = useState<SelectWithActionsOption['value'][]>([]);
  const handleChange: SelectWithActionsProps['onChange'] = (newValue) => {
    setValue(newValue as SelectWithActionsInternalValue);
  };

  return (
    <ThemeProviderWrapper>
      <SelectWithActions value={value} onChange={handleChange} {...props} />
    </ThemeProviderWrapper>
  );
};

export const Default: Story = {
  args: {
    options: basicOptions,
  },
  render: Render,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    options: basicOptions,
  },
  render: Render,
};

const SelectWithCustomActionRender = ({
  onChange: onChangeProp,
  ...props
}: SelectWithActionsProps) => {
  const [value, setValue] = useState<SelectWithActionsOption['value'][]>([]);
  const handleChange: SelectWithActionsProps['onChange'] = (newValue) => {
    setValue(newValue as SelectWithActionsInternalValue);
  };

  const selectAll = () => {
    setValue(basicOptions.map((option) => option.value));
  };

  return (
    <ThemeProviderWrapper>
      <SelectWithActions
        value={value}
        onChange={handleChange}
        actions={
          <Button onClick={selectAll} variant='secondary'>
            Select All
          </Button>
        }
        {...props}
      />
    </ThemeProviderWrapper>
  );
};

export const SelectWithCustomAction: Story = {
  args: {
    options: basicOptions,
  },
  render: SelectWithCustomActionRender,
};

const SoftwareIconBadge = <Badge Icon={SoftwareComponentIcon} />;
const HardwareIconBadge = <Badge Icon={HardwareComponentIcon} />;
const componentOptions: SelectWithActionsOption[] = [];

// This just creates a bunch of options to test the performance of the dropdown.
for (let i = 0; i < 12; i++) {
  componentOptions.push({
    icon: i % 2 === 0 ? SoftwareIconBadge : HardwareIconBadge,
    label: i % 2 === 0 ? 'Software Label' : 'Hardware Label',
    value: `option-${i}`,
  });
}

export const ComponentSelectWithActions: Story = {
  args: {
    label: 'Component',
    showFilterIcon: false,
    options: componentOptions,
  },
  render: Render,
};
