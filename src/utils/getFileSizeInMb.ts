const bytesInMb = 1_048_576;

/**
 * Get file size in MB by size in bytes.
 */
export const getFileSizeInMb = (fileSizeInBytes: number): string => {
  const fileSizeInMb = (fileSizeInBytes / bytesInMb).toFixed(2);

  return `${fileSizeInMb} MB`;
};
