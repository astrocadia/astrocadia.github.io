import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FunctionComponent,
  type ReactNode,
} from 'react';

import { Delete, UploadFile } from '@mui/icons-material';
import { skipToken } from '@reduxjs/toolkit/query';
import { MainPanelHeader, MainPanelContent } from '../../MainPanel';
import { ExhibitFilesTable } from './ExhibitFilesTable';
import { Button } from '../../common/buttons';
import {
  UploadingExhibitFile,
  useDeleteExhibitFileMutation,
  useGetExhibitFilesQuery,
  useGetFileUploadUrlMutation,
  useRemoveFileEventsMutation,
  useUploadExhibitFileMutation,
} from '../../../app/services/files';
import {
  validateFileName,
  validateFileSize,
  validateFileType,
} from '../../../utils/fileValidators';
import { SpinningRefreshIcon } from '../../common/SpinningRefreshIcon/SpinningRefreshIcon';
import {
  useGetWorkspaceQuery,
  useGetWorkspaceUserStrapiLoginJwtQuery,
} from '../../../app/services/workspace';
import { useGetExhibitQuery } from '../../../app/services/exhibit';

import './ExhibitFiles.css';
import { StrapiContentLink } from '../../StrapiContentLink';
import { addOnEnterOrSpaceHandler } from '../../common/utils/eventHelpers';
import { useAppDispatch } from '../../../app/store';
import { addToast } from '../../../app/services/toast';
import {
  ApiError,
  FileTooLargeError,
  isFileTooLargeError,
} from '../../../app/services/common/errorResponses';

const UPLOAD_BUTTON_LABEL = 'Upload Exhibit File' as const;
// The size of each chunk upload in MB;
const FILE_CHUNK_UPLOAD_SIZE_MB = 25;

interface ExhibitFilesProps {
  exhibitId: number;
}

