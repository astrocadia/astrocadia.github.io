import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { ListItemText } from './ListItemText';

const meta: Meta<typeof ListItemText> = {
  title: 'Design System/Components/ListItemText',
  tags: ['autodocs'],
  component: ListItemText,
};

export default meta;
type Story = StoryObj<typeof ListItemText>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div
        style={{
          display: 'flex',
          gap: 10,
        }}
      >
        <ListItemText>Sample Primary Text</ListItemText>
        <ListItemText primary='Sample Primary Text' />
        <ListItemText
          primary='Sample Primary Text'
          secondary='Secondary Text'
        />
      </div>
    </ThemeProviderWrapper>
  ),
};
