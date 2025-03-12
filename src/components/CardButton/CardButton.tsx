import { useMemo, type FunctionComponent } from 'react';
import cx from 'classnames';
import { Card, type CardProps } from '../common/Card';
import './CardButton.css';

export interface CardButtonProps extends CardProps {
  selected?: boolean;
  disabled?: boolean;
}

export const CardButton: FunctionComponent<CardButtonProps> = ({
  className,
  onClick,
  onKeyUp,
  children,
  selected,
  disabled,
  ...rest
}) => {
  const buttonAttributes = useMemo<CardProps>(() => {
    if (!onClick && !onKeyUp) return {};

    return {
      role: 'button',
      'aria-disabled': disabled,
      tabIndex: 0,
      onKeyUp: disabled ? undefined : onKeyUp,
      onClick: disabled ? undefined : onClick,
    };
  }, [onClick, onKeyUp, disabled]);

  return (
    <Card
      className={cx('CardButton', className, {
        CardButton__clickable: Boolean(onClick),
        CardButton__selected: selected,
        CardButton__disabled: disabled,
      })}
      {...buttonAttributes}
      {...rest}
    >
      {children}
    </Card>
  );
};
