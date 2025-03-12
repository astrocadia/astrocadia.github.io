import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import {
  Input as MUIInput,
  type InputProps as MUIInputProps,
} from '@mui/material';
import cx from 'classnames';
import { forwardRef, type FunctionComponent } from 'react';
import { InputAdornment } from '../InputAdornment';
import './Input.css';

export type InputProps = Omit<
  MUIInputProps,
  'color' | 'disableUnderline' | 'margin' | 'sx' | 'ref'
>;

export const Input: FunctionComponent<InputProps> = forwardRef<
  HTMLDivElement,
  InputProps
>(({ className, endAdornment, error, ...props }, ref) => (
  <MUIInput
    ref={ref}
    className={cx('Input', className)}
    disableUnderline
    endAdornment={
      (endAdornment || error) && (
        <>
          {error && (
            <InputAdornment className='Input__errorAdornment' position='end'>
              <ErrorOutlineOutlinedIcon fontSize='small' />
            </InputAdornment>
          )}
          {endAdornment}
        </>
      )
    }
    error={error}
    margin='none'
    {...props}
  />
));

Input.displayName = 'Input';
