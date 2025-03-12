import cx from 'classnames';
import { type FunctionComponent } from 'react';
import {
  AccordionDetails,
  type AccordianDeatilsProps,
} from '../common/AccordionDetails';
import './IconAccordionDetails.css';

export type IconAccordionDetailsProps = AccordianDeatilsProps;

export const IconAccordionDetails: FunctionComponent<
  IconAccordionDetailsProps
> = ({ className, ...props }) => (
  <AccordionDetails
    className={cx('IconAccordionDetials', className)}
    {...props}
  />
);
