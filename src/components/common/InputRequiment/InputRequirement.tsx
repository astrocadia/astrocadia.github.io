import cx from 'classnames';
import { type FunctionComponent, type ReactNode } from 'react';
import { CheckIcon } from '../icons';
import './InputRequirement.css';

export type InputRequirementProps = {
  requirementMet?: boolean;
  className?: string;
  children: ReactNode;
};

export const InputRequirement: FunctionComponent<InputRequirementProps> = ({
  className,
  children,
  requirementMet = false,
}) => (
  <div className={cx('InputRequirement', className)}>
    <h2
      className={cx('InputRequirement__requirementText', {
        InputRequirement__requirementText_requirementMet: requirementMet,
      })}
    >
      {children}
    </h2>
    {requirementMet && <CheckIcon className='InputRequirement__CheckIcon' />}
  </div>
);
