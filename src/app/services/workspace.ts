import { api, getHTTPEndpoint } from './api';
import { SuccessResponse } from './common/responses';
import type { EntityUser, UserRole } from './user';

const PROJECT_USER_INVITE_VERSION = 'v2' as const;
const WORKSPACE_USER_INVITE_VERSION = 'v2' as const;

export type WorkspaceRoleManager = 'manager';
export type WorkspaceRole = WorkspaceRoleManager | 'viewer';

// Known as Organization in the backend
export interface WorkspaceSummary {
  id: number;
  name: string;
}

export interface ProjectSummary {
  id: number;
  name: string;
}

export type OpMode = 'Off' | 'On';

export interface OrganizationSettings {
  id: number;
  OrganizationId: number;
  idString: string;
  type: string;
  display: string;
  value: string;
  default: string;
  order: number;
}

export interface Workspace extends WorkspaceSummary {
  sites: Array<ProjectSummary>;
  organizationsettings: Array<OrganizationSettings>;
}

export interface ProjectSettings {
  id: number;
  SiteId: number;
  idString: string;
  type: string;
  display: string;
  value: string;
  default: string;
  order: number;
}

export interface Project extends ProjectSummary {
  organizationId: number;
  // Technically these fields are in the object, but we should ignore it in favor of the full object from it's own api
  // organizationName: string;
  // exhibits: Array<Exhibit>;
  sitesettings: Array<ProjectSettings>;
  updatedAt: string;
}

// Should use the interface from the exhibit api
// export interface Exhibit {
//   id: number;
//   name: string;
//   opMode?: OpMode;
//   online: boolean;
//   siteId: number;
//   mqttPath: string;
//   manifestLocked: boolean;
//   lastOnlineChange: string;
//   leaderId?: number;
// }

export interface WorkspaceListResponse extends SuccessResponse {
  organizations: Array<WorkspaceSummary>;
  canCreate: boolean;
  role?: WorkspaceRoleManager; // TODO: this is the only role we can return from this endpoint, but need to check if it is broader
}

export interface WorkspaceGetRequestParameters {
  workspaceId: number;
}

export interface WorkspaceGetResponse extends SuccessResponse {
  organization: Workspace;
  canCreate: boolean;
  role: WorkspaceRole;
  isAdmin: boolean;
}

export interface StrapiRole {
  id: number;
  name: string;
  code: string;
  description: string;
}

export interface StrapiUser {
  blocked: null | true;
  email: string;
  id: number;
  firstname: string;
  isActive: boolean;
  lastname: string;
  preferedLanguage: string | null;
  roles: Array<StrapiRole>;
}

export interface WorkspaceGetUserStrapiLoginJwtRequestParameters {
  workspaceId: number;
}

export interface WorkspaceGetUserStrapiLoginJwtResponse {
  token: string;
  user: StrapiUser;
}

export interface WorkspaceGetStrapiApiJwtRequestParameters {
  workspaceId: number;
}

export interface WorkspaceGetStrapiApiJwtResponse {
  jwt: string;
  user: StrapiUser;
}

export interface WorkspaceGetUsersRequestParameters {
  workspaceId: number;
}

export interface WorkspaceGetUsersResponse extends SuccessResponse {
  permissions: Array<EntityUser>;
}

export interface WorkspaceUpdateUserPermissionRequestParameters {
  workspaceUserId: EntityUser['id'];
  role: UserRole;
}

export interface WorkspaceUpdateUserPermissionResponse
  extends SuccessResponse {}

export interface WorkspaceRemoveUserPermissionRequestParameters {
  workspaceUserId: number;
}

export interface WorkspaceRemoveUserPermissionResponse
  extends SuccessResponse {}

export interface WorkspaceInviteNewUserRequestParameters {
  workspaceId: number;
  email: string;
  role?: UserRole;
}

export interface WorkspaceInviteNewUserResponse extends SuccessResponse {}

export interface ProjectGetRequestParameters {
  projectId: number;
}

export interface ProjectGetResponse extends SuccessResponse {
  site: Project;
  canCreate: boolean;
  role: string;
}

export interface ProjectCreateRequest {
  name: string;
  workspaceId: number;
}

export interface ProjectCreateResponse extends SuccessResponse {
  site: Project;
}

interface ProjectGetUsersRequestParameters {
  projectId: number;
}

