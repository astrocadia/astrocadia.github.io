import pluralize from 'pluralize';
import { api } from './api';
import { StrapiSetting, StrapiOption } from '../entities/exhibitManifest';

export type StrapiOptionsGetResponse = Array<StrapiOption>;

export interface StrapiOptionsGetRequestParameters {
  strapiUrl: string;
  contentType: StrapiSetting['contentType'];
  jwt: string;
}

const createHTTPResponseError = (message: string, status: number): Error => {
  const error = new Error(message) as Error & { status?: number };
  error.status = status;
  return error;
};

export const strapiApi = api.injectEndpoints({
  endpoints: (build) => ({
    getStrapiOptions: build.query<
      StrapiOptionsGetResponse,
      StrapiOptionsGetRequestParameters
    >({
      queryFn: ({ strapiUrl, contentType, jwt }) => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open(
            'GET',
            `${strapiUrl}/${pluralize.plural(contentType)}`,
            true
          );
          xhr.setRequestHeader('Authorization', `Bearer ${jwt}`);

          xhr.onload = () => {
            if (xhr.status === 204) {
              resolve({ data: [] });
            } else if (xhr.status >= 200 && xhr.status < 300) {
              try {
                resolve({ data: JSON.parse(xhr.responseText) });
              } catch (error) {
                reject(
                  createHTTPResponseError('Invalid JSON response', xhr.status)
                );
              }
            } else {
              reject(createHTTPResponseError(xhr.statusText, xhr.status));
            }
          };

          xhr.onerror = () => {
            reject(createHTTPResponseError(xhr.statusText, xhr.status));
          };

          xhr.send();
        });
      },
    }),
  }),
});

export const { useGetStrapiOptionsQuery } = strapiApi;
