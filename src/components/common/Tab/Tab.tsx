import { Tab as MUITab, TabProps as MUITabProps } from '@mui/material';
import cx from 'classnames';
import { FunctionComponent, useMemo } from 'react';
import './Tab.css';
import { Dot } from '../Dot';

export interface TabProps
  extends Omit<
    MUITabProps,
    'disableRipple' | 'sx' | 'wrapped' | 'iconPosition'
  > {
  selected?: boolean;
  showIndicator?: boolean;
}

const defaultIndicatorColor = 'var(--base-color-green-400)';
const disabledIndicatorColor = 'var(--base-color-neutral-600)';

export const Tab: FunctionComponent<TabProps> = ({
  className,
  selected,
  disabled = false,
  showIndicator = true,
  icon,
  ...props
}) => {
  const indicatorColor = useMemo(() => {
    return disabled ? disabledIndicatorColor : defaultIndicatorColor;
  }, [disabled]);

  return (
    <MUITab
      className={cx(
        'Tab',
        { Tab__selected: selected, Tab__disabled: disabled },
        className
      )}
      icon={
        <>
          {selected && showIndicator && <Dot color={indicatorColor} />}
          {icon}
        </>
      }
      iconPosition='start'
      disabled={disabled}
      {...props}
      disableRipple
      tabIndex={0}
    />
  );
};
