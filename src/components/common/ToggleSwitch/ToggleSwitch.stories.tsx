import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { ToggleSwitch } from './ToggleSwitch';
import { CheckIcon } from '../icons';

const meta: Meta<typeof ToggleSwitch> = {
  title: 'Design System/Components/ToggleSwitch',
  tags: ['autodocs'],
  component: ToggleSwitch,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/QZrB9MDqVFSzsxpNG6zJ5V/Switches?node-id=1-82&t=xF6OFbqNo8s3S2qZ-1',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToggleSwitch>;

export const Default: Story = {
  render: () => <ToggleSwitch />,
};

export const Small: Story = {
  render: () => <ToggleSwitch size='small' />,
};

export const WithIcon: Story = {
  render: () => (
    <>
      <ToggleSwitch checkedIcon={<CheckIcon />} defaultChecked />
      <ToggleSwitch checkedIcon={<CheckIcon />} size='small' defaultChecked />
    </>
  ),
};

export const UncheckedState: Story = {
  render: () => (
    <>
      <ToggleSwitch checked={false} />
      <ToggleSwitch checked={false} size='small' />
    </>
  ),
};

export const CheckedState: Story = {
  render: () => (
    <>
      <ToggleSwitch checked />
      <ToggleSwitch checked checkedIcon={<CheckIcon />} />
      <ToggleSwitch checked size='small' />
      <ToggleSwitch checked checkedIcon={<CheckIcon />} size='small' />
    </>
  ),
};

export const Disabled: Story = {
  render: () => (
    <>
      <ToggleSwitch disabled />
      <ToggleSwitch disabled checked />
      <ToggleSwitch disabled checked checkedIcon={<CheckIcon />} />
      <ToggleSwitch disabled size='small' />
      <ToggleSwitch disabled checked size='small' />
      <ToggleSwitch disabled checked checkedIcon={<CheckIcon />} size='small' />
    </>
  ),
};
