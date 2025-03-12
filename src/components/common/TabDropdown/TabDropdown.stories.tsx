import type { Meta, StoryObj } from '@storybook/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { TabDropdown } from './TabDropdown';
import { ThemeProviderWrapper } from '../../../styles/helpers/ThemeProviderWrapper';

const meta: Meta<typeof TabDropdown> = {
  title: 'Design System/Components/TabDropdown',
  tags: ['autodocs'],
  component: TabDropdown,
};

export default meta;
type Story = StoryObj<typeof TabDropdown>;

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex-grid', gap: 10 }}>
        <TabDropdown label='Account' disabled={false} />
        <TabDropdown
          label='Account'
          icon={<AccountCircleIcon />}
          disabled={false}
        />
        <TabDropdown label='Disabled' disabled />
        <TabDropdown
          label='Disabled with Icon'
          icon={<AccountCircleIcon />}
          disabled
        />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const WithIndicator: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex-grid', gap: 10 }}>
        <TabDropdown label='Account' disabled={false} showIndicator />
        <TabDropdown
          label='Account'
          icon={<AccountCircleIcon />}
          disabled={false}
          showIndicator
        />
        <TabDropdown label='Disabled' disabled showIndicator />
        <TabDropdown
          label='Disabled with Icon'
          icon={<AccountCircleIcon />}
          disabled
          showIndicator
        />
      </div>
    </ThemeProviderWrapper>
  ),
};
