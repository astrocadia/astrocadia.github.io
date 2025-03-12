import cx from 'classnames';
import { forwardRef, useMemo } from 'react';
import { CountBadge } from '../badges';
import { FilterIcon } from '../icons';
import './SelectWithActionsButton.css';

interface SelectWithActionsButtonProps {
  /** Text shown on the button. @default 'Label'  */
  label: string;
  /** Determines if the filter icon should be shown. @default true */
  showFilterIcon: boolean;
  /** The number of selected items. */
  selectedCount: number;
  /** Determines if the number of selected items should be shown. @default true */
  showSelectedCount?: boolean;
  /** The class name for the component. */
  className: string;
}

/**
 * This is the button/input component that is displayed in the SelectWithActions.
 * @see  https://www.figma.com/file/8xUvzKzZu36xPmO8C0Cg3t/Exhibit-Logging-V1?type=design&node-id=1682-86268
 */
export const SelectWithActionsButton = forwardRef<
  HTMLDivElement,
  SelectWithActionsButtonProps
>(
  (
    {
      label = 'Label',
      showFilterIcon,
      selectedCount,
      showSelectedCount = true,
      className,
    },
    ref
  ) => {
    /** Determines if the selected count should be shown. */
    const showCount = useMemo(
      () => showSelectedCount && selectedCount > 0,
      [showSelectedCount, selectedCount]
    );

    return (
      <div className={cx('SelectWithActionsButton', className)} ref={ref}>
        {showFilterIcon && (
          <FilterIcon className='SelectWithActionsButton__icon' />
        )}
        <span>{label}</span>
        {showCount && <CountBadge count={selectedCount} />}
      </div>
    );
  }
);

SelectWithActionsButton.displayName = 'SelectWithActionsButton';
