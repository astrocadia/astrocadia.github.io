// See: https://www.google.com/search?q=typescript+exhaustive+guard
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const exhaustiveGuard = (_: never): never => {
  throw new Error('Exhaustive guard failed');
};

// For a given type T, return the keys of T that are strings.
export type StringFields<T> = {
  [K in keyof T]: T[K] extends string | null | undefined ? K : never;
}[keyof T];

// For a given type T, return the keys of T that are numbers.
export type NumberFields<T> = {
  [K in keyof T]: T[K] extends number | null | undefined ? K : never;
}[keyof T];

/**
 * @deprecated Use the version in the common library.
 * @see https://deeplocal.atlassian.net/browse/GUM-1723 for the Jira Story
 */
export type ObjectValues<T> = T[keyof T];

export type Brand<K, T extends string> = K & { __brand: T };

// Type safe Object.keys
// See https://www.youtube.com/watch?v=GW00zebIt0g&ab_channel=MattPocock
export const objectKeys = <Obj extends object>(obj: Obj): (keyof Obj)[] => {
  return Object.keys(obj) as (keyof Obj)[];
};
