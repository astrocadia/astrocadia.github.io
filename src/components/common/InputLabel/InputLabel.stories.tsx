import type { Meta, StoryObj } from '@storybook/react';
import type { FunctionComponent, ReactNode } from 'react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { InputLabel } from './InputLabel';

const meta: Meta<typeof InputLabel> = {
  title: 'Design System/Components/InputLabel',
  tags: ['autodocs'],
  component: InputLabel,
};

export default meta;
type Story = StoryObj<typeof InputLabel>;

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
      <InputLabel>Default</InputLabel>
      <InputLabel disabled>Disabled</InputLabel>
      <InputLabel error>Error</InputLabel>
      <InputLabel focused>Focused</InputLabel>
      <InputLabel required>Required</InputLabel>
    </StoryWrapper>
  ),
};

export const Small: Story = {
  render: () => (
    <StoryWrapper>
      <InputLabel shrink>Default</InputLabel>
      <InputLabel disabled shrink>
        Disabled
      </InputLabel>
      <InputLabel error shrink>
        Error
      </InputLabel>
      <InputLabel focused shrink>
        Focused
      </InputLabel>
      <InputLabel required shrink>
        Required
      </InputLabel>
    </StoryWrapper>
  ),
};
