
import { NODE_POSITION } from './constants';

export const creatChildrenList = () => {
  const element = document.createElement('div');
  element.setAttribute('class', '_iTree_children-list');
  return element;
}

export const createNodeLabel = () => {
  const element = document.createElement('div');
  element.setAttribute('class', '_iTree_node-label');
  return element;
}

export const createBody = () => {
  const element = document.createElement('div');
  element.setAttribute('class', '_iTree_node');
  return element;
}

export const createBottomHook = () => {
  const element = document.createElement('div');
  element.setAttribute('class', '_iTree_arrow-holder');
  element.innerHTML = `<div style="margin:auto;width:2px; height:5px; background:black"></div>`;
  return element;
}

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
}