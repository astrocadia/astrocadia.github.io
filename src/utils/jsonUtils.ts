// Use of any here ok, since we're feeding into the structuredClone method,
// which takes type any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepClone = (a: any) => {
  return structuredClone(a);
};
