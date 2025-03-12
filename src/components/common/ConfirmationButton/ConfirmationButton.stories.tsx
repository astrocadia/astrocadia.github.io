import { type Meta, type StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { CheckIcon, SendIcon, WarningIcon } from '../icons';
import { ConfirmationButton } from './ConfirmationButton';

const meta: Meta<typeof ConfirmationButton> = {
  title: 'Design System/Components/ConfirmationButton',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: ConfirmationButton,
};

export default meta;
type Story = StoryObj<typeof ConfirmationButton>;

export const Default: Story = {
  args: {
    children: 'Delete',
  },
};

export const Custom: Story = {
  args: {
    children: 'Send Message',
    ConfirmationDialogProps: {
      AcceptButtonProps: {
        startIcon: <CheckIcon />,
      },
      acceptText: 'Send',
      CancelButtonProps: {
        startIcon: <WarningIcon />,
      },
      cancelText: "Don't Send",
    },
    dialogTitle: 'Send the message now?',
    dialogMessage: 'Are you sure you want to send the message now?',
    startIcon: <SendIcon />,
    variant: 'secondary',
  },
};
