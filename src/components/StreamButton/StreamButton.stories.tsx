import type { Meta, StoryObj } from '@storybook/react';
import { StreamButton, StreamButtonProps } from '.';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';

const meta: Meta<typeof StreamButton> = {
  title: 'Design System/Components/StreamButton',
  tags: ['autodocs'],
  component: StreamButton,
};

export default meta;
type Story = StoryObj<StreamButtonProps>;

const render = (props: StreamButtonProps) => (
  <ThemeProviderWrapper>
    <div
      style={{
        display: 'flex',
        width: props.activeLabel
          ? `${8.25 * props.activeLabel.length + 50}px`
          : '160px',
        justifyContent: 'flex-end',
      }}
    >
      <StreamButton {...props} />
    </div>
  </ThemeProviderWrapper>
);

export const Default: Story = {
  render,
};

export const CustomLabels: Story = {
  args: {
    activeLabel: '🥳 PARTY ROCKERS IN THE HOUSE TONIGHT!!! 🥳',
    inactiveLabel: 'Party Rock? 🤔',
  },
  render,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render,
};

export const DisabledActive: Story = {
  args: {
    disabled: true,
    initialState: true,
    activeLabel: "Can't stop streaming",
  },
  render,
};
