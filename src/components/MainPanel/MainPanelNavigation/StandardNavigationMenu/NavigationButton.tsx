import {
  IconButton as MUIIconButton,
  IconButtonProps as MUIIconButtonProps,
} from '@mui/material';
import cx from 'classnames';
import { FunctionComponent, ReactNode, memo } from 'react';
import './NavigationButton.css';

interface NavigationButtonProps extends Pick<MUIIconButtonProps, 'onClick'> {
  className?: string;
  collapsed?: boolean;
  Icon: ReactNode; // TODO: Might be able to tighten this up
  label: string;
  selected?: boolean;
}

export const NavigationButton: FunctionComponent<NavigationButtonProps> = memo(
  ({ className, collapsed, Icon, label, onClick, selected }) => (
    <MUIIconButton
      className={cx(
        'NavigationButton',
        {
          NavigationButton__collapsed: collapsed,
          NavigationButton__selected: selected,
        },
        className
      )}
      disableRipple
      onClick={onClick}
    >
      {Icon}
      <span className='NavigationButton__label'>{label}</span>
    </MUIIconButton>
  )
);

NavigationButton.displayName = 'NavigationButton';
