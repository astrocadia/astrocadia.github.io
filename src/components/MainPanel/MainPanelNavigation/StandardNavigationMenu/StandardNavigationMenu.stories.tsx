import AnalyticsIcon from '@mui/icons-material/Analytics';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DataObjectIcon from '@mui/icons-material/DataObject';
import KeyIcon from '@mui/icons-material/Key';
import MemoryIcon from '@mui/icons-material/Memory';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TuneIcon from '@mui/icons-material/Tune';
import type { Meta, StoryObj } from '@storybook/react';
import { FunctionComponent, ReactNode, useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../../app/store';
import { ThemeProviderWrapper } from '../../../../styles/helpers/ThemeProviderWrapper';
import { RouteWrapper } from '../../../../views/routes/helpers/stories/RouteWrapper';
import { type NavItem } from '../common/navigation';
import {
  StandardNavigationMenu,
  type StandardNavigationMenuProps,
} from './StandardNavigationMenu';

const meta: Meta<typeof StandardNavigationMenu> = {
  title:
    'Design System/Composite Components/Main Panel Navigation/Standard Navigation Menu',
  tags: ['autodocs'],
  component: StandardNavigationMenu,
};

export default meta;
type Story = StoryObj<typeof StandardNavigationMenu>;

const StoryWrapper: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => (
  <Provider store={store}>
    <ThemeProviderWrapper>
      <RouteWrapper>
        <div
          style={{
            border: '1px solid #ccc',
            maxWidth: 'fit-content',
            backgroundColor: 'var(--background-workspace-color)',
          }}
        >
          {children}
        </div>
      </RouteWrapper>
    </ThemeProviderWrapper>
  </Provider>
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

const SettableStandardNavigationMenu: FunctionComponent<
  StandardNavigationMenuProps
> = ({ selectedId, navItems, ...props }) => {
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
    <StandardNavigationMenu
      {...props}
      navItems={updatedNavItems}
      selectedId={currentSelectedId}
    />
  );
};

export const Default: Story = {
  render: () => (
    <StoryWrapper>
      <SettableStandardNavigationMenu navItems={initialNavItems} />
    </StoryWrapper>
  ),
};

export const Project: Story = {
  render: () => (
    <StoryWrapper>
      <SettableStandardNavigationMenu
        navItems={initialNavItems}
        NavigationBackButtonEntityProps={{ workspaceId: 1 }}
      />
    </StoryWrapper>
  ),
};

export const Exhibit: Story = {
  render: () => (
    <StoryWrapper>
      <SettableStandardNavigationMenu
        navItems={initialNavItems}
        NavigationBackButtonEntityProps={{ projectId: 1 }}
      />
    </StoryWrapper>
  ),
};
