import { createSearchParams, generatePath } from 'react-router-dom';

export const UNAUTHENTICATED_PATH = {
  createAccount: '/create-account',
  createAccountCompleted: '/create-account-completed',
  forgotPassword: '/forgot-password',
  passwordReset: '/password-reset',
  resetPassword: '/reset-password',
  oktaLogin: '/okta-login',
} as const;

export const generateResetPasswordPath = (id: string): string =>
  `${generatePath(UNAUTHENTICATED_PATH.resetPassword)}?${createSearchParams({
    id,
  })}`;

export const generateAccountCreatedPath = (success: boolean): string =>
  `${generatePath(
    UNAUTHENTICATED_PATH.createAccountCompleted
  )}?${createSearchParams({
    success: success.toString(),
  })}`;

export const generatePasswordResetPath = (): string =>
  generatePath(UNAUTHENTICATED_PATH.passwordReset);

export const generateForgotPasswordPath = (): string =>
  generatePath(UNAUTHENTICATED_PATH.forgotPassword);

export const generateExpiredTokenPath = (): string =>
  `${generatePath(UNAUTHENTICATED_PATH.forgotPassword)}?${createSearchParams({
    expired: 'true',
  })}`;

export const generateOktaLoginPath = (): string =>
  generatePath(UNAUTHENTICATED_PATH.oktaLogin);
