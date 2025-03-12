import { type TabProps } from '@mui/material';
import cx from 'classnames';
import {
  Children,
  useCallback,
  useMemo,
  type FunctionComponent,
  type SyntheticEvent,
} from 'react';
import { Sheet } from '../../../Sheet';
import { TabDropdown } from '../../TabDropdown';
import { useToggle } from '../../hooks/useToggle';
import { StandardTabs } from '../StandardTabs';
import { TabElement, type StandardTabsProps } from '../common/tabsTypes';
import './SheetTabs.css';

export interface SheetTabsProps extends Omit<StandardTabsProps, 'orientation'> {
  disabled?: boolean;
}

export const SheetTabs: FunctionComponent<SheetTabsProps> = ({
  children,
  className,
  disabled,
  value,
  onChange,
  ...props
}) => {
  const {
    toggled: sheetOpen,
    setOn: openSheet,
    setOff: closeSheet,
  } = useToggle();

  const selectedTab = useMemo(() => {
    const childrenArray = Children.toArray(children);

    let newSelectedTab = childrenArray.find((tab) => {
      return (tab as TabElement).props?.value === value;
    });

    if (!newSelectedTab && !Number.isNaN(value)) {
      newSelectedTab = childrenArray[value];
    }

    return newSelectedTab as TabElement;
  }, [value, children]);

  const handleTabChange = useCallback(
    (e: SyntheticEvent, tabValue: TabProps['value']) => {
      if (onChange) {
        onChange(e, tabValue);
      }
      closeSheet();
    },
    [closeSheet, onChange]
  );

  return (
    <span
      className={cx(className, 'SheetTabs', {
        SheetTabs__disabled: disabled,
      })}
    >
      {/* Tab components must be wrapped in Tabs component for the text color styling to be correct */}
      <StandardTabs value={0} className='SheetTabs__StandardTabs'>
        {Children.count(children) > 0 && (
          <TabDropdown
            onClick={openSheet}
            {...selectedTab?.props}
            disabled={disabled}
            className='SheetTabs__TabDropdown'
          />
        )}
      </StandardTabs>
      <Sheet open={sheetOpen} anchor='bottom'>
        <StandardTabs
          className='SheetTabs__SheetTabs'
          orientation='vertical'
          value={value}
          onChange={handleTabChange}
          {...props}
        >
          {children}
        </StandardTabs>
      </Sheet>
    </span>
  );
};
