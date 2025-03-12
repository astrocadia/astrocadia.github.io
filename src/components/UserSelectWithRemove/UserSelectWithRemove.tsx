import type { FunctionComponent } from 'react';
import cx from 'classnames';
import { SelectWithRemove, SelectWithRemoveProps } from '../SelectWithRemove';
import type { UserRole } from '../../app/services/user';
import './UserSelectWithRemove.css';

/** 'Viewer' role intentionally left out because supposedly they won't be in V2.  */
const userRoleOptions: Array<{ label: string; value: UserRole }> = [
  { label: 'Manager', value: 'manager' },
  { label: 'Developer', value: 'developer' },
];

export interface UserSelectWithRemoveProps
  extends Omit<SelectWithRemoveProps<UserRole>, 'options'> {
  className?: string;
}

export const UserSelectWithRemove: FunctionComponent<
  UserSelectWithRemoveProps
> = ({ classes, className, ...rest }) => {
  return (
    <SelectWithRemove
      className={cx('UserSelectWithRemove', className)}
      options={userRoleOptions}
      classes={{
        menu: cx('UserSelectWithRemove__menu', classes?.menu),
        select: cx('UserSelectWithRemove__select', classes?.select),
      }}
      {...rest}
    />
  );
};
