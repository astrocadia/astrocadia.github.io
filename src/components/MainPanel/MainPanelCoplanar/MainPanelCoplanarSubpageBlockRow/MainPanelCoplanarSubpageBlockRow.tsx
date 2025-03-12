import cx from 'classnames';
import { useMemo, type FunctionComponent, type ReactNode } from 'react';
import { Card } from '../../../common/Card';
import { addOnEnterOrSpaceHandler } from '../../../common/utils/eventHelpers';
import './MainPanelCoplanarSubpageBlockRow.css';
import { BlockRowVariant } from '../common/types';

export interface MainPanelCoplanarSubpageBlockRowProps {
  children: ReactNode;
  className?: string;
  condensed?: boolean;
  variant?: BlockRowVariant;
  onClick?: () => void;
}

export const MainPanelCoplanarSubpageBlockRow: FunctionComponent<
  MainPanelCoplanarSubpageBlockRowProps
> = ({ children, className, condensed, variant = 'row', onClick }) => {
  const handleOnClick = useMemo(() => {
    if (onClick) {
      return addOnEnterOrSpaceHandler(onClick);
    }
    return undefined;
  }, [onClick]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <Card
      role={handleOnClick ? 'button' : undefined}
      onClick={handleOnClick}
      onKeyUp={handleOnClick}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={handleOnClick ? 0 : undefined}
      className={cx(
        'MainPanelCoplanarSubpageBlockRow',
        {
          MainPanelCoplanarSubpageBlockRow__row: variant === 'row',
          MainPanelCoplanarSubpageBlockRow__condensed: condensed,
          MainPanelCoplanarSubpageBlockRow__clickable: !!onClick,
        },
        className
      )}
    >
      {children}
    </Card>
  );
};
