
import { NODE_POSITION } from './constants';
import { trimInnerHTML, getUniqueId } from './common';

//function to create element and style it
const styled = (tag) => {
  const element = document.createElement(tag);
  /**
   * @param {object} style css in js styles for the element
   * @param {string} className optional, class to be added in the element
   */
  return (style, className, child) => {
    if (className) element.className = className;
    if (style) Object.keys(style).forEach((key) => {
      element.style[key] = style[key];
    });
    if (child) {
      if (typeof child === 'string') element.innerHTML = child
      else if (child instanceof HTMLElement) element.appendChild(child)
    }
    return element;
  };
};

export const creatChildrenList = () => {
  const element = document.createElement('div');
  element.setAttribute('class', '_iTree_children-list');
  return element;
};

const createPopup = (store, values) => {
  const popupConfig = store.getPopupConfig();

  const pointer = styled('div')({}, '_iTree_popup-pointer');

  const node = document.createElement('div');
  node.innerHTML = 'rohit';

  // jshint ignore:start
  const popup = styled('div')({
    width: popupConfig.width + 'px',
    height: popupConfig.height + 'px',
    border: `1px solid ${popupConfig.color}`,
    ...(popupConfig.style || {})
  }, '_iTree_popup', buildContent(popupConfig.template, values));
  // jshint ignore:end

  popup.appendChild(pointer);
  return store.addPopup(popup);
};

const showPopup = (element, store) => {
  //getting popup from store
  const popup = store.getPopup(element.popupId);
  const pointer = popup.lastChild;

  // adding popup to body to display it
  window.document.body.appendChild(popup);
  const popupConfig = store.getPopupConfig();
  const popupWidth = popupConfig.width;
  const popupHeight = popupConfig.height;

  element.addEventListener('mousemove', (e) => {
    // console.log(innerWidth, innerHeight);
    
    let top = e.clientY + 25;
    let left = e.clientX - popupWidth / 2;
    let pointerTop = -16;
    let pointerBorderBottomColor = popupConfig.color;
    let pointerBorderTopColor = 'transparent';
    let animationClass = '_iTree_popup-slide-bottom';
    if (left < 0) left = 0;


    if (innerWidth - left < popupWidth) left = innerWidth - popupWidth;
    if (innerHeight - top < popupHeight || popupConfig.position === 'top') {
      //updating pointer styles
      pointerBorderBottomColor = 'transparent';
      pointerBorderTopColor = popupConfig.color;
      pointerTop = popupHeight;
      //updating popup style
      top = top - popupHeight - 45;
      animationClass = '_iTree_popup-slide-top';
    }

    // updating popup styles
    popup.style.top = top + 'px';
    popup.style.left = left + 'px';
    popup.className = '_iTree_popup ' + animationClass;
    
    // these lines moves pointer of the popup to keep the pointer at cursor tip
    pointer.style.left = e.clientX - left - 7 + 'px';
    pointer.style.top = pointerTop + 'px';
    pointer.style['border-bottom-color'] = pointerBorderBottomColor;
    pointer.style['border-top-color'] = pointerBorderTopColor;
  });
};

const hidePopup = (element, store) => {
  element.removeEventListener('mousemove', e => { });
  window.document.body.removeChild(store.getPopup(element.popupId));
};

const addPopup = (element, store) => {
  element.addEventListener("mouseover", function (event) {
    showPopup(this, store);
  }, false);
  element.addEventListener("mouseout", function (event) {
    const hoveredElement = document.elementFromPoint(event.clientX, event.clientY);
    if (!this.contains(hoveredElement)) {
      hidePopup(element, store);
    }
  }, false);
};

const buildContent = (template, values) => {
  Object.keys(values).forEach(key => {
    template = template.replace(new RegExp(`{{${key}}}`, 'g'), values[key]);
  });
  return template;
};

/**
 * creates node and label for the node
 * @param {object || string} content //content of the label
 * @param {object} store //store reference
 * @returns {DOM element} //node with label
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
    label = buildContent(label, values);
    element.innerHTML = trimInnerHTML(label);

    //adding popup to the element
    //console.log(values);
    element.lastChild.popupId = createPopup(store, values);
    console.log('popId', element.lastChild.popupId);
    addPopup(element.lastChild, store);
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
