import MenuIcon from '@mui/icons-material/Menu';
import cx from 'classnames';
import { useCallback, type FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import {
  isStandardNavigationCollapsed,
  toggleStandardNavigationCollapsed,
} from '../../../../app/services/ui';
import { useAppDispatch } from '../../../../app/store';
import { type NavItem } from '../common/navigation';
import { NavigationActionButton } from './NavigationActionButton';
import {
  NavigationBackButton,
  type NavigationBackButtonEntityProps,
} from './NavigationBackButton';
import { NavigationButton } from './NavigationButton';
import './StandardNavigationMenu.css';

export interface StandardNavigationMenuProps {
  NavigationBackButtonEntityProps?: NavigationBackButtonEntityProps;
  navItems: Array<NavItem>;
  selectedId?: string;
}

export const StandardNavigationMenu: FunctionComponent<
  StandardNavigationMenuProps
> = ({
  NavigationBackButtonEntityProps,
  navItems,
  selectedId = navItems[0]?.id,
}) => {
  const dispatch = useAppDispatch();
  const collapsed = useSelector(isStandardNavigationCollapsed);

  const handleToggleCollapsed = useCallback(
    () => dispatch(toggleStandardNavigationCollapsed()),
    [dispatch]
  );

  return (
    <div
      className={cx('StandardNavigationMenu', {
        StandardNavigationMenu__collapsed: collapsed,
      })}
    >
      {NavigationBackButtonEntityProps && (
        <NavigationBackButton
          className='StandardNavigationMenu__backButton'
          collapsed={collapsed}
          {...NavigationBackButtonEntityProps}
        />
      )}
      <div className='StandardNavigationMenu__menuItemWrapper'>
        {navItems.map((navItem) => (
          <NavigationButton
            key={navItem.id}
            collapsed={collapsed}
            Icon={navItem.icon}
            label={navItem.label}
            onClick={navItem.onClick}
            selected={navItem.id === selectedId}
          />
        ))}
      </div>
      <NavigationActionButton
        className='StandardNavigationMenu__toggleCollapsedButton'
        collapsed={collapsed}
        hideLabel
        Icon={<MenuIcon />}
        label={`${collapsed ? 'Expand' : 'Collapse'} Menu`}
        onClick={handleToggleCollapsed}
      />
    </div>
  );
};
