import type { Meta, StoryObj } from '@storybook/react';
import type { FunctionComponent, ReactNode } from 'react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Design System/Components/Skeleton',
  tags: ['autodocs'],
  component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

const StoryWrapper: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => (
  <ThemeProviderWrapper>
    <div style={{ display: 'flex', gap: 10 }}>{children}</div>
  </ThemeProviderWrapper>
);

export const Default: Story = {
  render: () => (
    <StoryWrapper>
      <Skeleton variant='rectangular' width={100} height={50} />
      <Skeleton variant='rounded' width={100} height={50} />
      <Skeleton variant='text' width={100} style={{ fontSize: '1rem' }} />
    </StoryWrapper>
  ),
};
