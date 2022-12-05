export const dateToLocal = (unixDate: string) => {
  return new Date(unixDate).toLocaleDateString();
};
