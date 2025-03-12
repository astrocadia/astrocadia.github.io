export const downloadFile = async (
  url: string,
  filename: string,
  requestInit: RequestInit
) => {
  const response = await fetch(url, requestInit);
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const link: HTMLAnchorElement = document.createElement('a');

  link.href = objectUrl;
  link.download = filename;
  link.click();
};
