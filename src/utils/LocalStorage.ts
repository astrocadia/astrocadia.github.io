import { ObjectValues } from './usefulTS';

export const LOCAL_STORAGE_KEY = {
  localStorageAvailability: '__localStorageAvailability__',
  OAuthRedirect: 'OAuthRedirect',
} as const;

type LocalStorageKey = ObjectValues<typeof LOCAL_STORAGE_KEY>;

// This file contains the LocalStorage class, which is used to interact with the browser's local storage.
// It provides methods to set, get, and remove items from the local storage only if the local storage is supported.
export class LocalStorage {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  private static isLocalStorageSupported() {
    if (typeof localStorage !== 'undefined') {
      try {
        const key = LOCAL_STORAGE_KEY.localStorageAvailability;
        localStorage.setItem(key, key);
        localStorage.removeItem(key);

        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  public static setItem(key: LocalStorageKey, value: string) {
    if (LocalStorage.isLocalStorageSupported()) {
      localStorage.setItem(key, value);
    }
  }

  public static removeItem(key: LocalStorageKey) {
    if (LocalStorage.isLocalStorageSupported()) {
      localStorage.removeItem(key);
    }
  }

  public static getItem(key: LocalStorageKey) {
    if (LocalStorage.isLocalStorageSupported()) {
      return localStorage.getItem(key);
    }
    return null;
  }

  public static clear() {
    if (LocalStorage.isLocalStorageSupported()) {
      localStorage.clear();
    }
  }
}
