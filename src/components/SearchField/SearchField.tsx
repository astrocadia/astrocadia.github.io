import { useMemo, type FunctionComponent } from 'react';
import cx from 'classnames';
import { TextField, type TextFieldProps } from '../common/TextField';
import { SearchIcon } from '../common/icons/SearchIcon';
import type { InputProps } from '../common/Input';
import { CloseIcon } from '../common/icons';
import { InputAdornment } from '../common/InputAdornment';
import { InputAdornmentButton } from '../common/InputAdornmentButton';

export interface SearchFieldProps
  extends Omit<TextFieldProps, 'value' | 'select'> {
  className?: string;
  value?: string;
  onClear?: () => void;
}

/**
 * A search field component that includes a search icon and a clear button.
 */
export const SearchField: FunctionComponent<SearchFieldProps> = ({
  className,
  value,
  onClear,
  // Setting fullWidth to true by default to avoid the jumpiness from the clear button appearing.
  fullWidth = true,
  ...rest
}) => {
  const endAdornment: InputProps['endAdornment'] = useMemo(() => {
    if (!value?.length || !onClear) return undefined;

    return (
      <InputAdornment position='end'>
        <InputAdornmentButton onClick={onClear}>
          <CloseIcon />
        </InputAdornmentButton>
      </InputAdornment>
    );
  }, [onClear, value]);

  return (
    <TextField
      className={cx('SearchField', className)}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment,
      }}
      value={value}
      fullWidth={fullWidth}
      {...rest}
    />
  );
};
