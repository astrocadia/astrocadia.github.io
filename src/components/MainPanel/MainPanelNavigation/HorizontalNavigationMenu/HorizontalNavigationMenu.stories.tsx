import AnalyticsIcon from '@mui/icons-material/AnalyticsOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DataObjectIcon from '@mui/icons-material/DataObject';
import KeyIcon from '@mui/icons-material/Key';
import MemoryIcon from '@mui/icons-material/Memory';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TuneIcon from '@mui/icons-material/Tune';
import type { Meta, StoryObj } from '@storybook/react';
import {
  type FunctionComponent,
  type ReactNode,
  useMemo,
  useState,
} from 'react';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { RouteWrapper } from '../../../../views/routes/helpers/stories/RouteWrapper';
import { type NavItem } from '../common/navigation';
import { HorizontalNavigationMenu } from './HorizontalNavigationMenu';

const meta: Meta<typeof HorizontalNavigationMenu> = {
  title:
    'Design System/Composite Components/Main Panel Navigation/Horizontal Navigation Menu',
  tags: ['autodocs'],
  component: HorizontalNavigationMenu,
};

export default meta;
type Story = StoryObj<typeof HorizontalNavigationMenu>;

const StoryWrapper: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => (
  <ThemeProviderWrapper>
    <RouteWrapper>
      <div
        style={{
          padding: '1rem',
          maxWidth: 'fit-content',
          backgroundColor: 'var(--background-page-color)',
        }}
      >
        {children}
      </div>
    </RouteWrapper>
  </ThemeProviderWrapper>
);

const initialNavItems: Array<NavItem> = [
  {
    id: 'home',
    label: 'Home',
    icon: <AnalyticsIcon />,
    // eslint-disable-next-line no-console
    onClick: () => console.log('/home'),
  },
  {
    id: 'about',
    label: 'About',
    icon: <CalendarMonthIcon />,
    // eslint-disable-next-line no-console
    onClick: () => console.log('/about'),
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: <MemoryIcon />,
    // eslint-disable-next-line no-console
    onClick: () => console.log('/contact'),
  },
  {
    id: 'users',
    label: 'Users',
    icon: <PeopleAltIcon />,
    // eslint-disable-next-line no-console
    onClick: () => console.log('/users'),
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <TuneIcon />,
    // eslint-disable-next-line no-console
    onClick: () => console.log('/settings'),
  },
  {
    id: 'help',
    label: 'Help',
    icon: <KeyIcon />,
    // eslint-disable-next-line no-console
    onClick: () => console.log('/help'),
  },
  {
    id: 'hardware',
    label: 'Hardware',
    icon: <DataObjectIcon />,
    // eslint-disable-next-line no-console
    onClick: () => console.log('/hardware'),
  },
];

const SettableHorizontalNavigationMenu: FunctionComponent<{
  navItems: Array<NavItem>;
  selectedId?: string;
}> = ({ navItems, selectedId }) => {
  const [currentSelectedId, setCurrentSelectedId] = useState(selectedId);

  const updatedNavItems = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        onClick: () => setCurrentSelectedId(item.id),
      })),
    [navItems]
  );

  return (
    <HorizontalNavigationMenu
      navItems={updatedNavItems}
      selectedId={currentSelectedId}
    />
  );
};

export const Default: Story = {
  render: () => (
    <StoryWrapper>
      <SettableHorizontalNavigationMenu navItems={initialNavItems} />
    </StoryWrapper>
  ),
};

export const LastItemSelected: Story = {
  render: () => (
    <StoryWrapper>
      <SettableHorizontalNavigationMenu
        navItems={initialNavItems}
        selectedId='settings'
      />
    </StoryWrapper>
  ),
};

export const LastItemSelectedAndNoMoreOption: Story = {
  render: () => (
    <StoryWrapper>
      <SettableHorizontalNavigationMenu
        navItems={initialNavItems.slice(0, 5)}
        selectedId='settings'
      />
    </StoryWrapper>
  ),
};
