import Add from './helpers';

const Node = function (props) {
  const body = '<div></div>';
}

const addChild = (parent, body) => {

  if (Array.isArray(parent.children)) {
    parent.children.forEach(child => {
      body += '*' + addChild(child, '');
    });
  } else {
    body += ',' + parent.name
  }
  return body;
}

(() => {
  window.iTree = function (container) {
    this.draw = (config) => {
      console.log(config, container);

      container.innerHTML = '<button></button>'

      const node = new Node('abcd');
      console.log(node.name, node.myName);

      const t = addChild(config, '');
      console.log(t);
    };
  }
})()