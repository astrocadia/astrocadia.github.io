import cx from 'classnames';
import { useMemo, type FunctionComponent, type ReactNode } from 'react';
import { addOnEnterOrSpaceHandler } from '../../../common/utils/eventHelpers';
import './NavigationActionButton.css';

interface NavigationActionButtonProps {
  className?: string;
  collapsed?: boolean;
  hideLabel?: boolean;
  Icon: ReactNode;
  label?: string;
  onClick: () => void;
}

export const NavigationActionButton: FunctionComponent<
  NavigationActionButtonProps
> = ({ className, collapsed, hideLabel, Icon, label, onClick }) => {
  const handleOnClick = useMemo(
    () => addOnEnterOrSpaceHandler(onClick),
    [onClick]
  );

  return (
    <div
      className={cx(
        'NavigationActionButton',
        {
          NavigationActionButton__collapsed: collapsed,
        },
        className
      )}
      onClick={handleOnClick}
      onKeyUp={handleOnClick}
      role='button'
      aria-label={label}
      tabIndex={0}
    >
      <span className='NavigationActionButton__icon'>{Icon}</span>

      <span className='NavigationActionButton__label'>
        {!hideLabel && label}
      </span>
    </div>
  );
};
