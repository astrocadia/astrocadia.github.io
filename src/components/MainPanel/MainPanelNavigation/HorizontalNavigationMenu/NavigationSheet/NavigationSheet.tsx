import cx from 'classnames';
import { useMemo, type FunctionComponent } from 'react';
import { Sheet, type SheetProps } from '../../../../Sheet';
import { type NavItem } from '../../common/navigation';
import { NavigationSheetButton } from './NavigationSheetButton';
import './NavigationSheet.css';

export interface NavigationSheetProps
  extends Pick<SheetProps, 'className' | 'open'> {
  navItems: Array<NavItem>;
  onClose: () => void;
  selectedId: string;
}

export const NavigationSheet: FunctionComponent<NavigationSheetProps> = ({
  className,
  navItems,
  onClose,
  open,
  selectedId,
}) => {
  // When an item is clicked, the drawer should close
  const navItemsWithSheetClose = useMemo(
    () =>
      navItems.map((navItem) => ({
        ...navItem,
        onClick: () => {
          navItem.onClick();
          onClose?.();
        },
      })),
    [navItems, onClose]
  );

  return (
    <Sheet
      className={cx('NavigationSheet', className)}
      onClose={onClose}
      open={open}
    >
      <nav role='navigation' className='NavigationSheet__navWrapper'>
        {navItemsWithSheetClose.map((navItem) => (
          <NavigationSheetButton
            displayLabel
            key={navItem.id}
            Icon={navItem.icon}
            label={navItem.label}
            selected={navItem.id === selectedId}
            onClick={navItem.onClick}
          />
        ))}
      </nav>
    </Sheet>
  );
};