export const ExhibitFiles: FunctionComponent<ExhibitFilesProps> = ({
  exhibitId,
}) => {
  const dispatch = useAppDispatch();
  const fileButtonRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingExhibitFile[]>(
    []
  );
  const [errorMessages, setErrorMessages] = useState<Array<ReactNode>>([]);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  const exhibitQuery = useGetExhibitQuery({ exhibitId });
  const { data: exhibit } = exhibitQuery;

  const filesQuery = useGetExhibitFilesQuery(
    exhibit ? { exhibitId, siteId: exhibit.siteId } : skipToken
  );

  const workspaceId = exhibitQuery.data?.organizationId;
  const workspaceQuery = useGetWorkspaceQuery(
    workspaceId ? { workspaceId } : skipToken
  );
  const { data: workspace } = workspaceQuery;

  const strapiJwtQuery = useGetWorkspaceUserStrapiLoginJwtQuery(
    workspaceId ? { workspaceId } : skipToken
  );
  const { data: strapiJwt } = strapiJwtQuery;

  const showStrapiLink = useMemo(
    () =>
      strapiJwt?.token &&
      workspace &&
      strapiJwt?.user.email &&
      strapiJwt?.token,
    [strapiJwt, workspace]
  );

  const [getFileUploadUrl] = useGetFileUploadUrlMutation();
  const [uploadFilesMutation] = useUploadExhibitFileMutation();
  const [deleteFilesMutation] = useDeleteExhibitFileMutation();
  const [removeFileEventsMutation, { isLoading: isRemovingFiles }] =
    useRemoveFileEventsMutation();

  const files = useMemo(() => {
    return filesQuery.data?.files ?? [];
  }, [filesQuery.data]);

  const clearUploadFiles = useCallback(() => {
    if (fileButtonRef.current) {
      fileButtonRef.current.value = '';
      fileButtonRef.current.type = 'text';
      fileButtonRef.current.type = 'file';
    }
  }, []);

  /**
   * Uploads a file chunk and retries the upload if it fails.
   *
   * @param {number} siteId The site ID for this exhibit
   * @param {string} fileName The name of the file
   * @param {string} contentRange The byte range of the given chunk of the form: `byte ${startingByte}-${endingByte}/${totalFileSizeInBytes}`
   * @param {Blob} chunk The file chunk to be uploaded
   * @param {string} encodedUrl An encoded url that is the destination in GCP to where the resumable upload is being uploaded.
   * @returns {Promise<void>} Resolves when the chunk has been uploaded.
   */
  const uploadChunk = async (
    siteId: number,
    fileName: string,
    contentRange: string,
    chunk: Blob,
    encodedUrl: string
  ): Promise<void> => {
    const response = await uploadFilesMutation({
      exhibitId,
      siteId,
      fileName,
      contentRange,
      chunk,
      encodedUrl,
    });

    // eslint-disable-next-line
    if ((response as any).error && (response as any).error.status === 500) {
      await uploadChunk(siteId, fileName, contentRange, chunk, encodedUrl);
    }
  };

  /**
   * Uploads a file by splitting it into chunks and uploading each chunk one at a time.
   *
   * @param {File} file The file to upload
   * @param {number} fileIndex The index of file from an array of files to upload
   * @returns {Promise<void>} Resolves once the file has been uploaded
   */
  const uploadFile = async (file: File, fileIndex: number): Promise<void> => {
    if (!exhibit) return;

    const fileUploadURLResponse = await getFileUploadUrl({
      exhibitId: exhibit.id,
      siteId: exhibit.siteId,
      fileName: file.name,
      fileSize: file.size,
    });

    if ('error' in fileUploadURLResponse) {
      if (isFileTooLargeError(fileUploadURLResponse as ApiError)) {
        const fileSize = (
          fileUploadURLResponse as FileTooLargeError
        ).error.data.response.match(/[\d.]+/);
        dispatch(
          addToast({
            message: `Upload failed. The file exceeds the ${fileSize}GB upload limit`,
            type: 'error',
          })
        );
      }
      setErrorMessages(
        errorMessages.concat(
          <>
            <strong>{file.name}</strong>: Failed to upload {file.name}
          </>
        )
      );
      // eslint-disable-next-line no-console
      console.error(
        'Failed to get file upload URL',
        fileUploadURLResponse.error
      );
      return;
    }

    setErrorMessages([]);

    const encodedUrl = fileUploadURLResponse.data;

    const partSize = FILE_CHUNK_UPLOAD_SIZE_MB * 1024 * 1024;
    const numParts = Math.ceil(file.size / partSize);
    // This last chunk must be 1 byte less than expected or GCP will not accept the upload. It isn't entirely clear why.
    const lastChunkSize =
      Math.min(FILE_CHUNK_UPLOAD_SIZE_MB * 1024 * 1024, file.size % partSize) -
      1;

    for (let j = 0; j < numParts; j++) {
      const start = j * partSize;
      const end = j === numParts - 1 ? start + lastChunkSize : start + partSize;
      const chunk = file.slice(start, end + 1);

      try {
        // eslint-disable-next-line no-await-in-loop
        await uploadChunk(
          exhibit.siteId,
          file.name,
          `bytes ${start}-${end}/${file.size}`,
          chunk,
          encodedUrl
        );
        setUploadingFiles((prev) => {
          const newUploadingFiles = [...prev];
          const newFile = { ...newUploadingFiles[fileIndex] };

          newFile.percentage = Math.floor((end / (file.size - 1)) * 100);

          newUploadingFiles[fileIndex] = newFile;

          return newUploadingFiles;
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to upload part', j + 1, error); // Handle error or retry
      }
    }
  };

  /**
   * Uploads the given array of files, 3 at a time.
   * @param {File[]} fileList An array of files
   * @returns {Promise<void>} Resolves once all files have been uploaded
   */
  const uploadFiles = async (fileList: FileList): Promise<void> => {
    if (!exhibit) return;

    setIsUploading(true);

    const newUploadingFiles = Array.from(fileList).map((file) => ({
      type: 'file' as const,
      file: file.name,
      size: file.size,
      percentage: 0,
    }));

    setUploadingFiles(newUploadingFiles);

    for (let i = 0; i < fileList.length; i += 3) {
      const fileUploadPromises: Promise<void>[] = [];

      // upload up to 3 files at a time, then upload the next 3 files after completion.
      for (let k = 0; k < new Array(3).length; k++) {
        if (fileList[i + k]) {
          fileUploadPromises.push(uploadFile(fileList[i + k], i + k));
        }
      }

      // eslint-disable-next-line no-await-in-loop
      await Promise.all(fileUploadPromises);
    }

    setUploadingFiles([]);
    await filesQuery.refetch();
    setIsUploading(false);
  };

  const handleFileButtonChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (fileList?.length) {
      const messages = Array.from(fileList).reduce<Array<ReactNode>>(
        (acc, file) => {
          let errorMessage = validateFileName(file);

          if (errorMessage) {
            acc.push(
              <>
                <strong>{file.name}</strong>: {errorMessage}
              </>
            );
          }
          errorMessage = validateFileType(file);

          if (errorMessage) {
            acc.push(
              <>
                <strong>{file.name}</strong>: {errorMessage}
              </>
            );
          }
          errorMessage = validateFileSize(file);

          if (errorMessage) {
            acc.push(
              <>
                <strong>{file.name}</strong>: {errorMessage}
              </>
            );
          }
          return acc;
        },
        []
      );

      if (messages.length) {
        // set error message;
        setErrorMessages(messages);
      } else {
        uploadFiles(fileList);
      }
    }
  };

  const deleteFiles = useCallback(() => {
    if (!exhibit) return;
    setIsDeleting(true);
    const promises: Array<Promise<unknown>> = [];

    Array.from(selectedFiles.keys()).forEach((fileName) => {
      const deleteRes = deleteFilesMutation({
        exhibitId: exhibit.id,
        siteId: exhibit.siteId,
        fileName,
      });
      const removeFileEventsRes = removeFileEventsMutation({ fileName });

      promises.push(deleteRes, removeFileEventsRes);
    });

    Promise.all(promises)
      .then(() => {
        setSelectedFiles(new Set());
        filesQuery.refetch();
      })
      .finally(() => {
        setIsDeleting(false);
      });
  }, [
    deleteFilesMutation,
    exhibit,
    filesQuery,
    removeFileEventsMutation,
    selectedFiles,
  ]);

  const getPluralizedFile = useCallback((fileCount: number): string => {
    return fileCount === 1 ? 'File' : 'Files';
  }, []);

  const downloadButtonLabel = useMemo(
    () =>
      `Delete ${selectedFiles.size} ${getPluralizedFile(selectedFiles.size)}`,
    [getPluralizedFile, selectedFiles]
  );

  const headerActions = useMemo(() => {
    if (showStrapiLink && workspace && strapiJwt) {
      return [
        <StrapiContentLink
          key='strapiLink'
          value={null}
          contentType='media'
          organization={workspace}
          strapiUserEmail={strapiJwt.user.email}
          strapiJwt={strapiJwt.token}
          linkText='Workspace Files'
        />,
      ];
    }

    return [];
  }, [strapiJwt, showStrapiLink, workspace]);

  return (
    <>
      <MainPanelHeader title='Files' actions={headerActions} />
      <MainPanelContent className='ExhibitFiles__content'>
        {errorMessages.length > 0 && (
          <div className='ExhibitFiles__errorMessages'>
            {errorMessages.map((message, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>{message}</div>
            ))}
          </div>
        )}
        <div className='ExhibitFiles__toolbar'>
          {/* @see https://mui.com/material-ui/react-button/#file-upload */}
          <Button
            startIcon={isUploading ? <SpinningRefreshIcon /> : <UploadFile />}
            className='ExhibitFiles__uploadButton'
            component='label'
            role={undefined}
            onClick={clearUploadFiles}
            onKeyUp={addOnEnterOrSpaceHandler(() => {
              fileButtonRef.current?.click();
            })}
            disabled={isUploading}
            title={UPLOAD_BUTTON_LABEL}
          >
            {UPLOAD_BUTTON_LABEL}
            <input
              type='file'
              hidden
              multiple
              onChange={handleFileButtonChange}
              ref={fileButtonRef}
            />
          </Button>
          <Button
            className='ExhibitFiles__deleteButton'
            disabled={selectedFiles.size === 0 || isDeleting || isRemovingFiles}
            startIcon={isDeleting ? <SpinningRefreshIcon /> : <Delete />}
            onClick={deleteFiles}
            title={downloadButtonLabel}
          >
            {downloadButtonLabel}
          </Button>
        </div>
        <ExhibitFilesTable
          exhibitId={exhibitId}
          uploadingFiles={uploadingFiles}
          files={files}
          selectedFiles={selectedFiles}
          onSelectFile={setSelectedFiles}
        />
      </MainPanelContent>
    </>
  );
};
