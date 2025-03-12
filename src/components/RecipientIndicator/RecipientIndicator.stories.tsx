import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { RecipientIndicator } from './RecipientIndicator';
import type { EntityUser } from '../../app/services/user';

const TOWELIE: EntityUser = {
  id: 6789,
  userId: 209,
  role: 'viewer',
  email: 'ttowel@deeplocal.com',
  firstName: 'Towelie',
  lastName: 'Towel',
  profile_image:
    'https://static.wikia.nocookie.net/southpark/images/0/07/Towelie-0.png',
};

const meta: Meta<typeof RecipientIndicator> = {
  title: 'Design System/Composite Components/RecipientIndicator',
  component: RecipientIndicator,
  args: {
    currentUser: TOWELIE,
    userCount: 3,
    isCurrentUserIncluded: true,
    open: false,
    onOpenChange: undefined,
  },
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: 'var(--background-workspace-color)' }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RecipientIndicator>;

export const Default: Story = {};
export const Open: Story = {
  args: {
    open: true,
  },
};
export const OpenOnHover: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <RecipientIndicator
        {...args}
        className='RecipientIndicator__hover'
        open={open}
        onOpenChange={setOpen}
      />
    );
  },
};
