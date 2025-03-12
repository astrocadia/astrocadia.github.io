import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import {
  UserRoleListDialog,
  type UserRoleListDialogProps,
} from './UserRoleListDialog';
import { Button } from '../common/buttons';
import type { EntityUser } from '../../app/services/user';

const INVITE_TITLE = 'Invite Workspace User' as const;
const INVITE_SUBTITLE =
  'User will be added to all projects and exhibits within South Park Elementary' as const;
const LIST_TITLE = 'Workspace Users' as const;
const LIST_SUBTITLE = 'Users for South Park Elementary' as const;

const DEFAULT_OPEN_STATE = false as const;

type Story = StoryObj<typeof UserRoleListDialog>;

const users: Array<EntityUser> = [
  {
    id: 6779,
    userId: 49,
    role: 'manager',
    email: 'kbroflovski@deeplocal.com',
    firstName: 'Kyle',
    lastName: 'Broflovski',
    profile_image:
      'https://upload.wikimedia.org/wikipedia/en/2/25/KyleBroflovski.png',
  },
  {
    id: 10731,
    userId: 266,
    role: 'developer',
    email: 'ecartman@deeplocal.com',
    firstName: 'Eric',
    lastName: 'Cartman',
    profile_image:
      'https://upload.wikimedia.org/wikipedia/en/thumb/7/77/EricCartman.png/220px-EricCartman.png',
  },
  {
    id: 10641,
    userId: 235,
    role: 'manager',
    email: 'smarsh@deeplocal.com',
    firstName: 'Stan',
    lastName: 'Marsh',
    profile_image:
      'https://upload.wikimedia.org/wikipedia/en/a/a7/StanMarsh.png',
  },
  {
    id: 10499,
    userId: 90,
    role: 'manager',
    email: 'kmccormick@deeplocal.com',
    firstName: 'Kenny',
    lastName: 'McCormick',
    profile_image:
      'https://upload.wikimedia.org/wikipedia/en/6/6f/KennyMcCormick.png',
  },
  {
    id: 6789,
    userId: 209,
    role: 'developer',
    email: 'ttowel@deeplocal.com',
    firstName: 'Towelie',
    lastName: 'Towel',
    profile_image:
      'https://static.wikia.nocookie.net/southpark/images/0/07/Towelie-0.png',
  },
];

const currentUserId = users[0].userId;

const getUserById = (userId: number) => {
  return users.find((user) => user.id === userId);
};

const onRoleChange = (userId: number, role: string) => {
  const user = getUserById(userId);
  // eslint-disable-next-line no-alert
  alert(`${user?.firstName}'s role changed to ${role}`);
};

const KENNY_ID = users.find((user) => user.firstName === 'Kenny')?.id;

const onRemoveUser = (userId: number) => {
  const user = getUserById(userId);

  if (user?.id === KENNY_ID) {
    // eslint-disable-next-line no-alert
    alert('OMG! YOU KILLED KENNY! 😭');
    return;
  }
  // eslint-disable-next-line no-alert
  alert(`${user?.firstName} removed`);
};

const onInviteUser: UserRoleListDialogProps['onInviteUser'] = async (
  email,
  role
) => {
  // eslint-disable-next-line no-alert
  alert(`Invited ${email} as ${role}`);
};

const meta: Meta<typeof UserRoleListDialog> = {
  title: 'Design System/Composite Components/UserRoleListDialog',
  tags: ['autodocs'],
  component: UserRoleListDialog,
  args: {
    users,
    currentUserId,
    onRoleChange,
    onRemoveUser,
    onInviteUser,
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
};
export default meta;

export const Default: Story = {
  render: (props) => {
    const [open, setOpen] = useState<boolean>(DEFAULT_OPEN_STATE);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <UserRoleListDialog
          {...props}
          open={open}
          onClose={() => setOpen(false)}
        />
      </>
    );
  },
};

/**
 * Creates a long list of users and modifies some of them to have undefined first or last names.
 */
const getModifiedLongListOfUsers = () => {
  const manyUsers = [...users, ...users, ...users, ...users];

  return manyUsers.map((user, index) => {
    switch (index % 3) {
      case 0:
        return {
          ...user,
          firstName: undefined,
        };
      case 1:
        return {
          ...user,
          firstName: undefined,
          lastName: undefined,
        };
      default:
        return user;
    }
  });
};

export const LongList: Story = {
  args: {
    users: getModifiedLongListOfUsers(),
  },
  render: (props) => {
    const [open, setOpen] = useState<boolean>(DEFAULT_OPEN_STATE);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <UserRoleListDialog
          {...props}
          open={open}
          onClose={() => setOpen(false)}
        />
      </>
    );
  },
};

export const OnlyCurrentUser: Story = {
  args: {
    users: [users[0]],
  },
  render: (props) => {
    const [open, setOpen] = useState<boolean>(DEFAULT_OPEN_STATE);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <UserRoleListDialog
          {...props}
          open={open}
          onClose={() => setOpen(false)}
        />
      </>
    );
  },
};
