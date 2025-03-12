import {
  type PickersShortcutsItem as MuiPickersShortcutsItem,
  type PickersShortcutsProps as MuiPickersShortcutsProps,
} from '@mui/x-date-pickers';
import cx from 'classnames';
import { Chip } from '../Chip';
import { List } from '../List';
import { ListItem } from '../ListItem';
import './PickersShortcuts.css';

export interface PickersShortcutsItem<T> extends MuiPickersShortcutsItem<T> {
  selected?: boolean;
}

export interface PickersShortcutsProps<T>
  extends Omit<MuiPickersShortcutsProps<T>, 'isLandscape'> {
  label?: string;
}

/*
Note: This is not a direct wrapper of the MUI PickersShortcuts.
It is a custom implementation component that uses the same props.
Docs on the MUI component: https://mui.com/x/api/date-pickers/pickers-shortcuts/
MUI Implementation: https://github.com/mui/mui-x/blob/v7.16.0/packages/x-date-pickers/src/PickersShortcuts/PickersShortcuts.tsx
*/
export function PickersShortcuts<T>({
  className,
  label,
  items,
  changeImportance = 'accept',
  onChange,
  isValid,
  ...rest
}: PickersShortcutsProps<T>): React.JSX.Element | null {
  if (!items || items.length === 0) {
    return null;
  }

  const resolvedItems = items.map(({ getValue, ...item }) => {
    const newValue = getValue({ isValid });

    return {
      ...item,
      label: item.label,
      onClick: () => {
        onChange(newValue, changeImportance, item);
      },
      disabled: !isValid(newValue),
    };
  });

  return (
    <List className={cx('PickerShortcuts', className)} {...rest}>
      {label && <span className='PickerShortcuts__label'>{label}</span>}
      {resolvedItems.map((item) => (
        <ListItem key={item.label} className='PickerShortcuts__listItem'>
          <Chip className='PickerShortcuts__chip' size='small' {...item} />
        </ListItem>
      ))}
    </List>
  );
}
