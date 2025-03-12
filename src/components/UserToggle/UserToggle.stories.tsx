import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { UserToggle } from './UserToggle';
import { USER_ROLE } from '../../app/services/user';

const towelie = {
  id: 6789,
  userId: 209,
  role: USER_ROLE.MANAGER,
  email: 'ttowel@deeplocal.com',
  firstName: 'Towelie',
  lastName: 'Towel',
  profile_image:
    'https://static.wikia.nocookie.net/southpark/images/0/07/Towelie-0.png',
};

const meta: Meta<typeof UserToggle> = {
  title: 'Design System/Composite Components/UserToggle',
  tags: ['autodocs'],
  component: UserToggle,
  args: {
    user: towelie,
    isCurrentUser: false,
  },
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <div
          style={{
            backgroundColor: 'var(--background-workspace-color)',
            padding: '1rem',
          }}
        >
          <Story />
        </div>
      </ThemeProviderWrapper>
    ),
  ],
  render: ({ value: valueProp, ...props }) => {
    const [value, setValue] = useState(valueProp);

    return (
      <UserToggle {...props} value={value} onChange={() => setValue(!value)} />
    );
  },
};

export default meta;
type Story = StoryObj<typeof UserToggle>;

export const Default: Story = {};
export const IsCurrentUser: Story = {
  args: {
    isCurrentUser: true,
  },
};
export const Selected: Story = {
  args: {
    value: true,
  },
};
export const IsCurrentUserSelected: Story = {
  args: {
    isCurrentUser: true,
    value: true,
  },
};

export const UserWithLongAsHeckLabels: Story = {
  args: {
    user: {
      ...towelie,
      firstName: 'Towelie Towelie Towelie Towelie Towelie Towelie Towelie',
      lastName: 'Towel Towel Towel Towel Towel Towel Towel',
      email:
        "Ihavenoideawhat'sgoingon...seriously,guys.Ihavenoideawhatsgoingon@tegridyfarms.com",
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const LoadingSelected: Story = {
  args: {
    loading: true,
    isCurrentUser: true,
  },
};
