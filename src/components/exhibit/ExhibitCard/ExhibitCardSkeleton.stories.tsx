import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { ExhibitCardSkeleton } from './ExhibitCardSkeleton';

const meta: Meta<typeof ExhibitCardSkeleton> = {
  title: 'Design System/Composite Components/ExhibitCard/ExhibitCardSkeleton',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: ExhibitCardSkeleton,
};

export default meta;
type Story = StoryObj<typeof ExhibitCardSkeleton>;

export const Default: Story = {};
