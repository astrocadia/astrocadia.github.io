import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { Button } from './Button';
import {
  Primary,
  PrimaryWithStartIcon,
  PrimaryWithStartIconDisbled,
} from './PrimaryButton.stories';

const meta: Meta<typeof Button> = {
  title: 'Design System/Components/Button/FlowBase',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  component: Button,
  args: {
    variant: 'flow',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const FlowBase: Story = {
  args: {
    ...Primary.args,
    variant: 'flow',
  },
};

export const FlowBaseWithStartIcon: Story = {
  args: {
    ...PrimaryWithStartIcon.args,
    variant: 'flow',
  },
};

export const FlowBaseWithStartIconDisabled: Story = {
  args: {
    ...PrimaryWithStartIconDisbled.args,
    variant: 'flow',
  },
};
