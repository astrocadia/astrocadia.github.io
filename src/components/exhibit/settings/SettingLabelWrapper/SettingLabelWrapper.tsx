import cx from 'classnames';
import { type FunctionComponent, type ReactNode } from 'react';
import { Dot } from '../../../common/Dot';
import './SettingLabelWrapper.css';

export type SettingLabelWrapperProps = {
  className?: string;
  children?: ReactNode;
  changed?: boolean;
};

export const SettingLabelWrapper: FunctionComponent<
  SettingLabelWrapperProps
> = ({ className, changed, children }) => {
  return (
    <div className={cx('SettingLabelWrapper', className)}>
      <span>{children}</span>
      {changed && <Dot color='var(--base-color-orange-400)' />}
    </div>
  );
};
