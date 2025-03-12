import { RegisterAccountView } from '../registerAccount/RegisterAccountView';
import { CreateAccountCompleted } from '../resetPassword/CreateAccountCompleted';
import { OktaLoginView } from '../login/OktaLoginView';
import { ResetPasswordCompleted } from '../resetPassword/PasswordResetCompleted';
import { RequestResetPasswordView } from '../resetPassword/RequestPasswordResetView';
import { ResetPasswordView } from '../resetPassword/ResetPasswordView';
import { UnauthenticatedRoute } from './common/UnauthenticatedRoute';
import { UNAUTHENTICATED_PATH } from './unauthenticatedPaths';

export const unauthenticatedRoutes = [
  {
    path: UNAUTHENTICATED_PATH.createAccount,
    element: (
      <UnauthenticatedRoute>
        <RegisterAccountView />
      </UnauthenticatedRoute>
    ),
  },
  {
    path: UNAUTHENTICATED_PATH.resetPassword,
    element: (
      <UnauthenticatedRoute>
        <ResetPasswordView />
      </UnauthenticatedRoute>
    ),
  },
  {
    path: UNAUTHENTICATED_PATH.createAccountCompleted,
    element: (
      <UnauthenticatedRoute>
        <CreateAccountCompleted />
      </UnauthenticatedRoute>
    ),
  },
  {
    path: UNAUTHENTICATED_PATH.passwordReset,
    element: (
      <UnauthenticatedRoute>
        <ResetPasswordCompleted />
      </UnauthenticatedRoute>
    ),
  },
  {
    path: UNAUTHENTICATED_PATH.forgotPassword,
    element: (
      <UnauthenticatedRoute>
        <RequestResetPasswordView />
      </UnauthenticatedRoute>
    ),
  },
  {
    path: UNAUTHENTICATED_PATH.oktaLogin,
    element: (
      <UnauthenticatedRoute>
        <OktaLoginView />
      </UnauthenticatedRoute>
    ),
  },
] as const;
