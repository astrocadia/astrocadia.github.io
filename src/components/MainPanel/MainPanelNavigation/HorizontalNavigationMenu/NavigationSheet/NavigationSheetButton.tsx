import {
  IconButton as MUIIconButton,
  IconButtonProps as MUIIconButtonProps,
} from '@mui/material';
import cx from 'classnames';
import { FunctionComponent, ReactNode, memo } from 'react';
import './NavigationSheetButton.css';

interface NavigationSheetButtonButtonProps
  extends Pick<MUIIconButtonProps, 'className' | 'onClick'> {
  displayLabel?: boolean;
  Icon: ReactNode; // TODO: Might be able to tighten this up
  label: string;
  selected?: boolean;
}

export const NavigationSheetButton: FunctionComponent<NavigationSheetButtonButtonProps> =
  memo(({ className, displayLabel, Icon, label, onClick, selected }) => (
    <MUIIconButton
      tabIndex={0}
      disableRipple
      className={cx(
        'NavigationSheetButton',
        {
          NavigationSheetButton__selected: selected,
        },
        className
      )}
      onClick={onClick}
    >
      {Icon}
      {label && (
        <span
          className={cx('NavigationSheetButton__label', {
            NavigationSheetButton__labelDefaultVisible: displayLabel,
          })}
        >
          {label}
        </span>
      )}
    </MUIIconButton>
  ));

NavigationSheetButton.displayName = 'NavigationSheetButton';
