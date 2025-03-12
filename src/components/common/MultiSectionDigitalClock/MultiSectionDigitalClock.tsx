import { type FunctionComponent } from 'react';
import cx from 'classnames';
import {
  MultiSectionDigitalClock as MuiMultiSectionDigitalClock,
  MultiSectionDigitalClockProps as MuiMultiSectionDigitalClockProps,
} from '@mui/x-date-pickers';
import { type DateTime } from 'luxon';
import { DigitalClockSectionItem } from '../DigitalClockSectionItem';
import './MultiSectionDigitalClock.css';

export type MultiSectionDigitalClockProps =
  MuiMultiSectionDigitalClockProps<DateTime>;

export const MultiSectionDigitalClock: FunctionComponent<
  MultiSectionDigitalClockProps
> = ({ className, ...props }) => {
  return (
    <MuiMultiSectionDigitalClock
      className={cx('MultiSectionDigitalClock', className)}
      slots={{ digitalClockSectionItem: DigitalClockSectionItem }}
      {...props}
    />
  );
};
