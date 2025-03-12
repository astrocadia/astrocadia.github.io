import { FunctionComponent } from 'react';
import cx from 'classnames';
import { Button, ButtonProps } from '../buttons';
import { ChevronIcon } from '../icons';
import './MenuToggleButton.css';

type MenuToggleButtonProps = ButtonProps & {
  fullWidth?: boolean;
  open?: boolean;
};

export const MenuToggleButton: FunctionComponent<MenuToggleButtonProps> = ({
  children,
  className,
  fullWidth,
  open = false,
  ...props
}) => {
  return (
    <Button
      classes={{ startIcon: 'MenuToggleButton__startIcon' }}
      className={cx(
        'MenuToggleButton',
        {
          MenuToggleButton__fullWidth: fullWidth,
          MenuToggleButton__selected: open,
        },
        className
      )}
      variant='input'
      {...props}
    >
      <span className='MenuToggleButton__label'>{children}</span>
      <ChevronIcon className='MenuToggleButton__openIndicator' />
    </Button>
  );
};
