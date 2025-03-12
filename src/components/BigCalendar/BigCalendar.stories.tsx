import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { BigCalendar } from './BigCalendar';

const meta: Meta<typeof BigCalendar> = {
  // Leaving this in Composite Components because it'll become one.
  title: 'Design System/Composite Components/BigCalendar',
  tags: ['autodocs'],
  component: BigCalendar,
  args: {
    style: { height: 500 },
  },
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  argTypes: {
    view: {
      control: {
        type: 'select',
        options: ['month', 'week', 'day'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BigCalendar>;

export const Default: Story = {};
