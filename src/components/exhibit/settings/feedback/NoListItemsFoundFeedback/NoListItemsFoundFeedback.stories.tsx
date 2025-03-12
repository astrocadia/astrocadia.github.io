import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../../styles/helpers/ThemeProviderWrapper';
import { NoListItemsFoundFeedback } from './NoListItemsFoundFeedback';

const meta: Meta<typeof NoListItemsFoundFeedback> = {
  title: 'Design System/Feedback/Exhibit/Settings/No List Items Found Feedback',
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  tags: ['autodocs'],
  component: NoListItemsFoundFeedback,
};

export default meta;
type Story = StoryObj<typeof NoListItemsFoundFeedback>;

export const Default: Story = {};
