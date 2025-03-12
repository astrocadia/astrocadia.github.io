import { type SerializedError } from '@reduxjs/toolkit';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface IncorrectUsernameOrPasswordError {
  status: number; // Note: should be 400, but I don't think we want to tighten up the error handling that much as we would have to maintain in multiple places
  data: {
    response: 'IncorrectUsernameOrPasswordError';
  };
}

export interface UserAccountCreatedWithGAuthError {
  status: number; // Note: should be 400, but I don't think we want to tighten up the error handling that much as we would have to maintain in multiple places
  data: {
    response: 'UserAccountCreatedWithGAuth';
  };
}

export interface InvalidPasswordResetTokenError {
  status: number; // Note: should be 400, but I don't think we want to tighten up the error handling that much as we would have to maintain in multiple places
  data: {
    response: 'ResetPasswordURLExpired';
  };
}

export interface ExpiredPasswordResetNewTokenSentError {
  status: number; // Note: should be 400, but I don't think we want to tighten up the error handling that much as we would have to maintain in multiple places
  data: {
    response: 'ResetPasswordURLExpiredNewTokenSent';
  };
}

export interface InvalidPasswordResetEmailError {
  status: number;
  data: {
    response: 'InvalidEmail';
  };
}
export interface FileTooLargeError {
  error: {
    status: number;
    data: {
      response: `File must be less than ${number} GB`;
    };
  };
}

export type ApiError =
  | IncorrectUsernameOrPasswordError
  | UserAccountCreatedWithGAuthError
  | InvalidPasswordResetTokenError
  | ExpiredPasswordResetNewTokenSentError
  | InvalidPasswordResetEmailError
  | FileTooLargeError
  | FetchBaseQueryError
  | SerializedError;

export const isIncorrectUsernameOrPasswordError = (
  error: ApiError
): error is IncorrectUsernameOrPasswordError => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (error as any)?.data?.response === 'IncorrectUsernameOrPassword';
};

export const isUserAccountCreatedWithGAuthError = (
  error: ApiError
): error is IncorrectUsernameOrPasswordError => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (error as any)?.data?.response === 'UserAccountCreatedWithGAuth';
};

export const isInvalidPasswordResetTokenError = (
  error: ApiError
): error is InvalidPasswordResetTokenError => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (error as any)?.data?.response === 'ResetPasswordURLExpired';
};

export const isExpiredPasswordResetNewTokenSentError = (
  error: ApiError
): error is ExpiredPasswordResetNewTokenSentError => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error as any)?.data?.response === 'ResetPasswordURLExpiredNewTokenSent'
  );
};

export const isInvalidPasswordResetEmailError = (
  error: ApiError
): error is InvalidPasswordResetEmailError => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (error as any)?.data?.response === 'InvalidEmail';
};

export const isFileTooLargeError = (
  error: ApiError
): error is FileTooLargeError => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (error as any)?.error?.data?.response.includes(
    'File must be less than'
  );
};
