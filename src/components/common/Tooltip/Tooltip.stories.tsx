import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '@mui/material';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { Tooltip } from './Tooltip';
import { GearIcon } from '../icons';

const meta: Meta<typeof Tooltip> = {
  title: 'Design System/Components/Tooltip',
  tags: ['autodocs'],
  component: Tooltip,
  args: {
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium',
    placement: 'top',
  },
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  parameters: {
    controls: { expanded: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WXkouxbpbj3I6bP5bBDvJk/GB2-Design-System?node-id=3812-19&m=dev',
    },
  },
  render: (args) => {
    return (
      <Tooltip {...args}>
        <IconButton>
          <GearIcon />
        </IconButton>
      </Tooltip>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {};

export const OpenLongText: Story = {
  args: {
    PopperProps: { open: true },
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium',
  },
};

export const OpenShortText: Story = {
  args: {
    PopperProps: { open: true },
    title: 'Lorem ipsum',
  },
};
