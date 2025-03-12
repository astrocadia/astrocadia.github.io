import type { Meta, StoryObj } from '@storybook/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Tab } from '../../Tab';
import { StandardTabs } from './StandardTabs';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';

const meta: Meta<typeof StandardTabs> = {
  title: 'Design System/Composite Components/Tabs/StandardTabs',
  tags: ['autodocs'],
  component: StandardTabs,
};

export default meta;
type Story = StoryObj<typeof StandardTabs>;

export const Default: Story = {
  render: () => {
    return (
      <ThemeProviderWrapper>
        <div style={{ display: 'flex', gap: 10 }}>
          <StandardTabs value={0}>
            <Tab label='Account' />
            <Tab label='Account' icon={<AccountCircleIcon />} />
            <Tab label='Disabled' disabled />
            <Tab
              label='Disabled with Icon'
              icon={<AccountCircleIcon />}
              disabled
            />
          </StandardTabs>
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
          <StandardTabs value={1}>
            <Tab label='Account' />
            <Tab label='Account' icon={<AccountCircleIcon />} />
            <Tab label='Disabled' disabled />
            <Tab
              label='Disabled with Icon'
              icon={<AccountCircleIcon />}
              disabled
            />
          </StandardTabs>
        </div>
      </ThemeProviderWrapper>
    );
  },
};

export const DisabledTabSelected: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', gap: 10 }}>
        <StandardTabs value={2}>
          <Tab label='Account' />
          <Tab label='Account' icon={<AccountCircleIcon />} />
          <Tab label='Disabled' icon={<AccountCircleIcon />} disabled />
          <Tab
            label='Disabled with Icon'
            icon={<AccountCircleIcon />}
            disabled
          />
        </StandardTabs>
      </div>
    </ThemeProviderWrapper>
  ),
};

export const DisabledIconTabSelected: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', gap: 10 }}>
        <StandardTabs value={3}>
          <Tab label='Account' />
          <Tab label='Account' icon={<AccountCircleIcon />} />
          <Tab label='Disabled' icon={<AccountCircleIcon />} disabled />
          <Tab
            label='Disabled with Icon'
            icon={<AccountCircleIcon />}
            disabled
          />
        </StandardTabs>
      </div>
    </ThemeProviderWrapper>
  ),
};

export const Empty: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', gap: 10 }}>
        <StandardTabs />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const VerticalDefault: Story = {
  render: () => {
    return (
      <ThemeProviderWrapper>
        <div style={{ display: 'flex', gap: 10 }}>
          <StandardTabs value={0} orientation='vertical'>
            <Tab label='Account' />
            <Tab label='Account' icon={<AccountCircleIcon />} />
            <Tab label='Disabled' disabled />
            <Tab
              label='Disabled with Icon'
              icon={<AccountCircleIcon />}
              disabled
            />
          </StandardTabs>
        </div>
      </ThemeProviderWrapper>
    );
  },
};

export const VerticalIconTabSelected: Story = {
  render: () => {
    return (
      <ThemeProviderWrapper>
        <div style={{ display: 'flex', gap: 10 }}>
          <StandardTabs value={1} orientation='vertical'>
            <Tab label='Account' />
            <Tab label='Account' icon={<AccountCircleIcon />} />
            <Tab label='Disabled' disabled />
            <Tab
              label='Disabled with Icon'
              icon={<AccountCircleIcon />}
              disabled
            />
          </StandardTabs>
        </div>
      </ThemeProviderWrapper>
    );
  },
};

export const VerticalDisabledTabSelected: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', gap: 10 }}>
        <StandardTabs value={2} orientation='vertical'>
          <Tab label='Account' />
          <Tab label='Account' icon={<AccountCircleIcon />} />
          <Tab label='Disabled' icon={<AccountCircleIcon />} disabled />
          <Tab
            label='Disabled with Icon'
            icon={<AccountCircleIcon />}
            disabled
          />
        </StandardTabs>
      </div>
    </ThemeProviderWrapper>
  ),
};

export const VerticalDisabledIconTabSelected: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', gap: 10 }}>
        <StandardTabs value={3} orientation='vertical'>
          <Tab label='Account' />
          <Tab label='Account' icon={<AccountCircleIcon />} />
          <Tab label='Disabled' icon={<AccountCircleIcon />} disabled />
          <Tab
            label='Disabled with Icon'
            icon={<AccountCircleIcon />}
            disabled
          />
        </StandardTabs>
      </div>
    </ThemeProviderWrapper>
  ),
};

export const VerticalEmpty: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <div style={{ display: 'flex', gap: 10 }}>
        <StandardTabs orientation='vertical' />
      </div>
    </ThemeProviderWrapper>
  ),
};
