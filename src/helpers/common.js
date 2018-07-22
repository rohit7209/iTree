export const getUniqueId = (prefix = '') => {
  return prefix + (new Date().getTime()).toString(36) + (parseInt(Math.random() * 10000000000, 10)).toString(36);
};

export const trimInnerHTML = (content) => {
  return content.replace(/\r?\n|\r/g, '').trim();
};

export const camelToHyphenCase = (text) => {
  if (typeof text === 'string') {
    return text.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  } else return;
};

export const beautifyTree = (nodeMap, nodeParentMap) => {
  const addToTree = (tree, node) => {
    if (nodeMap[node].node.content) tree.values = nodeMap[node].node.content.values || {};
    (nodeParentMap[node] || []).forEach(item => {
      if (!tree.children) tree.children = [];
      tree.children.push(addToTree({}, item));
    });
    return tree;
  };
  const tree = addToTree({}, nodeParentMap.root[0]);
  return tree;
}
