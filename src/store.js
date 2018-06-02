const Store = function Store() {
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
    return config;
  };

  this.isRegistered = () => {
    return registered;
  }

  this.getStore = () => {
    return { tree, template, config, registered };
  }

  this.register = (key, config) => {
    registered = true;
    switch (key) {
      case 'tree':
        tree = { ...config };
        break;
      case 'nodeTemplate':
        template = { ...config };
        break;
      case 'config':
        config = { ...config };
        break;
      default:
        console.error('Invalide register key');
    }
  };
}

export default Store;