import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { CountBadge } from './CountBadge';

const meta: Meta<typeof CountBadge> = {
  title: 'Design System/Components/CountBadge',
  tags: ['autodocs'],
  component: CountBadge,
};

export default meta;
type Story = StoryObj<typeof CountBadge>;

export const Default: Story = {
  render: ({ count = 5, ...props }) => (
    <ThemeProviderWrapper>
      <div style={{ padding: '5rem', backgroundColor: 'white' }}>
        <CountBadge count={count} {...props} />
      </div>
    </ThemeProviderWrapper>
  ),
};
