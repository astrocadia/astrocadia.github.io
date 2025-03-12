import type { Meta, StoryObj } from '@storybook/react';
import { Dot } from './Dot';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';

const meta: Meta<typeof Dot> = {
  title: 'Design System/Components/Dot',
  tags: ['autodocs'],
  component: Dot,
};

export default meta;
type Story = StoryObj<typeof Dot>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Dot />
        <Dot height={12} />
        <Dot color='var(--base-color-brand-primary)' />
        <Dot color='var(--base-color-brand-primary)' height={12} />
      </div>
    </ThemeProviderWrapper>
  ),
};
