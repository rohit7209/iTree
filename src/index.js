import './css/index.css';
import { NODE_POSITION } from './helpers/constants';
import Node from './node';
import Store from './store';

/**
 * 
 * @param {*} id 
 * @param {*} store 
 */
const renderNode = (id, store) => {
  const node = new Node(store.getNodeMap()[id].node, id, store);
  // console.log('node', node);
  const childList = store.getNodeParentMap()[id];
  if (childList) childList.forEach((childId, index) => {
    let position;
    if (id === 'root') position = NODE_POSITION.ROOT;
    else if (index === 0) position = (childList.length === 1) ? NODE_POSITION.ONLY : NODE_POSITION.FIRST;
    else if (index === childList.length - 1) position = NODE_POSITION.LAST;
    else position = NODE_POSITION.MIDDLE;
    node.addChild(renderNode(childId, store), position);
  });
  return node;
};

export const paint = (store) => {
  store.getContainer().innerHTML = '';
  store.getContainer().appendChild((renderNode(store.getNodeParentMap().root[0], store).getElement()));
}

/**
 * register entry function in window and instantiate a store for current object instance of iTree
 * user can instantiate multiple objects of iTree and all have their own store
 */
((window) => {
  'use strict';
  window.iTree = function (container) {
    /**
     * 'store' manage (store and manipulate and provide) all the required information related to tree
     */
    const store = new Store();

    /**
     * it is the main function to draw tree in the provided container while instantiating this object
     * the method will rewrite the container if called twice or more with different tree (json object)
     * @param {*} tree json object for the tree to be drawn
     */
    this.draw = (tree) => {
      store.register('tree', tree, false);
      store.register('container', container, false);
      paint(store, true);
    };

    /**
     * registers the config
     * it's compulsory to register configs before drawing
     * we can register only once (multiple register not allowed)
     * @param {*} registerConfigs configs to be registered
     */
    this.register = (registerConfigs) => {
      if (!store.isRegistered())
        Object.keys(registerConfigs).forEach(key => {
          store.register(key, registerConfigs[key]);
        });
      else console.error('Registration after draw or Multiple registration not allowed!');
      //console.log(store.getStore());
    };
  };
})(window);

/**
 * 
const addNext = (props, id, position, store) => {
  const node = new Node(props, position, store, this);
  //node.addContent(props.content);
  if (typeof props.children === 'object') {
    Object.keys(props.children).forEach((key, index) => {
      let childProps = props.children[key];
      let position;
      if (index === 0) position = (Object.keys(props.children).length === 1) ? NODE_POSITION.ONLY : NODE_POSITION.FIRST;
      else if (index === Object.keys(props.children).length - 1) position = NODE_POSITION.LAST;
      else position = NODE_POSITION.MIDDLE;
      node.addChild(addNext(childProps, key, position, store));
    });
  }
  return node;
};
 */