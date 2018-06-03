import { getUniqueId, trimInnerHTML } from './helpers/common';

const Store = (() => {
  const nameList = [];
  const registerName = (name) => {
    if (nameList.includes(name)) registerName(name + getUniqueId());
    else nameList.push(name);
    return name;
  };

  /**
   * store constructor
   * @param {string} storeName optional, used to set the name of store
   */
  return function Store(storeName = getUniqueId()) {
    const name = registerName(storeName);
    let tree = {};
    let content={
      template : `<div style="width:30px;height:30px;border:1px solid black;border-radius:30px;overflow:hidden">
        <img alt="iTree_logo" src="http://via.placeholder.com/30x30" />
      </div>`,
      defaultValues:{},
    };
    let config = {};
    let registered = false;

    this.getTree = () => {
      return tree;
    };

    this.getContent = () => {
      return content;
    };

    this.getConfig = () => {
      //console.log('return', config)
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
        registered
      };
    };

    this.register = (key, value, update) => {
      if (update && !registered) console.error(`Store[name='${name}'] is not registered with any config yet, you can't update store without registering it`);
      else {
        registered = true;
        switch (key) {
          // jshint ignore:start
          case 'tree':
            tree = (update) ? { ...tree, ...value } : { ...value };
            break;
          case 'content':
            content = { ...content, ...value };
            break;
          case 'config':
            config = (update) ? { ...config, ...value } : { ...value };
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