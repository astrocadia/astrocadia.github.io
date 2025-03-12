// IMPORTANT: If logical changes occur, ensure that gumband-content-service/src/utils/validators/fileValidators.ts is updated as well

import { formatBytes } from './formatBytes';

// Match case insensitive "[org]" at start of name ignoring leading whitespace
const INVALID_FILENAME_STRAPI_PREFIX = /^\s*\[org\]/i;
const RESTRICTED_FILE_EXTENSIONS = ['exe', 'bat', 'php'];
const MAX_FILE_SIZE = 25 * 1024 ** 3; // 25 GB

/**
 * Validates that a given file name is valid for the Gumband system
 * @todo write some tests for this
 * @param {File} file
 * @returns {string | undefined }
 */
export const validateFileName = (file: File): string | undefined => {
  if (file.name.match(INVALID_FILENAME_STRAPI_PREFIX)) {
    return 'Filename may not begin with "[ORG]"';
  }
  return undefined;
};

/**
 * Validate the file extension of a given file name
 *
 * @param {File} file - file to validate
 * @return {string | undefined}
 */
export function validateFileType(file: File): string | undefined {
  const fileSplit = file.name.split('.');
  if (fileSplit.length < 2) {
    return 'Unable to determine file extension';
  }

  const fileExtension = fileSplit.at(-1);
  if (
    fileExtension !== undefined &&
    RESTRICTED_FILE_EXTENSIONS.includes(fileExtension)
  ) {
    return `File may not have extension .${fileExtension}`;
  }
  return undefined;
}

/**
 * Validate the size of a file
 *
 * @param {File} file - the size of a file
 * @return {string | undefined}
 */
export function validateFileSize(file: File): string | undefined {
  if (file.size > MAX_FILE_SIZE) {
    return `File must be less that ${formatBytes(MAX_FILE_SIZE)}`;
  }
  return undefined;
}
