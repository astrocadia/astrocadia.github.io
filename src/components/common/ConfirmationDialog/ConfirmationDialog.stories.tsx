import { type Meta, type StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { CheckIcon, WarningIcon } from '../icons';
import { ConfirmationDialog } from './ConfirmationDialog';

const meta: Meta<typeof ConfirmationDialog> = {
  title: 'Design System/Components/ConfirmationDialog',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: ConfirmationDialog,
};

export default meta;
type Story = StoryObj<typeof ConfirmationDialog>;

export const Default: Story = {
  args: {
    open: true,
  },
};

export const CustomExample: Story = {
  args: {
    open: true,
    title: 'Save Changes',
    AcceptButtonProps: {
      startIcon: <CheckIcon />,
    },
    acceptText: 'Save',
    cancelText: 'No Thanks',
    CancelButtonProps: {
      startIcon: <WarningIcon />,
    },
  },
};
