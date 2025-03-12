import { FunctionComponent, PropsWithChildren, useMemo } from 'react';
import cx from 'classnames';
import { MenuItem } from '../MenuItem';
import './DigitalClockSectionItem.css';
import { Button } from '../buttons';

export interface DigitalClockSectionItemProps extends PropsWithChildren {
  className?: string;
  disabled?: boolean;
  selected?: boolean;
}

export const DigitalClockSectionItem: FunctionComponent<
  DigitalClockSectionItemProps
> = ({ children, className, disabled, selected, ...props }) => {
  const buttonVariant = useMemo(() => {
    if (selected) {
      return 'secondary';
    }
    return 'ghost';
  }, [selected]);

  return (
    <MenuItem
      className={cx('DigitalClockSectionItem', className)}
      disableTouchRipple
      disabled={disabled}
      selected={selected}
      {...props}
    >
      <Button size='small' variant={buttonVariant} disabled={disabled}>
        {children}
      </Button>
    </MenuItem>
  );
};
