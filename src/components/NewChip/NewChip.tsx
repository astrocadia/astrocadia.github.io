import { type FunctionComponent } from 'react';
import cx from 'classnames';
import { Chip, type ChipProps } from '../common/Chip';
import { SparksIcon } from '../common/icons/SparksIcon';
import './NewChip.css';

const DEFAULT_LABEL = 'New' as const;

export interface NewChipProps extends Omit<ChipProps, 'size'> {}

export const NewChip: FunctionComponent<NewChipProps> = ({
  className,
  label = DEFAULT_LABEL,
  clickable = false,
}) => {
  return (
    <Chip
      label={label}
      icon={<SparksIcon />}
      clickable={clickable}
      className={cx('NewChip', className)}
    />
  );
};
