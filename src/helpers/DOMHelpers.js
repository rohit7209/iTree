
import { NODE_POSITION, ACTIONS, ICONS, FLAGS } from './constants';
import {
  trimInnerHTML,
  getUniqueId,
  camelToHyphenCase,
} from './common';



//function to create element and style it
const styled = (tag) => {
  const element = document.createElement(tag);
  const appendChild = (element, child, append) => {
    if (typeof child === 'string') if (append) element.innerHTML += child; else element.innerHTML = child;
    else if (child instanceof HTMLElement) if (append) element.appendChild(child); else { element.innerHTML = ''; element.appendChild(child); }
  };
  /**
   * @param {object} style css in js styles for the element
   * @param {string} className optional, class to be added in the element
   */
  return (child, className, attributes, style) => {
    if (typeof className === 'string') element.className = className;
    if (typeof style === 'object') Object.keys(style).forEach((key) => {
      element.style[camelToHyphenCase(key)] = style[key];
    });
    if (child) {
      if (Array.isArray(child)) child.forEach((item) => { appendChild(element, item, true); });
      else appendChild(element, child);
    }
    if (typeof attributes === 'object') Object.keys(attributes).forEach((key) => {
      element.setAttribute(camelToHyphenCase(key), attributes[key]);
    });
    return element;
  };
};

export const creatChildrenList = () => {
  const element = document.createElement('div');
  element.setAttribute('class', '_iTree_children-list');
  return element;
};

