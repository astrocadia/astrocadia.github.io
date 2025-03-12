// https://stackoverflow.com/questions/5639346/what-is-the-shortest-function-for-reading-a-cookie-by-name-in-javascript
export const getCookie = (name: string): string | undefined => {
  const match = document.cookie
    .match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`)
    ?.pop();

  return match ? decodeURIComponent(match) : undefined;
};

export const removeCookie = (name: string) => {
  document.cookie = `${encodeURIComponent(
    name
  )}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};
