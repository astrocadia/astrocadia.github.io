import type { ObjectValues } from '@deeplocal/gumband-public-shared-lib';
import { api, getHTTPEndpoint } from './api';
import { SuccessResponse } from './common/responses';

export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  profile_image?: string;
  dladmin: boolean;
}

export const USER_ROLE = {
  MANAGER: 'manager',
  DEVELOPER: 'developer',
  VIEWER: 'viewer',
} as const;
export type UserRole = ObjectValues<typeof USER_ROLE>;

export interface EntityUser extends Omit<User, 'dladmin'> {
  userId: number;
  role: UserRole;
}

export interface ValidateResetTokenInfo {
  id: string;
  email?: string;
}

export interface CreateAccountInfo {
  firstName: string;
  lastName: string;
  password: string;
  resetUrlId: string;
}

export interface ChangePasswordInfo {
  password: string;
  resetUrlId: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface PasswordResetRequestInfo {
  email: string;
}

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, void>({
      query: () => `${getHTTPEndpoint('auth')}/auth/`,
      providesTags: ['User'],
    }),
    validateResetToken: build.query<boolean, ValidateResetTokenInfo>({
      query: (param) => ({
        url: `${getHTTPEndpoint('auth')}/auth/user/check-reset-password`,
        method: 'POST',
        body: { resetUrlId: param.id, resetUrlEmail: param.email },
      }),
      transformResponse: (res: SuccessResponse) => {
        return res.response === 'success';
      },
    }),
    createAccount: build.mutation<SuccessResponse, CreateAccountInfo>({
      query: (body) => ({
        url: `${getHTTPEndpoint('auth')}/auth/user/generic`,
        method: 'POST',
        body,
      }),
    }),
    changePassword: build.mutation<SuccessResponse, ChangePasswordInfo>({
      query: (body) => ({
        url: `${getHTTPEndpoint('auth')}/auth/user/change-password`,
        method: 'POST',
        body,
      }),
    }),
    passwordResetRequest: build.mutation<
      SuccessResponse,
      PasswordResetRequestInfo
    >({
      query: ({ email }) => ({
        url: `${getHTTPEndpoint('auth')}/auth/user/reset-password`,
        method: 'POST',
        body: { email, emailVersion: 'v2' },
      }),
    }),
    login: build.mutation<User, LoginPayload>({
      query: (body) => ({
        url: `${getHTTPEndpoint('auth')}/auth/user/login`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (user) => {
        if (user) {
          return ['User'];
        }
        return [];
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useLoginMutation,
  useValidateResetTokenQuery,
  useCreateAccountMutation,
  useChangePasswordMutation,
  usePasswordResetRequestMutation,
} = userApi;