const createPopup = (store, values, id) => {
  const popupConfig = store.getPopupConfig();

  // jshint ignore:start
  const popup = styled('div')(buildContent(popupConfig.template, values, store, id), '_iTree_popup', {}, {
    width: popupConfig.width + 'px',
    height: popupConfig.height + 'px',
    border: `1px solid ${popupConfig.color}`,
    ...(popupConfig.style || {})
  });
  // jshint ignore:end

  const pointer = styled('div')('', '_iTree_popup-pointer');
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

const buildContent = (template, values, store, id) => {
  Object.keys(values).forEach(key => {
    template = template.replace(new RegExp(`{{${key}}}`, 'g'), (typeof values[key] === "function" && values[key].name === "id") ? values[key](store.getClientNodeId(id)) : values[key]);
  });
  return template;
};

/**
 * creates node and label for the node
 * @param {object || string} content //content of the label
 * @param {object} store //store reference
 * @returns {DOM element} //node with label
 */
export const createNodeLabel = (content, store, id) => {
  const element = styled('div')(null, '_iTree_node-label');

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
    label = buildContent(label, values, store, id);
    element.innerHTML = trimInnerHTML(label);

    //adding popup to the element
    if (store.getPopupConfig().showPopup) {
      element.lastChild.popupId = createPopup(store, values, id);
      addPopup(element.lastChild, store);
    }
  }
  //setting the margin of label to keep in center
  element.lastChild.style.marginLeft = 'auto';
  element.lastChild.style.marginRight = 'auto';

  if (store.editable) element.lastChild.appendChild(createNodeTools(id, store));

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



const confirm = (args) => {
  const actionButtons = args.actions.map((action) => {
    const btn = styled('button')(action[0], (action[2]) ? '_iTree_btn' : '_iTree_btn_alt');
    btn.onclick = () => {
      action[1]();
      window.document.body.removeChild(confirmDialogue);
    };
    return btn;
  });
  const content = styled('div')([
    styled('span')(ICONS.WARN, '_iTree_icon'),
    '<br/>',
    styled('span')(args.text),
    '<br/>',
    styled('div')(actionButtons, '_iTree_dialogue-actions'),
  ], '_iTree_centerContent');
  const dialogue = styled('div')(styled('div')(content, '_iTree_centerInner'), '_iTree_centerOuter _iTree_dialogue');
  const confirmDialogue = styled('div')(styled('div')(styled('div')(dialogue, '_iTree_centerContent', { style: "text-align:center" }), '_iTree_centerInner'), '_iTree_centerOuter _iTree_confirm');
  document.body.appendChild(confirmDialogue);
};

/**
 * 
 * @param {object} args 
 */
const collectInfo = (args) => {
  const defaultValues = args.store.getContent().defaultValues;
  const inputFields = {};
  const allowedTypes = ["string", "number", "boolean"];

  const values = args.purpose === FLAGS.UPDATE && args.store.getNodeMap()[args.id].node.content ? args.store.getNodeMap()[args.id].node.content.values : {};

  Object.keys(defaultValues).forEach(key => {
    if (allowedTypes.includes(typeof defaultValues[key])) {
      const input = styled('input')(null, '_iTree_input_text', { id: `_iTree_input_${key}`, type: 'text', value: values[key] || '' });
      inputFields[key] = input;
    };
  });

  const actionButtons = args.actions.map((action) => {
    const btn = styled('button')(action[0], (action[2]) ? '_iTree_btn' : '_iTree_btn_alt');
    btn.onclick = () => {
      const values = {};
      Object.keys(inputFields).forEach(key => {
        if (inputFields[key].value) values[key] = inputFields[key].value;
      });
      action[1](values);
      window.document.body.removeChild(collectDialogue);
    };
    return btn;
  });



  const content = styled('div')([
    styled('span')(args.purpose === FLAGS.UPDATE ? ICONS.EDIT : ICONS.ADD, '_iTree_icon'),
    styled('div')(
      (Object.keys(inputFields).length === 0) ? (FLAGS.UPDATE === args.purpose) ? '<br/>Nothing to update<br/><br/>' : '<br/>A new node will be added, no field required.<br/><br/>' : Object.keys(inputFields).map(key => styled('div')([`${key}:<br/>`, inputFields[key]], '_iTree_input_field_container'))
      , '_iTree_collect_info_body'),
    styled('div')(actionButtons, '_iTree_dialogue-actions'),
  ], '_iTree_centerContent');

  const dialogue = styled('div')(styled('div')(content, '_iTree_centerInner'), '_iTree_centerOuter _iTree_dialogue');
  const collectDialogue = styled('div')(styled('div')(styled('div')(dialogue, '_iTree_centerContent', { style: "text-align:center" }), '_iTree_centerInner'), '_iTree_centerOuter _iTree_confirm');

  document.body.appendChild(collectDialogue);
}

export const createNodeTools = (id, store) => {
  const tools = styled('span')(null, '');

  // creating add button
  const addBtn = styled('span')(ICONS.ADD, '_iTree_tools-add', { title: 'add child ' + id, dataNodeId: id });
  addBtn.addEventListener('click', (e) => {
    collectInfo({
      purpose: FLAGS.ADD,
      text: "We are adding a new node!",
      actions: [
        [ACTIONS.CANCEL, (e) => { }, false],
        [ACTIONS.ADD, (values) => { store.addNodeChild({ content: { values } }, e.target.dataset.nodeId, true); store.exportTree(); }, true],
      ],
      store,
      id,
    });
  });

  //creating remove button
  const removeBtn = styled('span')(ICONS.REMOVE, '_iTree_tools-remove', { title: 'remove from tree', dataNodeId: id });
  removeBtn.addEventListener('click', (e) => {
    const id = e.target.dataset.nodeId;
    // if (window.confirm("Are you sure, you want to delete all the children and the current node?")) {
    if (store.getParent(id) !== 'root') confirm({
      text: "Are you sure you want to delete node and its children?",
      actions: [
        [ACTIONS.CANCEL, (e) => { }, false],
        [ACTIONS.REMOVE, (e) => {
          store.removeNodeChild(id, true);
          store.exportTree();
        }, true],
      ],
    });
    else confirm({
      text: "You can't delete root node!",
      actions: [
        [ACTIONS.OK, (e) => { }, true],
      ],
    });
  });


  //creating edit button
  const editBtn = styled('span')(ICONS.EDIT, '_iTree_tools-edit', { title: 'edit node values', dataNodeId: id });
  editBtn.addEventListener('click', (e) => {
    collectInfo({
      purpose: FLAGS.UPDATE,
      text: "Editing the node!",
      actions: [
        [ACTIONS.CANCEL, (e) => { }, false],
        [ACTIONS.UPDATE, (values) => { store.updateNodeValues(id, values); store.exportTree(); }, true],
      ],
      store,
      id,
    });
  });

  // appending buttons to tools
  tools.appendChild(addBtn);
  tools.appendChild(editBtn);
  tools.appendChild(removeBtn);

  return styled('div')(tools, '_iTree_tools');
};
