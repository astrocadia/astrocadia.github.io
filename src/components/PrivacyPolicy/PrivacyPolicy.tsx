import cx from 'classnames';
import { type FunctionComponent } from 'react';
import './PrivacyPolicy.css';

export interface PrivacyPolicyProps {
  className?: string;
}

export const PrivacyPolicy: FunctionComponent<PrivacyPolicyProps> = ({
  className,
}) => (
  <a
    className={cx(className, 'PrivacyPolicy')}
    href='https://www.deeplocal.com/privacy-policy'
  >
    Privacy Policy
  </a>
);
