import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { Chip, ChipProps } from './Chip';
import { TimeIcon } from '../icons';

const meta: Meta<typeof Chip> = {
  title: 'Design System/Components/Chip',
  tags: ['autodocs'],
  component: Chip,
  args: {
    label: 'Label',
    // The delete button shows up automatically if we don't do this.
    onDelete: undefined,
  },
};
export default meta;

type Story = StoryObj<typeof Chip>;

const render = ({ ...props }: ChipProps) => (
  <ThemeProviderWrapper>
    <Chip {...props} />
  </ThemeProviderWrapper>
);

export const Default: Story = {
  render,
};

export const DeleteButton: Story = {
  args: {
    // eslint-disable-next-line no-console
    onDelete: () => console.log('delete'),
  },
  render,
};

export const WithIcon: Story = {
  args: {
    icon: <TimeIcon />,
  },
  render,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render,
};

export const DisabledWithDeletableAndIcon: Story = {
  args: {
    disabled: true,
    icon: <TimeIcon />,
    // eslint-disable-next-line no-console
    onDelete: () => console.log('delete'),
  },
  render,
};

export const Selected: Story = {
  args: {
    selected: true,
  },
  render,
};

export const Small: Story = {
  args: {
    size: 'small',
  },
  render,
};

export const SmallWithIcon: Story = {
  args: {
    size: 'small',
    icon: <TimeIcon />,
  },
  render,
};

export const SmallWithIconAndDeletable: Story = {
  args: {
    size: 'small',
    // eslint-disable-next-line no-console
    onDelete: () => console.log('delete'),
    icon: <TimeIcon />,
  },
  render,
};
