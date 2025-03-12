import { downloadFile } from '../../utils/downloadFile';
import { api, getHTTPEndpoint } from './api';
import type { OkResponse, SuccessResponse } from './common/responses';

export const defaultDownloadExhibitFileRequestInit: RequestInit = {
  credentials: 'include',
  headers: {
    responseType: 'blob',
  },
} as const;

export interface ExhibitFile {
  /** @todo Figure out all possible types.  */
  type: 'file';
  file: string;
  /** Currently the content management service returns either millis or ISO string */
  lastUpdated?: string | number;
  /** Depending on what file store we're using, we might get this instead of lastUpdated.  */
  updated_at?: string;
  size: number;
}

export interface UploadingExhibitFile extends ExhibitFile {
  // The progress of upload from 0-100
  percentage: number;
}

export interface ExhibitFilesGetParameters {
  exhibitId: number;
  siteId?: number;
}

export interface ExhibitFilesGetResponse extends OkResponse {
  files: Array<ExhibitFile>;
  errors?: Array<string>;
}

export interface ExhibitFileUploadUrlGetParameters {
  exhibitId: number;
  siteId: number;
  fileName: string;
  fileSize: number;
}

export interface ExhibitFileUploadUrlGetResponse extends SuccessResponse {
  encodedUrl: string;
}

export interface ExhibitFilesUploadParameters {
  exhibitId: number;
  siteId: number;
  chunk: Blob;
  fileName?: string;
  contentRange: string;
  encodedUrl: string;
}

export interface ExhibitFilesUploadResponse {
  response: ResponseType;
  error?: string;
  data: {
    message: string;
    fileName: string;
    size: number;
  };
}

export interface ExhibitFilesDeleteParameters {
  exhibitId: number;
  siteId?: number;
  fileName: string;
}
export interface ExhibitFilesDeleteResponse {
  response: ResponseType;
}

export interface ExhibitRemoveFileEventsParams {
  fileName: string;
}

export const filesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getExhibitFiles: build.query<
      ExhibitFilesGetResponse,
      ExhibitFilesGetParameters
    >({
      query: ({ exhibitId, siteId }) => ({
        url: `${getHTTPEndpoint('content')}/content/files/ls`,
        params: { exhibitId, siteId },
      }),
    }),
    getFileUploadUrl: build.mutation<string, ExhibitFileUploadUrlGetParameters>(
      {
        query: ({ exhibitId, siteId, ...body }) => {
          return {
            url: `${getHTTPEndpoint('content')}/content/files/get-upload-url`,
            params: { exhibitId, siteId },
            body,
            method: 'POST',
          };
        },
        transformResponse: (response: ExhibitFileUploadUrlGetResponse) =>
          response.encodedUrl,
      }
    ),
    uploadExhibitFile: build.mutation<
      ExhibitFilesUploadResponse,
      ExhibitFilesUploadParameters
    >({
      query: ({
        exhibitId,
        siteId,
        fileName,
        chunk,
        contentRange,
        encodedUrl,
      }) => {
        const formData = new FormData();
        formData.append('contentRange', contentRange);
        formData.append(`file`, chunk);
        return {
          url: `${getHTTPEndpoint('content')}/content/files/upload-chunk`,
          params: { exhibitId, siteId, fileName },
          headers: {
            encodedUrl,
          },
          method: 'POST',
          body: formData,
          formData: true,
        };
      },
    }),
    deleteExhibitFile: build.mutation<
      ExhibitFilesDeleteResponse,
      ExhibitFilesDeleteParameters
    >({
      query: ({ exhibitId, siteId, fileName }) => {
        return {
          url: `${getHTTPEndpoint('content')}/content/files`,
          params: { exhibitId, siteId, fileName },
          method: 'DELETE',
        };
      },
    }),
    removeFileEvents: build.mutation<
      SuccessResponse,
      ExhibitRemoveFileEventsParams
    >({
      query: ({ fileName }) => ({
        url: `${getHTTPEndpoint(
          'exhibit'
        )}/exhibit-management/scheduling/schedulesetting/file/${fileName}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetExhibitFilesQuery,
  useGetFileUploadUrlMutation,
  useUploadExhibitFileMutation,
  useDeleteExhibitFileMutation,
  useRemoveFileEventsMutation,
} = filesApi;

export const downloadExhibitFile = async (
  exhibitId: number,
  fileName: string,
  requestInit: RequestInit = defaultDownloadExhibitFileRequestInit
): Promise<void> => {
  const url = `${getHTTPEndpoint('content')}/content/files/?exhibitId=${exhibitId}&fileName=${fileName}`;
  return downloadFile(url, fileName, requestInit);
};
