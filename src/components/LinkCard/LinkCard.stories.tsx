import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { Badge } from '../common/badges';
import { FolderIcon, SettingListIcon } from '../common/icons';
import { LinkCard } from './LinkCard';

const meta: Meta<typeof LinkCard> = {
  title: 'Design System/Composite Components/LinkCard',
  tags: ['autodocs'],
  component: LinkCard,
};

export default meta;
type Story = StoryObj<typeof LinkCard>;

const onClick = () => {
  // eslint-disable-next-line no-alert
  alert('LinkCard clicked');
};

export const Default: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <LinkCard label='Lorem ipsum dolor sit' onClick={onClick} />
    </ThemeProviderWrapper>
  ),
};

export const Marked: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <LinkCard label='Lorem ipsum dolor sit' marked onClick={onClick} />
    </ThemeProviderWrapper>
  ),
};

export const SettingGroupAndSettlingList: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <LinkCard icon={<FolderIcon />} label='Setting Group' onClick={onClick} />
      <div style={{ height: '8px' }} />
      <LinkCard
        icon={<SettingListIcon />}
        label='Setting List'
        onClick={onClick}
      />
    </ThemeProviderWrapper>
  ),
};

export const WithCaption: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <LinkCard
        label='Advanced Settings'
        caption='Developer options'
        onClick={onClick}
      />
      <div style={{ height: '8px' }} />
      <LinkCard
        icon={<VolumeUpIcon />}
        label='Audio Options'
        caption='Volume, balance, and equalizer'
        onClick={onClick}
      />
    </ThemeProviderWrapper>
  ),
};

export const WithAction: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <LinkCard
        label='Lorem ipsum dolor sit'
        action={<Badge label='2' variant='circle' />}
        onClick={onClick}
      />
      <div style={{ height: '8px' }} />
      <div style={{ maxWidth: '250px' }}>
        <LinkCard
          label='Lorem ipsum dolor sit'
          onClick={onClick}
          action={<Badge label='2' variant='circle' />}
        />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const LabelWrapping: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <LinkCard
        icon={<VpnKeyOutlinedIcon />}
        label='Security and Password'
        onClick={onClick}
      />
      <div style={{ height: '8px' }} />
      <div style={{ maxWidth: '250px' }}>
        <LinkCard
          icon={<VpnKeyOutlinedIcon />}
          label='Security and Password'
          onClick={onClick}
        />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const CaptionWrapping: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <LinkCard
        label='Display'
        caption="Preferences for Gumband's look and feel"
        onClick={onClick}
      />
      <div style={{ height: '8px' }} />
      <div style={{ maxWidth: '250px' }}>
        <LinkCard
          label='Display'
          caption="Preferences for Gumband's look and feel"
          onClick={onClick}
        />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const LabelAndCaptionWrapping: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <LinkCard
        icon={<AccountCircleOutlinedIcon />}
        label='Account and Profile Options'
        caption='Manage your account and preferences'
        onClick={onClick}
      />
      <div style={{ height: '8px' }} />
      <div style={{ maxWidth: '250px' }}>
        <LinkCard
          icon={<AccountCircleOutlinedIcon />}
          label='Account and Profile Options'
          caption='Manage your account and preferences'
          onClick={onClick}
        />
      </div>
    </ThemeProviderWrapper>
  ),
};

export const Disabled: Story = {
  render: () => (
    <ThemeProviderWrapper>
      <LinkCard label='Lorem ipsum dolor sit' />
      <div style={{ height: '8px' }} />
      <LinkCard
        icon={<FolderIcon />}
        label='Lorem ipsum dolor sit'
        caption='sit amet consectetur adipiscing elit'
      />
    </ThemeProviderWrapper>
  ),
};
