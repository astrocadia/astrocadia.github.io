import AppsIcon from '@mui/icons-material/Apps';
import { FunctionComponent, useMemo } from 'react';
import { useToggle } from '../../../common/hooks/useToggle';
import { NavItem } from '../common/navigation';
import './HorizontalNavigationMenu.css';
import { HorizontalNavigationMenuButton } from './HorizontalNavigationMenuButton';
import { NavigationSheet } from './NavigationSheet';

const DEFAULT_MAX_MOBILE_NAV_ITEMS = 6 as const;

export interface HorizontalNavigationMenuProps {
  maxMobileNavItems?: number;
  navItems: Array<NavItem>;
  selectedId?: string;
}

export const HorizontalNavigationMenu: FunctionComponent<
  HorizontalNavigationMenuProps
> = ({
  maxMobileNavItems = DEFAULT_MAX_MOBILE_NAV_ITEMS,
  navItems,
  selectedId = navItems[0]?.id,
}) => {
  const { toggled: drawerOpen, setOn: onOpen, setOff: onClose } = useToggle();

  const navItemsToDisplay = useMemo(
    () =>
      navItems.length > maxMobileNavItems
        ? navItems.slice(0, maxMobileNavItems - 1) // Leave room for the "More" button
        : navItems.slice(0, maxMobileNavItems),
    [maxMobileNavItems, navItems]
  );

  const isSheetRequired = useMemo(
    () => navItems.length > maxMobileNavItems,
    [navItems, maxMobileNavItems]
  );

  return (
    <>
      <div className='HorizontalNavigationMenu'>
        {navItemsToDisplay.map((navItem) => (
          <HorizontalNavigationMenuButton
            key={navItem.id}
            Icon={navItem.icon}
            label={navItem.label}
            selected={navItem.id === selectedId}
            onClick={navItem.onClick}
          />
        ))}
        {isSheetRequired && (
          <HorizontalNavigationMenuButton
            Icon={<AppsIcon />}
            label=''
            onClick={onOpen}
          />
        )}
      </div>
      <NavigationSheet
        navItems={navItems}
        onClose={onClose}
        open={drawerOpen}
        selectedId={selectedId}
      />
    </>
  );
};
