import type { Meta, StoryObj } from '@storybook/react';
import Logout from '@mui/icons-material/Logout';
import { MenuItem } from '@mui/material';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { ListItemIcon } from '../ListItemIcon';

const meta: Meta<typeof MenuItem> = {
  title: 'Design System/Components/MenuItem',
  tags: ['autodocs'],
  component: MenuItem,
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const TextOnly: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', gap: 10 }}>
        <MenuItem>Logout</MenuItem>
      </div>
    </ThemeProviderWrapper>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', gap: 10 }}>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </div>
    </ThemeProviderWrapper>
  ),
};
