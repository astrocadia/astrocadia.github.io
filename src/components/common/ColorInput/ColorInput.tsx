import { MuiColorInput, MuiColorInputProps } from 'mui-color-input';
import { FunctionComponent } from 'react';
import cx from 'classnames';
import { InputAdornment } from '../InputAdornment';
import { Dot } from '../Dot';
import './ColorInput.css';

export interface ColorInputProps extends MuiColorInputProps {
  changed?: boolean;
}

export const ColorInput: FunctionComponent<ColorInputProps> = ({
  className,
  changed,
  PopoverProps = {},
  ...props
}) => (
  <MuiColorInput
    placeholder={props.placeholder ?? '#000000'}
    className={cx('ColorInput', className)}
    InputProps={
      changed
        ? {
            endAdornment: (
              <InputAdornment
                className='ColorInput__adornmentDot'
                position='end'
              >
                <Dot color='var(--base-color-orange-400)' />
              </InputAdornment>
            ),
          }
        : {}
    }
    inputProps={{
      maxLength: props.format === 'hex8' ? 9 : 7,
    }}
    PopoverProps={{
      ...PopoverProps,
      className: cx('ColorInput__popover', PopoverProps.className),
    }}
    {...props}
  />
);
