import cx from 'classnames';
import { type FunctionComponent, type ReactNode } from 'react';
import { Accordion } from '../common/Accordion';
import { AccordionSummary } from '../common/AccordionSummary';
import { ChevronIcon } from '../common/icons';
import './IconAccordion.css';

export interface IconAccordionProps {
  children: ReactNode;
  className?: string;
  label: string;
  icon: ReactNode;
}

export const IconAccordion: FunctionComponent<IconAccordionProps> = ({
  children,
  className,
  icon,
  label,
}) => {
  return (
    <Accordion
      disabled={!children}
      elevation={0}
      square
      className={cx('IconAccordion', className)}
    >
      <AccordionSummary
        className='IconAccordion__summary'
        expandIcon={
          <ChevronIcon className='IconAccordion__summary__expandIcon' />
        }
      >
        <div className='IconAccordion__summary__wrapper'>
          {icon}
          <div className='IconAccordion__summary__labelWrapper'>{label}</div>
        </div>
      </AccordionSummary>
      {children}
    </Accordion>
  );
};
