import type { Meta, StoryObj } from '@storybook/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Tab } from './Tab';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';

const meta: Meta<typeof Tab> = {
  title: 'Design System/Components/Tab',
  tags: ['autodocs'],
  component: Tab,
};

export default meta;
type Story = StoryObj<typeof Tab>;

export const Unselected: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', gap: 10 }}>
        <Tab label='Account' disabled={false} selected={false} />
        <Tab
          label='Account'
          icon={<AccountCircleIcon />}
          disabled={false}
          selected={false}
        />
        <Tab label='Disabled' disabled selected={false} />
        <Tab
          label='Disabled with Icon'
          icon={<AccountCircleIcon />}
          disabled
          selected={false}
        />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const Selected: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', gap: 10 }}>
        <Tab label='Account' disabled={false} selected />
        <Tab
          label='Account'
          icon={<AccountCircleIcon />}
          disabled={false}
          selected
        />
        <Tab label='Disabled' disabled selected />
        <Tab
          label='Disabled with Icon'
          icon={<AccountCircleIcon />}
          disabled
          selected
        />
      </div>
    </ThemeProviderWrapper>
  ),
};
