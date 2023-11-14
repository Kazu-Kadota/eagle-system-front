export const getFileName = (url: string) => {
  const lastIndex = url.lastIndexOf('/') + 1;

  return url.slice(lastIndex);
};
