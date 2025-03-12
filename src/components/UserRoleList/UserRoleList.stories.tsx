import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { UserRoleList } from './UserRoleList';
import type { EntityUser } from '../../app/services/user';

type Story = StoryObj<typeof UserRoleList>;

const exhibitUsers: Array<EntityUser> = [
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
    role: 'viewer',
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
    role: 'viewer',
    email: 'ttowel@deeplocal.com',
    firstName: 'Towelie',
    lastName: 'Towel',
    profile_image:
      'https://static.wikia.nocookie.net/southpark/images/0/07/Towelie-0.png',
  },
];

const currentUserId = exhibitUsers[0].userId;

const getUserById = (userId: number) => {
  return exhibitUsers.find((user) => user.id === userId);
};

const onRoleChange = (userId: number, role: string) => {
  const user = getUserById(userId);
  // eslint-disable-next-line no-alert
  alert(`${user?.firstName}'s role changed to ${role}`);
};

const KENNY_ID = exhibitUsers.find((user) => user.firstName === 'Kenny')?.id;

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

const meta: Meta<typeof UserRoleList> = {
  title: 'Design System/Composite Components/UserRoleList',
  tags: ['autodocs'],
  component: UserRoleList,
  args: {
    onRoleChange,
    onRemoveUser,
    currentUserId,
  },
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'var(--background-workspace-color)',
            height: 'calc(100vh - 2rem)',
          }}
        >
          <Story />
        </div>
      </ThemeProviderWrapper>
    ),
  ],
};
export default meta;

export const Default: Story = {
  args: {
    users: exhibitUsers,
  },
};

export const NoUsersOtherThanYou: Story = {
  args: {
    users: [exhibitUsers[0]],
  },
};

export const NoAvatars: Story = {
  args: {
    users: exhibitUsers.map((user) => ({
      ...user,
      profile_image: undefined,
    })),
  },
};

export const ATowelHasNoName: Story = {
  args: {
    users: exhibitUsers.map((user) => {
      if (user.firstName === 'Towelie') {
        return {
          ...user,
          firstName: undefined,
          lastName: undefined,
        };
      }
      return user;
    }),
  },
};

const getLotsOfUsers = () => {
  const usersWithNoAvatar = exhibitUsers.map((user) => ({
    ...user,
    profile_image: undefined,
  }));
  return exhibitUsers.concat(
    usersWithNoAvatar,
    usersWithNoAvatar,
    usersWithNoAvatar,
    usersWithNoAvatar
  );
};

export const LongList: Story = {
  args: {
    users: getLotsOfUsers(),
  },
};
