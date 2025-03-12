import type { Meta, StoryObj } from '@storybook/react';
import type { FunctionComponent, ReactNode } from 'react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { FormHelperText } from './FormHelperText';

const meta: Meta<typeof FormHelperText> = {
  title: 'Design System/Components/FormHelperText',
  tags: ['autodocs'],
  component: FormHelperText,
};

export default meta;
type Story = StoryObj<typeof FormHelperText>;

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
      <FormHelperText>Helper text</FormHelperText>
    </StoryWrapper>
  ),
};
export const Disabled: Story = {
  render: () => (
    <StoryWrapper>
      <FormHelperText disabled>Helper text</FormHelperText>
    </StoryWrapper>
  ),
};
export const Error: Story = {
  render: () => (
    <StoryWrapper>
      <FormHelperText error>Helper text</FormHelperText>
    </StoryWrapper>
  ),
};
export const Focused: Story = {
  render: () => (
    <StoryWrapper>
      <FormHelperText>Helper text</FormHelperText>
    </StoryWrapper>
  ),
};
