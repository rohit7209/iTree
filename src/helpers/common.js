export const getUniqueId = () => {
  return (new Date().getTime()).toString(36);
};