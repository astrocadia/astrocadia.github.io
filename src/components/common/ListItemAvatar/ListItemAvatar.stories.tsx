import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { Avatar } from '../Avatar';
import { ListItemAvatar } from './ListItemAvatar';

const meta: Meta<typeof ListItemAvatar> = {
  title: 'Design System/Components/ListItemAvatar',
  tags: ['autodocs'],
  component: ListItemAvatar,
};

export default meta;
type Story = StoryObj<typeof ListItemAvatar>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', gap: 10 }}>
        <ListItemAvatar>
          <Avatar>JD</Avatar>
        </ListItemAvatar>
      </div>
    </ThemeProviderWrapper>
  ),
};
