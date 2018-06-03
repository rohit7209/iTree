export const getUniqueId = () => {
  return (new Date().getTime()).toString(36);
};

export const trimInnerHTML = (content) => {
  return content.replace(/\r?\n|\r/g, '').trim();
};