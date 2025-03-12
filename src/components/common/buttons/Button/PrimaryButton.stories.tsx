import type { Meta, StoryObj } from '@storybook/react';
import { EditIcon } from '../../icons/EditIcon';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { Button } from './Button';
import { Default } from './Button.stories';

const { parameters } = Default;

const meta: Meta<typeof Button> = {
  title: 'Design System/Components/Button/Primary',
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

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Edit Users',
  },
};

export const PrimaryWithStartIcon: Story = {
  args: {
    ...Primary.args,
    startIcon: <EditIcon />,
  },
};

export const PrimaryWithStartIconDisbled: Story = {
  args: {
    ...PrimaryWithStartIcon.args,
    disabled: true,
  },
};
