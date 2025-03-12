import { FunctionComponent } from 'react';
import cx from 'classnames';
import { Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material';
import './Chip.css';
import { CloseIcon } from '../icons';

export interface ChipProps extends Omit<MuiChipProps, 'variant'> {
  selected?: boolean;
}

export const Chip: FunctionComponent<ChipProps> = ({
  className,
  icon,
  selected,
  ...props
}) => {
  return (
    <MuiChip
      className={cx('Chip', className, {
        Chip__selected: selected,
        Chip__withIcon: icon,
      })}
      deleteIcon={<CloseIcon />}
      icon={icon}
      {...props}
    />
  );
};
