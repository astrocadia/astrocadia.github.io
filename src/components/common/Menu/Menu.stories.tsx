import Logout from '@mui/icons-material/Logout';
import type { Meta, StoryObj } from '@storybook/react';
import type { MouseEvent } from 'react';
import { useCallback, useState } from 'react';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';
import { ListItemIcon } from '../ListItemIcon';
import { MenuItem } from '../MenuItem';
import { Button } from '../buttons';
import { Menu } from './Menu';

const meta: Meta<typeof Menu> = {
  title: 'Design System/Components/Menu',
  tags: ['autodocs'],
  component: Menu,
};

export default meta;
type Story = StoryObj<typeof Menu>;

const DemoMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <Button onClick={handleOpenMenu}>Menu</Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
      >
        <MenuItem>Account</MenuItem>
        <MenuItem>
          <ListItemIcon />
          Account (keep spacing)
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', gap: 10 }}>
        <DemoMenu />
      </div>
    </ThemeProviderWrapper>
  ),
};
