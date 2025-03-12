import cx from 'classnames';
import { useMemo, type FunctionComponent } from 'react';
import { useMobileMediaQuery } from '../hooks/useMobileMediaQuery';
import { SheetTabs } from './SheetTabs';
import { StandardTabs } from './StandardTabs';
import { type StandardTabsProps } from './common/tabsTypes';

export interface TabsProps extends StandardTabsProps {
  sheet?: boolean;
}

export const Tabs: FunctionComponent<TabsProps> = ({
  children,
  className,
  sheet,
  ...props
}) => {
  const mobile = useMobileMediaQuery();

  const useSheet = useMemo(() => {
    return sheet === undefined ? mobile : sheet;
  }, [sheet, mobile]);

  return (
    <>
      {!useSheet && (
        <StandardTabs className={cx(className, 'Tabs')} {...props}>
          {children}
        </StandardTabs>
      )}
      {useSheet && (
        <SheetTabs className={cx(className, 'Tabs')} {...props}>
          {children}
        </SheetTabs>
      )}
    </>
  );
};
