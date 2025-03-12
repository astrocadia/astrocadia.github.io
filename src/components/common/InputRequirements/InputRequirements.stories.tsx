import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { InputRequirements } from './InputRequirements';
import { InputRequirement } from '../InputRequiment';

const meta: Meta<typeof InputRequirements> = {
  title: 'Design System/Components/InputRequirements',
  tags: ['autodocs'],
  component: InputRequirements,
};

export default meta;
type Story = StoryObj<typeof InputRequirements>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <InputRequirements>
        <InputRequirement>Lorem ipsum </InputRequirement>
        <InputRequirement requirementMet>Lorem ipsum </InputRequirement>
      </InputRequirements>
    </ThemeProviderWrapper>
  ),
};