interface ProjectGetUsersResponse {
  permissions: Array<EntityUser>;
}

interface ProjectUpdateUserPermissionRequestParameters {
  id: number;
  role: UserRole;
}

interface ProjectUpdateUserPermissionResponse extends SuccessResponse {}

interface ProjectInviteNewUserRequestParameters {
  projectId: number;
  email: string;
  role: UserRole;
}

interface ProjectInviteNewUserResponse extends SuccessResponse {}

interface ProjectDeleteUserPermissionRequestParameters {
  id: number;
}

interface ProjectDeleteUserPermissionResponse extends SuccessResponse {}

export const workspaceApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProject: build.query<Project, ProjectGetRequestParameters>({
      query: (parameters) =>
        `${getHTTPEndpoint('org')}/org-management/site/${parameters.projectId}`,
      transformResponse: (response: ProjectGetResponse) => response.site,
      providesTags: (result) =>
        result
          ? [
              {
                type: 'Project' as const,
                id: result.id,
              },
              'Project',
            ]
          : ['Project'],
    }),
    getProjectUsers: build.query<
      Array<EntityUser>,
      ProjectGetUsersRequestParameters
    >({
      query: ({ projectId }) => ({
        url: `${getHTTPEndpoint('org')}/org-management/permission/site/${projectId}`,
      }),
      transformResponse: (response: ProjectGetUsersResponse) =>
        response.permissions,
      providesTags: ['ProjectUsers'],
    }),
    getWorkspace: build.query<Workspace, WorkspaceGetRequestParameters>({
      query: (parameters) => ({
        url: `${getHTTPEndpoint('org')}/org-management/organization/${
          parameters.workspaceId
        }`,
        params: { partialSites: 'true' },
      }),
      transformResponse: (response: WorkspaceGetResponse) =>
        response.organization,
      providesTags: (result) =>
        result
          ? [
              {
                type: 'Workspace' as const,
                id: result.id,
              },
              'Workspace',
            ]
          : ['Workspace'],
    }),
    getWorkspaceUsers: build.query<
      Array<EntityUser>,
      WorkspaceGetUsersRequestParameters
    >({
      query: ({ workspaceId }) =>
        `${getHTTPEndpoint('org')}/org-management/permission/organization?organizationId=${workspaceId}`,
      transformResponse: (response: WorkspaceGetUsersResponse) =>
        response.permissions,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ userId }) => ({
                type: 'WorkspaceUsers' as const,
                id: userId,
              })),
              'WorkspaceUsers',
            ]
          : ['WorkspaceUsers'],
    }),
    getWorkspaceUserStrapiLoginJwt: build.query<
      WorkspaceGetUserStrapiLoginJwtResponse,
      WorkspaceGetUserStrapiLoginJwtRequestParameters
    >({
      query: ({ workspaceId }) => ({
        url: `${getHTTPEndpoint('org')}/org-management/organization/setting/strapi/login`,
        params: { organizationId: workspaceId },
        body: {},
        method: 'POST',
      }),
    }),

    getWorkspaceStrapiApiJwt: build.query<
      WorkspaceGetStrapiApiJwtResponse,
      WorkspaceGetStrapiApiJwtRequestParameters
    >({
      query: ({ workspaceId }) => ({
        url: `${getHTTPEndpoint('org')}/org-management/organization/setting/strapi/auth`,
        params: { organizationId: workspaceId },
        body: {},
        method: 'POST',
      }),
    }),
    // TODO: should have it's own call, but let's use this to simulate it for now
    listProjects: build.query<
      Array<ProjectSummary>,
      WorkspaceGetRequestParameters
    >({
      query: ({ workspaceId }) => ({
        url: `${getHTTPEndpoint('org')}/org-management/organization/${workspaceId}`,
        params: { partialSites: 'true' },
      }),
      transformResponse: (response: WorkspaceGetResponse) =>
        response.organization.sites,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Project' as const,
                id,
              })),
              'Project',
            ]
          : ['Project'],
    }),
    listWorkspaces: build.query<Array<WorkspaceSummary>, void>({
      query: () => ({
        url: `${getHTTPEndpoint('org')}/org-management/organization`,
        params: { partialOrgs: 'true' },
      }),
      transformResponse: (response: WorkspaceListResponse) =>
        response.organizations,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'WorkspaceSummary' as const,
                id,
              })),
              'WorkspaceSummary',
            ]
          : ['WorkspaceSummary'],
    }),
    createProject: build.mutation<Project, ProjectCreateRequest>({
      query: ({ name, workspaceId }) => ({
        url: `${getHTTPEndpoint('org')}/org-management/site`,
        method: 'POST',
        body: { name, organizationId: workspaceId },
      }),
      invalidatesTags: (result) =>
        result
          ? ['Project', { type: 'Workspace', id: result.organizationId }]
          : [],
      transformResponse: (response: ProjectCreateResponse) => response.site,
    }),
    inviteNewProjectUser: build.mutation<
      ProjectInviteNewUserResponse,
      ProjectInviteNewUserRequestParameters
    >({
      query: ({ projectId, email, role }) => ({
        url: `${getHTTPEndpoint('org')}/org-management/permission/site`,
        method: 'POST',
        body: {
          siteId: projectId,
          email,
          role,
          inviteVersion: PROJECT_USER_INVITE_VERSION,
        },
      }),
      // Changes cascade down to child entities
      invalidatesTags: ['ProjectUsers', 'ExhibitUsers'],
    }),
    inviteNewWorkspaceUser: build.mutation<
      WorkspaceInviteNewUserResponse,
      WorkspaceInviteNewUserRequestParameters
    >({
      query: ({ workspaceId, email, role }) => ({
        url: `${getHTTPEndpoint('org')}/org-management/permission/organization`,
        method: 'POST',
        body: {
          organizationId: workspaceId,
          email,
          role,
          inviteVersion: WORKSPACE_USER_INVITE_VERSION,
        },
      }),
      // Changes cascade down to child entities
      invalidatesTags: ['WorkspaceUsers', 'ProjectUsers', 'ExhibitUsers'],
    }),
    updateProjectUserPermission: build.mutation<
      ProjectUpdateUserPermissionResponse,
      ProjectUpdateUserPermissionRequestParameters
    >({
      query: ({ id, role }) => ({
        url: `${getHTTPEndpoint('org')}/org-management/permission/site/${id}`,
        method: 'PUT',
        body: {
          role,
        },
      }),
      invalidatesTags: ['ProjectUsers'],
    }),
    updateWorkspaceUserPermission: build.mutation<
      WorkspaceUpdateUserPermissionResponse,
      WorkspaceUpdateUserPermissionRequestParameters
    >({
      query: ({ workspaceUserId, role }) => ({
        url: `${getHTTPEndpoint('org')}/org-management/permission/organization/${workspaceUserId}`,
        method: 'PUT',
        body: { role },
      }),
      // Changes cascade to both workspace and project users
      invalidatesTags: ['WorkspaceUsers', 'ProjectUsers'],
    }),
    deleteProjectUserPermission: build.mutation<
      ProjectDeleteUserPermissionResponse,
      ProjectDeleteUserPermissionRequestParameters
    >({
      query: ({ id }) => ({
        url: `${getHTTPEndpoint('org')}/org-management/permission/site/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ProjectUsers'],
    }),
    deleteWorkspaceUserPermission: build.mutation<
      WorkspaceRemoveUserPermissionResponse,
      WorkspaceRemoveUserPermissionRequestParameters
    >({
      query: ({ workspaceUserId }) => ({
        url: `${getHTTPEndpoint('org')}/org-management/permission/organization/${workspaceUserId}`,
        method: 'DELETE',
      }),
      // Changes cascade down to child entities
      invalidatesTags: ['WorkspaceUsers', 'ProjectUsers', 'ExhibitUsers'],
    }),
  }),
});

export const {
  useGetProjectQuery,
  useGetProjectUsersQuery,
  useGetWorkspaceQuery,
  useGetWorkspaceUsersQuery,
  useListProjectsQuery,
  useListWorkspacesQuery,
  useCreateProjectMutation,
  useGetWorkspaceUserStrapiLoginJwtQuery,
  useGetWorkspaceStrapiApiJwtQuery,
  useInviteNewProjectUserMutation,
  useInviteNewWorkspaceUserMutation,
  useUpdateProjectUserPermissionMutation,
  useUpdateWorkspaceUserPermissionMutation,
  useDeleteProjectUserPermissionMutation,
  useDeleteWorkspaceUserPermissionMutation,
} = workspaceApi;
