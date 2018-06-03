import { getUniqueId } from './helpers/common';
const Store = (() => {

  const nameList = [];

  const registerName = (name) => {
    if (nameList.includes(name)) registerName(name + getUniqueId());
    else nameList.push(name);
    return name;
  };

  return function Store(storeName = getUniqueId()) {
    const name = registerName(storeName);
    let tree = {};
    let template = {};
    let config = {};
    let registered = false;

    this.getTree = () => {
      return tree;
    };

    this.getTemplate = () => {
      return template;
    };

    this.getConfig = () => {
      console.log('return', config)
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
        template,
        config,
        registered
      };
    };

    this.register = (key, config) => {
      registered = true;
      switch (key) {
        // jshint ignore:start
        case 'tree':
          tree = { ...config };
          break;
        case 'nodeTemplate':
          template = { ...config };
          break;
        case 'config':
          config = { ...config };
          console.log(config);
          break;
        default:
          console.error(`Invalide register key '${key}'`);
        // jshint ignore:end
      }
    };
  }
})();

export default Store;