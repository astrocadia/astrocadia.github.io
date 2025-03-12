import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { NewChip } from './NewChip';

const meta: Meta<typeof NewChip> = {
  title: 'Design System/Composite Components/NewChip',
  component: NewChip,
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NewChip>;

export const Default: Story = {};
