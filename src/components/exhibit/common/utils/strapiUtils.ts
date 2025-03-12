import type {
  Workspace,
  OrganizationSettings,
} from '../../../../app/services/workspace';
import { isJson } from '../../../../utils/isJson';

export type StrapiConfigSetting = {
  url: string;
  adminUser: string;
  adminPassword: string;
  editorUser: string;
  editorPassword: string;
  apiUser: string;
  apiPassword: string;
};

/**
 * If this is a cloud environment URL, replace the API endpoint the the admin panel endpoint
 * they are mapped differently when running locally versus running in the cloud
 */
export const getAdminURL = (strapiApiURL: string): string => {
  let adminUrl;
  if (
    strapiApiURL.indexOf('.gumband.com') !== -1 ||
    strapiApiURL.indexOf('.gmbnd.com') !== -1
  ) {
    adminUrl = strapiApiURL.replace('/api/v1/strapi', '/strapi');
  } else {
    adminUrl = `${strapiApiURL}/admin`;
  }
  return adminUrl;
};

export const getStrapiUrlFromWorkspace = (workspace: Workspace): string => {
  if (!workspace) {
    return '';
  }

  const strapiConfig =
    workspace.organizationsettings?.find(
      (setting: OrganizationSettings) =>
        setting.idString === '$external-cms-strapi-config'
    )?.value || '';

  if (isJson(strapiConfig)) {
    const strapiConfigObj: StrapiConfigSetting = JSON.parse(strapiConfig);
    return strapiConfigObj.url;
  }

  return '';
};
