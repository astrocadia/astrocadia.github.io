import type { Meta, Parameters, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Components/Button',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

const parameters: Parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/trLRzbl7QqkwryZy5XBTUC/Buttons?type=design&node-id=457-5305&mode=design&t=kLmy2IzpWAGrt2hY-0',
  },
};

export const Default: Story = {
  args: {
    children: 'Edit User',
  },
  parameters,
};
