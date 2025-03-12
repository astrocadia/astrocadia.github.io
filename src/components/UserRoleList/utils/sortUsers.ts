import type { EntityUser, User } from '../../../app/services/user';
import { isNil } from '../../../utils/lang';
import { sortCompareStringWithNumbersIgnoreCase } from '../../../utils/sort';

export const getUserFullName = (user: EntityUser | User): string => {
  return [user.firstName, user.lastName]
    .filter((name) => !isNil(name))
    .join(' ');
};

export const sortUsers = (users: Array<EntityUser>): Array<EntityUser> => {
  return users.sort((a, b) => {
    const aCompareValue = getUserFullName(a) || a.email;
    const bCompareValue = getUserFullName(b) || b.email;

    // This looks redundant, but it's necessary to sort by email when full name is the same
    // For example, { firstName: 'John', lastName: '' } and { firstName: '', lastName: 'John' }
    // would both have the same full name 'John', so we need to sort by email in this case.
    if (aCompareValue === bCompareValue) {
      return sortCompareStringWithNumbersIgnoreCase(a.email, b.email);
    }

    return sortCompareStringWithNumbersIgnoreCase(aCompareValue, bCompareValue);
  });
};
