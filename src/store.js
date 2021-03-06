import { getUniqueId, trimInnerHTML, beautifyTree } from './helpers/common';
import { paint } from './index';
import Node from './node';

const Store = (() => {
  const nameList = [];
  let uId = 0;
  const registerName = (name) => {
    while (nameList.includes(name)) {
      name = getUniqueId(uId++);
    }
    nameList.push(name);
    return name;
  };

  /**
   * store constructor
   * @param {string} storeName optional, used to set the name of store
   */
  return function Store(storeName = getUniqueId()) {
    const name = registerName(storeName);
    let clientNodeId = 0;
    let tree = {};
    let container;
    let onChange;
    let editable = false;
    let content = {
      template: `<div class="_iTree_default_node">{{id}}</div>`,
      defaultValues: {
        id: (id) => id,
      },
    };
    let config = {};
    let registered = false;

    let popupConfig = {
      height: 100,
      width: 200,
      color: 'grey',
      position: 'top',
      template: `<div style="padding:5px; background:white"></div>`,
    };
    const popupStore = {};

    // node details
    let nodeMap = {};

    // child-parent relationship
    let nodeParentMap = {};

    const normalizeNode = (node, parent) => {
      const id = this.addNodeChild(node, parent);
      if (Array.isArray(node.children)) node.children.forEach((child) => {
        normalizeNode(child, id);
      });
    };

    this.repaint = () => {
      // clientNodeId=0;
      paint(this);
    };



    this.updateNodeValues = (id, values) => {
      nodeMap[id].node.content = { values };
      this.repaint();
    };

    /**
     * add a new node when requested  and repaints
     * @param {*} node 
     * @param {*} parent 
     * @param {*} repaint 
     */
    this.addNodeChild = (node, parent, repaint) => {
      const id = registerName(getUniqueId('nobj_'));
      nodeMap[id] = { node: node, parent, id: ++clientNodeId };
      if (!nodeParentMap[parent]) nodeParentMap[parent] = [];
      nodeParentMap[parent].push(id);
      if (repaint) this.repaint();
      return id;
    };

    /**
     * removes the node and its children and repaints
     * @param {*} parent 
     */
    const removeChildren = (parent) => {
      delete nodeMap[parent];
      if (nodeParentMap[parent]) nodeParentMap[parent].forEach((child) => {
        removeChildren(child);
      });
      delete nodeParentMap[parent];
    };

    this.removeNodeChild = (id, repaint) => {
      const parentId = this.getParent(id);
      if (parentId !== 'root') {
        const index = nodeParentMap[parentId].indexOf(id);
        if (index > -1) nodeParentMap[parentId].splice(index, 1);
        if (nodeParentMap[parentId].length === 0) delete nodeParentMap[parentId];
        removeChildren(id);
        if (repaint) this.repaint();
      } else {
        console.error('You can\'t delete root node!');
      }
    };


    this.exportTree = () => {
      if (typeof onChange === "function") onChange(beautifyTree(nodeMap, nodeParentMap));
      else console.error('Error:', 'onChange is not registered or its not a function.');
    }

    this.getParent = (id) => {
      return nodeMap[id].parent;
    }
    this.registerName = (name) => {
      return registerName(name);
    };
    this.getPopupConfig = () => {
      return popupConfig;
    };
    this.addPopup = (popup) => {
      const id = registerName(getUniqueId('popup_'));
      popupStore[id] = popup;
      return id;
    };
    this.getPopupStore = () => {
      return popupStore;
    };
    this.getPopup = (id) => {
      return popupStore[id];
    };
    this.removePopup = (id) => {
      delete popupStore[id];
      return true;
    };
    this.getTree = () => {
      return tree;
    };
    this.getContent = () => {
      return content;
    };
    this.getConfig = () => {
      return config;
    };
    this.isRegistered = () => {
      return registered;
    };
    this.getStore = () => {
      return {
        info: {
          name
        },
        tree,
        content,
        config,
        popupConfig,
        registered
      };
    };
    this.getContainer = () => {
      return container;
    };
    this.getNodeParentMap = () => {
      return nodeParentMap;
    };
    this.getNodeMap = () => {
      return nodeMap;
    };

    this.getClientNodeId = (id) => {
      // console.log('id:',clientNodeId, nodeMap);
      return nodeMap[id].id;
    };

    this.register = (key, value, update) => {
      if (update && !registered) console.error(`Store[name='${name}'] is not registered with any config yet, you can't update store without registering it`);
      else {
        registered = true;
        switch (key) {
          // jshint ignore:start
          case 'editable':
            this.editable = value;
            break;
          case 'tree':
            nodeMap = {};
            nodeParentMap = {};
            normalizeNode(value, 'root');
            // console.log('parentMap::', JSON.stringify(nodeParentMap));
            // console.log('nodeMap::', JSON.stringify(nodeMap));
            // console.log('val::', value);
            break;
          case 'container':
            container = value;
          case 'content':
            content = { ...content, ...value };
            break;
          case 'config':
            config = (update) ? { ...config, ...value } : { ...value };
            break;
          case 'popupConfig':
            if (value.style) {
              if (value.style.width) value.width = value.style.width;
              if (value.style.height) value.height = value.style.height;
              delete value.style.width;
              delete value.style.height;
            }
            if (value.width) value.width = value.width.split('px')[0];
            if (value.height) value.height = value.height.split('px')[0];
            popupConfig = { ...popupConfig, ...value, showPopup: true };
            break;
          case 'onChange':
            onChange = value;
            break;
          default:
            console.error(`Invalide register key '${key}'`);
          // jshint ignore:end
        }
      }
    };
  };
})();

export default Store;