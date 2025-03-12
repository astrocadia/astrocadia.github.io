import { isJson } from '../../../utils/isJson';

/** Pretty prints json */
export const formatJsonByLine = (input: unknown): string => {
  let value = null;

  if (typeof input === 'string' && isJson(input)) {
    value = JSON.parse(input);
  } else if (typeof input === 'string') {
    return input;
  } else if (input === undefined) {
    return 'undefined';
  } else {
    value = input;
  }

  const result = JSON.stringify(value, null, 2);

  return result;
};
