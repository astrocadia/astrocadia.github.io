import { DateTime } from 'luxon';
import {
  useCallback,
  useMemo,
  type FunctionComponent,
  type MouseEvent,
} from 'react';
import {
  downloadExhibitFile,
  type ExhibitFile,
  type UploadingExhibitFile,
} from '../../../app/services/files';
import {
  DEFAULT_DATE_TIME_FORMAT,
  DEFAULT_TIMEZONE_OFFSET_FORMAT,
} from '../../../utils/date';
import { Checkbox } from '../../common/Checkbox';
import { CircularProgressWithLabel } from '../../common/CircularProgressWithLabel';
import { IconButton } from '../../common/buttons/IconButton';
import { CheckIcon, DownloadIcon } from '../../common/icons';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '../../common/table';
import './ExhibitFilesTable.css';
import { formatBytes } from '../../../utils/formatBytes';

export interface ExhibitFilesTableProps {
  exhibitId: number;
  files: Array<ExhibitFile>;
  uploadingFiles?: Array<UploadingExhibitFile>;
  selectedFiles?: Set<ExhibitFile['file']>;
  onSelectFile?: (files: Set<ExhibitFile['file']>) => void;
}

export const ExhibitFilesTable: FunctionComponent<ExhibitFilesTableProps> = ({
  files = [],
  uploadingFiles = [],
  selectedFiles = new Set<ExhibitFile['file']>(),
  onSelectFile = () => {},
  exhibitId,
}) => {
  const isFileSelected = useCallback(
    (file: ExhibitFile): boolean => {
      return selectedFiles.has(file.file);
    },
    [selectedFiles]
  );

  const getRowSelectTitle = useCallback(
    (file: ExhibitFile): string => {
      return isFileSelected(file)
        ? `Deselect ${file.file}`
        : `Select ${file.file}`;
    },
    [isFileSelected]
  );

  const handleSelectFile = useCallback(
    (file: ExhibitFile): void => {
      const newSelectedFiles = new Set(selectedFiles);

      if (isFileSelected(file)) {
        newSelectedFiles.delete(file.file);
      } else {
        newSelectedFiles.add(file.file);
      }

      onSelectFile(newSelectedFiles);
    },
    [isFileSelected, onSelectFile, selectedFiles]
  );

  const downloadFile = useCallback(
    (event: MouseEvent, fileName: string) => {
      event.stopPropagation();
      downloadExhibitFile(exhibitId, fileName);
    },
    [exhibitId]
  );

  const handleSelectAll = useCallback(() => {
    const allFilesSelected = files.every(isFileSelected);
    const newSelectedFiles = new Set<ExhibitFile['file']>();
    if (!allFilesSelected) {
      files.forEach((file) => newSelectedFiles.add(file.file));
    }
    onSelectFile(newSelectedFiles);
  }, [files, isFileSelected, onSelectFile]);

  const formatTimestamp = useCallback(
    (timestamp: string | number | undefined): string => {
      if (!timestamp) return '';

      const date = new Date(timestamp);
      return DateTime.fromJSDate(date).toFormat(DEFAULT_DATE_TIME_FORMAT);
    },
    []
  );

  /**
   * Creates a formatted timestamp offset to display in table header.
   * @example 'Timestamp (UTC-4:00)'
   */
  const timestampColumnHeader = useMemo(() => {
    return `Last Updated (${DateTime.now().toFormat(DEFAULT_TIMEZONE_OFFSET_FORMAT)})`;
  }, []);

  return (
    <div className='ExhibitFilesTable'>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='ExhibitFilesTable__checkboxCell'>
                <IconButton
                  title={
                    selectedFiles.size === files.length
                      ? 'Deselect All'
                      : 'Select All'
                  }
                  variant='ghost'
                  onClick={handleSelectAll}
                >
                  <CheckIcon />
                </IconButton>
              </TableCell>
              <TableCell className='ExhibitFilesTable__filesCell'>
                Files
              </TableCell>
              <TableCell className='ExhibitFilesTable__lastUpdatedCell'>
                {timestampColumnHeader}
              </TableCell>
              <TableCell className='ExhibitFilesTable__sizeCell'>
                Size
              </TableCell>
              <TableCell className='ExhibitFilesTable__downloadCell' />
            </TableRow>
          </TableHead>
          <TableBody>
            {uploadingFiles.map((file) => {
              return (
                /**
                 * I know that this 👇 looks goofy with the checkbox stuff, but this is how MUI suggests it.
                 * @see https://mui.com/material-ui/react-table/#sorting-amp-selecting
                 */
                <TableRow
                  key={file.file}
                  onClick={() => handleSelectFile(file)}
                  role='checkbox'
                  aria-checked={isFileSelected(file)}
                  selected={isFileSelected(file)}
                  title={getRowSelectTitle(file)}
                  tabIndex={-1}
                >
                  <TableCell
                    className='ExhibitFilesTable__checkboxCell'
                    align='center'
                  >
                    <Checkbox
                      checked={isFileSelected(file)}
                      title={getRowSelectTitle(file)}
                      onClick={() => handleSelectFile(file)}
                    />
                  </TableCell>
                  <TableCell className='ExhibitFilesTable__uploadFilesCell'>
                    {file.file}
                  </TableCell>
                  <TableCell className='ExhibitFilesTable__lastUpdatedCell' />
                  <TableCell className='ExhibitFilesTable__sizeCell ExhibitFilesTable__uploadSizeCell'>
                    {formatBytes(file.size)}
                  </TableCell>
                  <TableCell className='ExhibitFilesTable__uploadCell'>
                    <div style={{ width: 38, height: 38 }}>
                      <CircularProgressWithLabel value={file.percentage} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {files.map((file) => (
              /**
               * I know that this 👇 looks goofy with the checkbox stuff, but this is how MUI suggests it.
               * @see https://mui.com/material-ui/react-table/#sorting-amp-selecting
               */
              <TableRow
                key={file.file}
                onClick={() => handleSelectFile(file)}
                role='checkbox'
                aria-checked={isFileSelected(file)}
                selected={isFileSelected(file)}
                title={getRowSelectTitle(file)}
                tabIndex={-1}
              >
                <TableCell
                  className='ExhibitFilesTable__checkboxCell'
                  align='center'
                >
                  <Checkbox
                    checked={isFileSelected(file)}
                    title={getRowSelectTitle(file)}
                    onClick={() => handleSelectFile(file)}
                  />
                </TableCell>
                <TableCell className='ExhibitFilesTable__filesCell'>
                  {file.file}
                </TableCell>
                <TableCell className='ExhibitFilesTable__lastUpdatedCell'>
                  {formatTimestamp(file.lastUpdated || file.updated_at)}
                </TableCell>
                <TableCell className='ExhibitFilesTable__sizeCell'>
                  {formatBytes(file.size)}
                </TableCell>
                <TableCell className='ExhibitFilesTable__downloadCell'>
                  <IconButton
                    title={`Download ${file.file}`}
                    onClick={(event) => downloadFile(event, file.file)}
                  >
                    <DownloadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
