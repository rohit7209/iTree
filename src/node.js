
import { creatChildrenList, createBody, createBottomHook, createTopHook, createNodeLabel } from './helpers/DOMHelpers';

export default Node = function (props, position) {
  const body = createBody();

  const nodeLabel = createNodeLabel();
  const childrenList = creatChildrenList();

  this.addChild = (node) => {
    childrenList.appendChild(node.getElement());
  }

  this.getElement = () => {
    body.appendChild(createTopHook(position));
    body.appendChild(nodeLabel);
    (Array.isArray(props.children) && props.children.length > 0) ? body.appendChild(createBottomHook()) : null;
    body.appendChild(childrenList);
    return body;
  }

  this.addContent = (content) => {
    nodeLabel.innerHTML = content;
    nodeLabel.lastChild.style.marginLeft = 'auto';
    nodeLabel.lastChild.style.marginRight = 'auto';
  }
}