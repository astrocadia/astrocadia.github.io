import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Design System/Components/Avatar',
  tags: ['autodocs'],
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'grid', gap: 10 }}>
        <Avatar />
        <Avatar>JS</Avatar>
      </div>
    </ThemeProviderWrapper>
  ),
};
