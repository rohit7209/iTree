
import { NODE_POSITION } from './constants';
import { trimInnerHTML } from './common';

export const creatChildrenList = () => {
  const element = document.createElement('div');
  element.setAttribute('class', '_iTree_children-list');
  return element;
};

/**
 * 
 * @param {object || string} content //content of the label
 * @param {object} store //store reference
 */
export const createNodeLabel = (content, store) => {
  const element = document.createElement('div');
  element.setAttribute('class', '_iTree_node-label');

  // this block checks whether content is 'string' or object
  if (typeof content === 'string') element.innerHTML = trimInnerHTML(content);
  else if (typeof content === 'object') {
    // if template is set by user in content object or pick default template from store (default template can be set by user by registering the store)
    let label = content.template || store.getContent().template;
    /*jshint ignore:start */
    //get default values from store and update fields present in content values
    const values = { ...store.getContent().defaultValues, ...(content.values || {}) };
    /*jshint ignore:end */
    // checks for each value of the content values and update the template with the values
    Object.keys(values).forEach(key => {
      label = label.replace(new RegExp(`{{${key}}}`, 'g'), values[key]);
    });
    element.innerHTML = trimInnerHTML(label);
  }
  //setting the margin of label to keep in center
  element.lastChild.style.marginLeft = 'auto';
  element.lastChild.style.marginRight = 'auto';
  return element;
};

export const createBody = () => {
  const element = document.createElement('div');
  element.setAttribute('class', '_iTree_node');
  return element;
};

export const createBottomHook = () => {
  const element = document.createElement('div');
  element.setAttribute('class', '_iTree_arrow-holder');
  element.innerHTML = `<div style="margin:auto;width:2px; height:5px; background:black"></div>`;
  return element;
};

export const createTopHook = (position) => {
  let element;
  if (position === NODE_POSITION.ROOT) {
    element = document.createElement('span');
  } else {

    let className;
    if (position === NODE_POSITION.FIRST) className = '_iTree_top-hook--left';
    else if (position === NODE_POSITION.LAST) className = '_iTree_top-hook--right';
    else if (position === NODE_POSITION.MIDDLE) className = '_iTree_top-hook--middle';
    else className = '_iTree_top-hook--only';

    element = document.createElement('div');
    element.setAttribute('class', className);
    element.innerHTML = `<div></div><div></div>`;
  }

  return element;
};
