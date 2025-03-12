import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { UserInviteConfirmedDialog } from './UserInviteConfirmedDialog';

const onDone = () => {
  // eslint-disable-next-line no-alert
  alert('Done');
};

const onBackToUsers = () => {
  // eslint-disable-next-line no-alert
  alert('Back to Users');
};

const meta: Meta<typeof UserInviteConfirmedDialog> = {
  title: 'Design System/Composite Components/UserInviteConfirmedDialog',
  tags: ['autodocs'],
  component: UserInviteConfirmedDialog,
  args: {
    email: 'towelie@southpark.com',
    open: true,
    onDone,
    onBackToUsers,
  },
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UserInviteConfirmedDialog>;

export const Default: Story = {};

export const LongEmail: Story = {
  args: {
    email: 'thisisaverylongemailaddress@averylongemailaddress.com',
  },
};
