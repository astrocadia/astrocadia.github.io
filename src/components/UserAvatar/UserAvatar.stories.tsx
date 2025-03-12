import type { Meta, StoryObj } from '@storybook/react';
import { UserAvatar, type UserAvatarProps } from './UserAvatar';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import type { User } from '../../app/services/user';

const meta: Meta<typeof UserAvatar> = {
  title: 'Design System/Composite Components/UserAvatar',
  tags: ['autodocs'],
  component: UserAvatar,
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
};

const user: UserAvatarProps['user'] = {
  email: 'ttowel@deeplocal.com',
  firstName: 'Towelie',
  lastName: 'Towel',
  profile_image:
    'https://static.wikia.nocookie.net/southpark/images/0/07/Towelie-0.png',
};

export default meta;
type Story = StoryObj<typeof UserAvatar>;

export const Default: Story = {
  args: {
    user,
  },
};

export const NoImage: Story = {
  args: {
    user: {
      ...user,
      profile_image: undefined,
    },
  },
};

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const getRandomName = () => {
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${alphabet[randomNumber % alphabet.length]}random`;
};

let id = 0;
const getRandomUser = (): User => {
  id += 1;

  return {
    email: 'oscar@deeplocal.com',
    firstName: getRandomName(),
    lastName: getRandomName(),
    profile_image: undefined,
    dladmin: false,
    id,
  };
};

export const ManyRandomNoImages: Story = {
  render: ({ user: _user, ...args }) => {
    const users: Array<User> = Array.from({ length: 100 }, getRandomUser);

    return (
      <div>
        {users.map((iteratedUser, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <UserAvatar key={index} user={iteratedUser} {...args} />
        ))}
      </div>
    );
  },
};
