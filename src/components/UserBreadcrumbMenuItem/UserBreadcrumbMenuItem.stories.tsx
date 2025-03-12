import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { UserBreadcrumbMenuItem } from './UserBreadcrumbMenuItem';

const meta: Meta<typeof UserBreadcrumbMenuItem> = {
  title: 'Design System/Composite Components/UserBreadcrumbMenuItem',
  tags: ['autodocs'],
  component: UserBreadcrumbMenuItem,
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UserBreadcrumbMenuItem>;

export const Default: Story = {};
