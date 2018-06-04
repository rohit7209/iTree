import {
  creatChildrenList,
  createBody,
  createBottomHook,
  createTopHook,
  createNodeLabel,
} from './helpers/DOMHelpers';

export default Node = function (props, position, store, _this) {
  const body = createBody();
  const nodeLabel = createNodeLabel(props.content || {}, store);
  const childrenList = creatChildrenList();

  //console.log('label', nodeLabel);

  this.addChild = (node) => {
    childrenList.appendChild(node.getElement());
  };

  this.getElement = () => {
    body.appendChild(createTopHook(position));
    body.appendChild(nodeLabel);
    if (Array.isArray(props.children) && props.children.length > 0) body.appendChild(createBottomHook());
    body.appendChild(childrenList);
    return body;
  };

  this.addContent = (content) => {
    nodeLabel.innerHTML = content;
    nodeLabel.lastChild.style.marginLeft = 'auto';
    nodeLabel.lastChild.style.marginRight = 'auto';
  };
};
