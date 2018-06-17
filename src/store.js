import { getUniqueId, trimInnerHTML } from './helpers/common';
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
    let tree = {};
    let container;
    let content = {
      template: `<div style="width:30px;height:30px;border:1px solid black;border-radius:30px;overflow:hidden">
        <img alt="iTree_logo" src="http://via.placeholder.com/30x30" />
      </div>`,
      defaultValues: {},
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
      paint(this);
    };
    this.addNodeChild = (node, parent, repaint) => {
      const id = registerName(getUniqueId('nobj_'));
      nodeMap[id] = { node: node, parent };
      if (!nodeParentMap[parent]) nodeParentMap[parent] = [];
      nodeParentMap[parent].push(id);
      if (repaint) this.repaint();
      return id;
    };

    const removeChildren = (parent) => {
      delete nodeMap[parent];
      if (nodeParentMap[parent]) nodeParentMap[parent].forEach((child) => {
        removeChildren(child);
      });
      delete nodeParentMap[parent];
    };

    this.removeNodeChild = (id, repaint) => {
      const parentId = nodeMap[id].parent;
      const index = nodeParentMap[parentId].indexOf(id);
      if (index > -1) nodeParentMap[parentId].splice(index, 1);
      if (nodeParentMap[parentId].length === 0) delete nodeParentMap[parentId];
      removeChildren(id);
      if (repaint) this.repaint();
    };
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

    this.register = (key, value, update) => {
      if (update && !registered) console.error(`Store[name='${name}'] is not registered with any config yet, you can't update store without registering it`);
      else {
        registered = true;
        switch (key) {
          // jshint ignore:start
          case 'tree':
            nodeMap = {};
            nodeParentMap = {};
            normalizeNode(value, 'root');
            console.log('parentMap::', nodeParentMap);
            console.log('nodeMap::', nodeMap);
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
          default:
            console.error(`Invalide register key '${key}'`);
          // jshint ignore:end
        }
      }
    };
  };
})();

export default Store;