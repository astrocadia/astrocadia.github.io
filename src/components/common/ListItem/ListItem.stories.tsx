import Logout from '@mui/icons-material/Logout';
import { ListItem } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { ListItemIcon } from '../ListItemIcon';

const meta: Meta<typeof ListItem> = {
  title: 'Design System/Components/ListItem',
  tags: ['autodocs'],
  component: ListItem,
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const TextOnly: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', gap: 10 }}>
        <ListItem>Logout</ListItem>
      </div>
    </ThemeProviderWrapper>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', gap: 10 }}>
        <ListItem>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </ListItem>
      </div>
    </ThemeProviderWrapper>
  ),
};
