import cx from 'classnames';
import { type FunctionComponent } from 'react';
import { ChevronIcon } from '../../../icons';
import { Button, type ButtonProps } from '../Button';
import './FlowButton.css';

export interface FlowButtonProps
  extends Omit<ButtonProps, 'variant' | 'endIcon'> {
  open?: boolean;
}

export const FlowButton: FunctionComponent<FlowButtonProps> = ({
  className,
  open,
  ...rest
}) => (
  <Button
    className={cx('FlowButton', className, { FlowButton__selected: open })}
    {...rest}
    variant='flow'
    endIcon={<ChevronIcon className='FlowButton__openIndicator' />}
  />
);
