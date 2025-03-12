import {
  AccordionDetails as MUIAccordionDetails,
  type AccordionDetailsProps as MUIAccordionDetailsProps,
} from '@mui/material';
import { type FunctionComponent } from 'react';

export type AccordianDeatilsProps = Omit<MUIAccordionDetailsProps, 'sx'>;

export const AccordionDetails: FunctionComponent<AccordianDeatilsProps> = (
  props
) => <MUIAccordionDetails {...props} />;
