import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { InputRequirement } from './InputRequirement';

const meta: Meta<typeof InputRequirement> = {
  title: 'Design System/Components/InputRequirement',
  tags: ['autodocs'],
  component: InputRequirement,
};

export default meta;
type Story = StoryObj<typeof InputRequirement>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <InputRequirement>Lorem ipsum</InputRequirement>
      <InputRequirement requirementMet>Lorem ipsum</InputRequirement>
    </ThemeProviderWrapper>
  ),
};
