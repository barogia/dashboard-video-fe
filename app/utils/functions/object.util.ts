export const isObjectNull = (obj: Object | undefined) => {
  if (!obj) return false;
  return Object.keys(obj).length === 0;
};
