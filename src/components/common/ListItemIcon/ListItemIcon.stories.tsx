import type { Meta, StoryObj } from '@storybook/react';
import Logout from '@mui/icons-material/Logout';
import { ListItemIcon } from './ListItemIcon';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';

const meta: Meta<typeof ListItemIcon> = {
  title: 'Design System/Components/ListItemIcon',
  tags: ['autodocs'],
  component: ListItemIcon,
};

export default meta;
type Story = StoryObj<typeof ListItemIcon>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', gap: 10 }}>
        <ListItemIcon>
          <Logout fontSize='small' />
        </ListItemIcon>
      </div>
    </ThemeProviderWrapper>
  ),
};
