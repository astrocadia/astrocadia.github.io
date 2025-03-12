import type { Meta, StoryObj } from '@storybook/react';
import { FormLabel } from './FormLabel';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';

type Story = StoryObj<typeof FormLabel>;

const meta: Meta<typeof FormLabel> = {
  title: 'Design System/Components/FormLabel',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: FormLabel,
};

export default meta;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};
