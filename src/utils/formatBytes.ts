/**
 * Converts bytes to a human-readable string.
 * @param bytes Number of bytes.
 * @param decimals Number of decimal places in the output.
 * @returns Formatted string.
 */
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  let positiveDecimals = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  // We don't want decimals for bytes.
  if (i === 0) {
    positiveDecimals = 0;
  }

  const num = (bytes / k ** i).toFixed(positiveDecimals);

  return `${num} ${sizes[i]}`;
};
