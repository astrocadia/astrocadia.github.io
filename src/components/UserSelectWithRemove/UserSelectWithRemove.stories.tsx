import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import {
  UserSelectWithRemove,
  type UserSelectWithRemoveProps,
} from './UserSelectWithRemove';
import type { UserRole } from '../../app/services/user';

export default {
  title: 'Design System/Composite Components/UserSelectWithRemove',
  component: UserSelectWithRemove,
} as Meta;

export const Default: StoryObj<UserSelectWithRemoveProps> = {
  render: (args) => {
    const [value, setValue] = useState<UserRole>('developer');
    // eslint-disable-next-line no-alert
    const handleDelete = () => alert('Deleted!');

    return (
      <ThemeProviderWrapper>
        <UserSelectWithRemove
          {...args}
          value={value}
          onChange={(newValue) => setValue(newValue as UserRole)}
          onDelete={handleDelete}
        />
      </ThemeProviderWrapper>
    );
  },
};
