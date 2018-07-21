import {
  creatChildrenList,
  createBody,
  createBottomHook,
  createTopHook,
  createNodeLabel,
  createNodeTools,
} from './helpers/DOMHelpers';

export default Node = function (props, id, store) {
  const node = createBody();
  const nodeLabel = createNodeLabel(props.content || {}, store, id);
  const childrenList = creatChildrenList();
  const tools = createNodeTools(id, store);
  // console.log('tools:', tools);
  const classesToBeUpdated = [
    '_iTree_top-hook--left',
    '_iTree_top-hook--right',
    '_iTree_top-hook--middle',
    '_iTree_top-hook--only',
    '_iTree_arrow-holder',
  ];

  //console.log('label', nodeLabel);

  this.addChild = (node, position) => {
    childrenList.appendChild(node.getElement(position));
  };

  let topHook, bottomHook;
  // assemble and return node element
  this.getElement = (position) => {
    // remove the children need to be uodated on every render
    if (node.contains(topHook)) node.removeChild(topHook);
    if (node.contains(bottomHook)) node.removeChild(bottomHook);
    
    // adding top hook to the node
    topHook = createTopHook(position);
    node.appendChild(topHook);
    
    // adding node label
    node.appendChild(nodeLabel);
    
    // adding tools to add child or remove the current node etc.
    // node.appendChild(tools);
    
    // add bottom hook if node has child/children
    bottomHook = createBottomHook();
    if (store.getNodeParentMap()[id]) node.appendChild(bottomHook);
    //appending children list to the node
    node.appendChild(childrenList);
    //returning node
    return node;
  };

  this.addContent = (content) => {
    nodeLabel.innerHTML = content;
    nodeLabel.lastChild.style.marginLeft = 'auto';
    nodeLabel.lastChild.style.marginRight = 'auto';
  };
};

    // node.childNodes.forEach((element) => {
    //   classesToBeUpdated.forEach((className) => {
    //     if (element.classList.contains(className)) { node.removeChild(element); return false; }
    //     else return true;
    //   });
    // });
