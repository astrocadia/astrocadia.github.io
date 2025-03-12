import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { Badge } from './Badge';
import {
  DebugIconBadge,
  ErrorIconBadge,
  InfoIconBadge,
  WarningIconBadge,
} from './index';

const meta: Meta<typeof Badge> = {
  title: 'Design System/Badges',
  tags: ['autodocs'],
  component: Badge,
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div
        style={{
          display: 'flex',
          gap: 10,
          background: 'white',
          padding: '1rem',
        }}
      >
        <DebugIconBadge />
        <ErrorIconBadge />
        <InfoIconBadge />
        <WarningIconBadge />
      </div>
    </ThemeProviderWrapper>
  ),
};
