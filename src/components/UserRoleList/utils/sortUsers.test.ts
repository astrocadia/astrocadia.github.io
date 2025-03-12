import { describe, expect, it } from 'vitest';
import { getUserFullName, sortUsers } from './sortUsers'; // Replace with your actual module path
import type { EntityUser } from '../../../app/services/user';

describe('getUserFullName', () => {
  it('should return the full name when both first and last names are provided', () => {
    const user: EntityUser = {
      id: 1,
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      role: 'manager',
    };
    const result = getUserFullName(user);
    expect(result).toBe('John Doe');
  });

  it('should return only the first name when last name is missing', () => {
    const user: EntityUser = {
      id: 2,
      userId: 2,
      firstName: 'John',
      lastName: undefined,
      email: 'john.doe@example.com',
      role: 'developer',
    };
    const result = getUserFullName(user);
    expect(result).toBe('John');
  });

  it('should return only the last name when first name is missing', () => {
    const user: EntityUser = {
      id: 3,
      userId: 3,
      firstName: undefined,
      lastName: 'Doe',
      email: 'john.doe@example.com',
      role: 'viewer',
    };
    const result = getUserFullName(user);
    expect(result).toBe('Doe');
  });

  it('should return an empty string when both first and last names are missing', () => {
    const user: EntityUser = {
      id: 4,
      userId: 4,
      firstName: undefined,
      lastName: undefined,
      email: 'john.doe@example.com',
      role: 'manager',
    };
    const result = getUserFullName(user);
    expect(result).toBe('');
  });
});

describe('sortUsers', () => {
  it('should sort users by full name or email if the full name is an empty string', () => {
    const users: Array<EntityUser> = [
      {
        id: 1,
        userId: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'developer',
      },
      {
        id: 2,
        userId: 2,
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice.smith@example.com',
        role: 'manager',
      },
      {
        id: 3,
        userId: 3,
        firstName: undefined,
        lastName: 'Adams',
        email: 'adam.adams@example.com',
        role: 'viewer',
      },
      {
        id: 4,
        userId: 4,
        firstName: '',
        lastName: '',
        email: 'a.girl.has.no.name@example.com',
        role: 'developer',
      },
    ];

    const result = sortUsers(users);

    expect(result.map((user) => user.userId)).toEqual([4, 3, 2, 1]);
  });

  it('should sort users with same full name by email address', () => {
    const users: Array<EntityUser> = [
      {
        id: 2,
        userId: 2,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe2@example.com',
        role: 'developer',
      },
      {
        id: 1,
        userId: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'manager',
      },
      {
        id: 3,
        userId: 3,
        firstName: 'John',
        lastName: undefined,
        email: 'john.doe3@example.com',
        role: 'viewer',
      },
    ];

    const result = sortUsers(users);

    expect(result.map((user) => user.userId)).toEqual([3, 1, 2]);
  });

  it('should sort users by emails when they are the only thing present', () => {
    const users: Array<EntityUser> = [
      {
        id: 1,
        userId: 1,
        firstName: undefined,
        lastName: undefined,
        email: 'zane@example.com',
        role: 'developer',
      },
      {
        id: 2,
        userId: 2,
        firstName: undefined,
        lastName: undefined,
        email: 'amy@example.com',
        role: 'manager',
      },
      {
        id: 3,
        userId: 3,
        firstName: undefined,
        lastName: undefined,
        email: 'brad@example.com',
        role: 'viewer',
      },
    ];

    const result = sortUsers(users);

    expect(result.map((user) => user.userId)).toEqual([2, 3, 1]);
  });

  it('should handle an empty list of users', () => {
    const users: Array<EntityUser> = [];

    const result = sortUsers(users);

    expect(result).toEqual([]);
  });

  it('should handle a list with a single user', () => {
    const users: Array<EntityUser> = [
      {
        id: 1,
        userId: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'manager',
      },
    ];

    const result = sortUsers(users);

    expect(result.map((user) => user.userId)).toEqual([1]);
  });
});
