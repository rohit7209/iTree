'use strict';

import './css/index.css';
import { NODE_POSITION } from './helpers/constants';
import Node from './node';
import Store from './store';

/**
 * iterative function to add children in next level and so on
 * @param {*} props properties of node (name, properties, className, children etc.)
 * @param {*} position position of node to placed in the tree (first, last, middle or the only node)
 */
const addNext = (props, position) => {
  const node = new Node(props, position);
  node.addContent(props.content);
  if (Array.isArray(props.children)) {
    props.children.forEach((childProps, index) => {
      let position;
      if (index === 0) position = (props.children.length === 1) ? NODE_POSITION.ONLY : NODE_POSITION.FIRST;
      else if (index === props.children.length - 1) position = NODE_POSITION.LAST;
      else position = NODE_POSITION.MIDDLE;
      node.addChild(addNext(childProps, position));
    })
  }
  return node
}

/**
 * register entry function in window and instantiate a store for current object instance of iTree
 * user can instantiate multiple objects of iTree and all have their own store
 */
((window) => {
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
      store.register('tree', tree);
      container.innerHTML = '';
      container.appendChild(addNext(store.getTree(), NODE_POSITION.ROOT).getElement());
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
    }
  }
})(window)

      // console.log('printing node info')
      // console.log(store);
      // console.log(store.getConfig());
      // console.log(store.getTemplate());
      // console.log(store.getTree());