import cx from 'classnames';
import { FunctionComponent, HTMLAttributes, ReactNode, useMemo } from 'react';
import {
  MouseOrKeyboardEventHandler,
  addOnEnterOrSpaceHandler,
} from '../../../common/utils/eventHelpers';
import './BreadcrumbWrapper.css';

interface BreadcrumbWrapperProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'aria-label'> {
  children: ReactNode;
  className?: string;
  onClick?: MouseOrKeyboardEventHandler;
  selected?: boolean;
}

export const BreadcrumbWrapper: FunctionComponent<BreadcrumbWrapperProps> = ({
  children,
  className,
  onClick,
  selected,
  ...rest
}) => {
  const handleOnAction = useMemo(
    () => addOnEnterOrSpaceHandler(onClick),
    [onClick]
  );

  return (
    <div
      className={cx(
        'BreadcrumbWrapper',
        { BreadcrumbWrapper__selected: selected },
        className
      )}
      role='button'
      onClick={handleOnAction}
      onKeyUp={handleOnAction}
      tabIndex={0}
      {...rest}
    >
      {children}
    </div>
  );
};
