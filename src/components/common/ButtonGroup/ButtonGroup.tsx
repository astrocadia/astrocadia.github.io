import cx from 'classnames';
import {
  ButtonGroup as MUIButtonGroup,
  ButtonGroupProps as MUIButtonGroupProps,
  Button,
} from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { OptionSettingItem } from '../../../app/entities/exhibitManifest';

export interface ButtonGroupProps
  extends Omit<MUIButtonGroupProps, 'onChange'> {
  className?: string;
  onChange: (value: string | undefined) => void;
  initialValue: string | undefined;
  buttons: Array<OptionSettingItem>;
}

export const ButtonGroup: FunctionComponent<ButtonGroupProps> = ({
  className,
  buttons,
  onChange,
  initialValue,
  ...rest
}) => {
  const [clickedId, setClickedId] = useState(initialValue);

  const handleClick = (id: string) => {
    setClickedId(id);
    onChange(id);
  };

  return (
    <MUIButtonGroup className={cx('ButtonGroup', className)} {...rest}>
      {buttons.map((item) => (
        // TODO: These buttons should be implemented and have their state tracked by the caller whenever we design our own.
        <Button
          key={item.id}
          name={item.display}
          disableRipple
          onClick={() => handleClick(item.id)}
          variant={item.id === clickedId ? 'contained' : 'outlined'}
        >
          {item.display}
        </Button>
      ))}
    </MUIButtonGroup>
  );
};
