import cx from 'classnames';
import { type ReactNode, type FunctionComponent } from 'react';
import './InputRequirements.css';

export type InputRequirementsProps = {
  className?: string;
  children: ReactNode;
};

export const InputRequirements: FunctionComponent<InputRequirementsProps> = ({
  className,
  children,
}) => <div className={cx('InputRequirements', className)}>{children}</div>;
