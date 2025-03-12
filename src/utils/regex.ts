// There isn't a built-in escape for Regex patterns in JS.  Documented here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#escaping
export const escapeRegex = (str?: string) =>
  str?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
