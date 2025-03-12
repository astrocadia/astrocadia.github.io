/** Check if a string is valid JSON */
export const isJson = (string: string) => {
  if (!string || typeof string !== 'string') {
    return false;
  }

  try {
    JSON.parse(string);
    return true;
  } catch (e) {
    return false;
  }
};
