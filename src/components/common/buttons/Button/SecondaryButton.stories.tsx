import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { Button } from './Button';
import { Default } from './Button.stories';
import {
  Primary,
  PrimaryWithStartIcon,
  PrimaryWithStartIconDisbled,
} from './PrimaryButton.stories';

const { parameters } = Default;

const meta: Meta<typeof Button> = {
  title: 'Design System/Components/Button/Secondary',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  component: Button,
  parameters,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: 'secondary',
  },
};

export const SecondaryWithStartIcon: Story = {
  args: {
    ...PrimaryWithStartIcon.args,
    variant: 'secondary',
  },
};

export const SecondaryWithStartIconDisabled: Story = {
  args: {
    ...PrimaryWithStartIconDisbled.args,
    variant: 'secondary',
  },
};
