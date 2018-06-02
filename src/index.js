import Add from './helpers';
import './css/index.css';

const creatChildrenList = () => {
  const element = document.createElement('div');
  element.setAttribute('class', '_iTree_children-list');
  return element;
}

const createNodeLabel = () => {
  const element = document.createElement('div');
  element.setAttribute('class', '_iTree_node-label');
  return element;
}

const createBody = () => {
  const element = document.createElement('div');
  element.setAttribute('class', '_iTree_node');
  return element;
}

const createArrow = () => {
  const element = document.createElement('div');
  element.setAttribute('class', '_iTree_arrow-holder');
  element.innerHTML = `<div style="margin:auto;width:2px; height:5px; background:black"></div>`;
  return element;
}

const createHook = () => {
  const element = document.createElement('div');
  element.setAttribute('class', '_iTree_hook');
  element.innerHTML = `
  <div style="width:50%; height:5px; border-top:1px solid black; border-right:1px solid black"></div>
  <div style="width:50%; height:5px; border-top:1px solid black; border-left:1px solid black"></div>
  `;
  return element;
}

const Node = function (props) {
  const body = createBody();

  const hook = createHook();
  const nodeLabel = createNodeLabel();
  const arrow = createArrow();
  const childrenList = creatChildrenList();

  this.addChild = (node) => {
    childrenList.appendChild(node.getElement());
  }

  this.getElement = () => {
    body.appendChild(hook);
    body.appendChild(nodeLabel);
    body.appendChild(arrow);
    body.appendChild(childrenList);
    return body;
  }

  this.addContent = (content) => {
    nodeLabel.innerHTML = content;
    nodeLabel.lastChild.style.marginLeft = 'auto';
    nodeLabel.lastChild.style.marginRight = 'auto';
  }
}

const addNext = (props) => {
  const node = new Node(props);
  node.addContent(props.content);
  if (Array.isArray(props.children)) {
    props.children.forEach((child) => {
      node.addChild(addNext(child))
    });
  }
  return node;
}

(() => {
  window.iTree = function (container) {
    this.draw = (config) => {

      const parent = addNext(config);

      container.appendChild(parent.getElement());

    };
  }
})()


// const parentNode = new Node('parent');

// const childNode1 = new Node();
// const childNode2 = new Node();

// const childNode11 = new Node();
// const childNode12 = new Node();

// const childNode21 = new Node();
// const childNode22 = new Node();

// childNode1.addChild(childNode11);
// childNode1.addChild(childNode12);

// childNode2.addChild(childNode21);
// childNode2.addChild(childNode22);

// parentNode.addChild(childNode1);
// parentNode.addChild(childNode2);

// console.log(parentNode.getElement());