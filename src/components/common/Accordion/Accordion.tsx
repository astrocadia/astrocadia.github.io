import {
  Accordion as MUIAccordion,
  type AccordionProps as MUIAccordionProps,
} from '@mui/material';
import { FunctionComponent } from 'react';

export type AccordionProps = Omit<MUIAccordionProps, 'sx'>;

export const Accordion: FunctionComponent<AccordionProps> = (props) => (
  <MUIAccordion {...props} />
);
