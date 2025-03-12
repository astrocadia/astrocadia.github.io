import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import {
  UserManagementDialogs,
  type UserManagementDialogsProps,
} from './UserManagementDialogs';
import { Button } from '../common/buttons';
import type { UserRole } from '../../app/services/user';

const INVITE_TITLE = 'Invite Workspace User' as const;
const INVITE_SUBTITLE =
  'User will be added to all projects and exhibits within this workspace' as const;
const LIST_TITLE = 'Workspace Users' as const;
const LIST_SUBTITLE = 'Users for this workspace' as const;

const meta: Meta<typeof UserManagementDialogs> = {
  title: 'Design System/Composite Components/UserManagementDialogs',
  tags: ['autodocs'],
  component: UserManagementDialogs,
  args: {
    inviteTitle: INVITE_TITLE,
    inviteSubtitle: INVITE_SUBTITLE,
    listTitle: LIST_TITLE,
    listSubtitle: LIST_SUBTITLE,
  },
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  render: (props) => {
    const [users, setUsers] = useState<UserManagementDialogsProps['users']>([
      {
        id: 0,
        firstName: 'Eric',
        lastName: 'Cartman',
        userId: 0,
        email: 'ecartman@southpark.com',
        role: 'manager' as UserRole,
        profile_image:
          'https://upload.wikimedia.org/wikipedia/en/thumb/7/77/EricCartman.png/220px-EricCartman.png',
      },
    ]);
    const [open, setOpen] = useState<boolean>(false);
    const handleInviteUser: UserManagementDialogsProps['onInviteUser'] = async (
      email
    ) => {
      setUsers([
        ...users,
        {
          id: users.length + 1,
          firstName: 'John',
          lastName: 'Doe',
          userId: users.length + 1,
          email,
          role: 'developer' as UserRole,
        },
      ]);
    };

    const handleRemoveUser: UserManagementDialogsProps['onRemoveUser'] = (
      userId
    ) => {
      setUsers(users.filter((user) => user.userId !== userId));
    };

    const handleRoleChange = (userId: number, role: string) => {
      const updatedUsers = users.map((user) => {
        if (user.userId === userId) {
          return { ...user, role };
        }
        return user;
      });
      setUsers(updatedUsers as UserManagementDialogsProps['users']);
    };

    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <UserManagementDialogs
          {...props}
          onInviteUser={handleInviteUser}
          onRemoveUser={handleRemoveUser}
          onRoleChange={handleRoleChange}
          open={open}
          onClose={() => setOpen(false)}
          currentUserId={0}
          users={users}
        />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof UserManagementDialogs>;

export const Default: Story = {};
