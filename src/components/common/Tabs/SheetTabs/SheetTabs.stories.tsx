import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { Tab } from '../../Tab';
import { SheetTabs } from './SheetTabs';

const meta: Meta<typeof SheetTabs> = {
  title: 'Design System/Composite Components/Tabs/SheetTabs',
  tags: ['autodocs'],
  component: SheetTabs,
};

export default meta;
type Story = StoryObj<typeof SheetTabs>;

export const Default: Story = {
  render: () => {
    return (
      <ThemeProviderWrapper>
        <div style={{ display: 'flex', gap: 10 }}>
          <SheetTabs value={0}>
            <Tab label='Account' />
            <Tab label='Account' icon={<AccountCircleIcon />} />
            <Tab label='Disabled' disabled />
            <Tab
              label='Disabled with Icon'
              icon={<AccountCircleIcon />}
              disabled
            />
          </SheetTabs>
        </div>
      </ThemeProviderWrapper>
    );
  },
};

export const IconTabSelected: Story = {
  render: () => {
    return (
      <ThemeProviderWrapper>
        <div style={{ display: 'flex', gap: 10 }}>
          <SheetTabs value={1}>
            <Tab label='Account' />
            <Tab label='Account' icon={<AccountCircleIcon />} />
            <Tab label='Disabled' disabled />
            <Tab
              label='Disabled with Icon'
              icon={<AccountCircleIcon />}
              disabled
            />
          </SheetTabs>
        </div>
      </ThemeProviderWrapper>
    );
  },
};

export const DisabledTabSelected: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', gap: 10 }}>
        <SheetTabs value={2}>
          <Tab label='Account' />
          <Tab label='Account' icon={<AccountCircleIcon />} />
          <Tab label='Disabled' icon={<AccountCircleIcon />} disabled />
          <Tab
            label='Disabled with Icon'
            icon={<AccountCircleIcon />}
            disabled
          />
        </SheetTabs>
      </div>
    </ThemeProviderWrapper>
  ),
};

export const DisabledIconTabSelected: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', gap: 10 }}>
        <SheetTabs value={3}>
          <Tab label='Account' />
          <Tab label='Account' icon={<AccountCircleIcon />} />
          <Tab label='Disabled' icon={<AccountCircleIcon />} disabled />
          <Tab
            label='Disabled with Icon'
            icon={<AccountCircleIcon />}
            disabled
          />
        </SheetTabs>
      </div>
    </ThemeProviderWrapper>
  ),
};

export const Empty: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', gap: 10 }}>
        <SheetTabs />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const Disabled: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', gap: 10 }}>
        <SheetTabs value={0} disabled>
          <Tab label='Disabled Mobile Tabs' />
        </SheetTabs>
      </div>
    </ThemeProviderWrapper>
  ),
};
