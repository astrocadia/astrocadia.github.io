import {
  IconButton as MUIIconButton,
  type IconButtonProps as MUIIconButtonProps,
} from '@mui/material';
import cx from 'classnames';
import { memo, useMemo, type FunctionComponent, type ReactNode } from 'react';
import './HorizontalNavigationMenuButton.css';

// to handle mobile button animations outside of the css
const BUTTON_WIDTH_REM = 2.375;
const BUTTON_PADDING_REM = 2;
const FONT_SIZE_REM = 0.85;
const AVERAGE_FONT_WIDTH_REM = 0.65;

interface HorizontalNavigationMenuButtonProps
  extends Pick<MUIIconButtonProps, 'className' | 'onClick'> {
  Icon: ReactNode; // TODO: Might be able to tighten this up
  label: string;
  selected?: boolean;
}

export const HorizontalNavigationMenuButton: FunctionComponent<HorizontalNavigationMenuButtonProps> =
  memo(({ className, Icon, label, onClick, selected }) => {
    // NOTE: We need to do this in order to enable css transitions.  Transitioning from auto to a fixed width doesn't work.
    const buttonWidthRem = useMemo(
      () =>
        selected
          ? BUTTON_PADDING_REM +
            AVERAGE_FONT_WIDTH_REM * FONT_SIZE_REM * label.length
          : BUTTON_WIDTH_REM,
      [label.length, selected]
    );

    return (
      <MUIIconButton
        disableRipple
        style={{ width: `${buttonWidthRem}rem` }}
        className={cx(
          'HorizontalNavigationMenuButton',
          {
            HorizontalNavigationMenuButton__selected: selected,
          },
          className
        )}
        onClick={onClick}
      >
        {Icon}
        {label && selected && (
          <span className='HorizontalNavigationMenuButton__label'>{label}</span>
        )}
      </MUIIconButton>
    );
  });

HorizontalNavigationMenuButton.displayName = 'HorizontalNavigationMenuButton';
