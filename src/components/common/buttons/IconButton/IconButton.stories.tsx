import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { EditIcon } from '../../icons/EditIcon';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Design System/Components/IconButton',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: IconButton,
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: <EditIcon />,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    ...Primary.args,
    disabled: true,
  },
};

export const Ghost: Story = {
  args: {
    ...Primary.args,
    variant: 'ghost',
  },
};

export const GhostDisabled: Story = {
  args: {
    ...Ghost.args,
    disabled: true,
  },
};

export const GhostSmall: Story = {
  args: {
    ...Ghost.args,
    size: 'small',
  },
};

export const GhostSmallDisabled: Story = {
  args: {
    ...GhostSmall.args,
    size: 'small',
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: 'secondary',
  },
};

export const SecondaryDisabled: Story = {
  args: {
    ...Secondary.args,
    disabled: true,
  },
};
