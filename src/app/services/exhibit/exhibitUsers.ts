import { api, getHTTPEndpoint } from '../api';
import type { SuccessResponse } from '../common/responses';
import type { EntityUser } from '../user';

interface ExhibitGetUsersRequestParameters {
  exhibitId: number;
}

interface ExhibitInviteNewUserRequestParameters {
  exhibitId: number;
  email: string;
  role: string;
}

interface ExhibitUpdateUserPermissionRequestParameters {
  id: number;
  role: string;
}

interface ExhibitDeleteUserPermissionRequestParameters {
  exhibitUserId: number;
}

interface ExhibitGetUsersResponse {
  exhibitUsers: Array<EntityUser>;
}
interface ExhibitInviteNewUserResponse extends SuccessResponse {}
interface ExhibitUpdateUserPermissionResponse extends SuccessResponse {}
interface ExhibitDeleteUserPermissionResponse extends SuccessResponse {}

// Define the API slice
export const exhibitUsersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getExhibitUsers: build.query<
      Array<EntityUser>,
      ExhibitGetUsersRequestParameters
    >({
      query: ({ exhibitId }) => ({
        url: `${getHTTPEndpoint('exhibit')}/exhibit-management/permission/by-exhibit-id/${exhibitId}`,
      }),
      providesTags: ['ExhibitUsers'],
      transformResponse: (response: ExhibitGetUsersResponse) =>
        response.exhibitUsers,
    }),

    inviteNewExhibitUser: build.mutation<
      ExhibitInviteNewUserResponse,
      ExhibitInviteNewUserRequestParameters
    >({
      query: (args) => ({
        url: `${getHTTPEndpoint('exhibit')}/exhibit-management/permission`,
        method: 'POST',
        body: {
          exhibitCreated: true,
          inviteVersion: 'v2',
          ...args,
        },
      }),
      invalidatesTags: ['ExhibitUsers'],
    }),

    updateExhibitUserPermission: build.mutation<
      ExhibitUpdateUserPermissionResponse,
      ExhibitUpdateUserPermissionRequestParameters
    >({
      query: ({ id, role }) => ({
        url: `${getHTTPEndpoint('exhibit')}/exhibit-management/permission/${id}`,
        method: 'PUT',
        body: {
          role,
        },
      }),
      invalidatesTags: ['ExhibitUsers'],
    }),

    deleteExhibitUserPermission: build.mutation<
      ExhibitDeleteUserPermissionResponse,
      ExhibitDeleteUserPermissionRequestParameters
    >({
      query: ({ exhibitUserId }) => ({
        url: `${getHTTPEndpoint('exhibit')}/exhibit-management/permission/${exhibitUserId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ExhibitUsers'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetExhibitUsersQuery,
  useInviteNewExhibitUserMutation,
  useUpdateExhibitUserPermissionMutation,
  useDeleteExhibitUserPermissionMutation,
} = exhibitUsersApi;
