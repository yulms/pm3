import initHeaderTopMenu from './_header__top-menu.js';
import initModals from './_modal.js';
import initQuantityInput from './_quantity-input.js';
import initTooltips from './_tooltip.js';
import initTextfields from './_textfield.js';
import initCustomSelects from './_custom-select.js';
import initRipple from './_ripple.js';


const projectObjects = { // eslint-disable-line
  headerTopMenu: initHeaderTopMenu(),
  modals: initModals(),
  quantityInput: initQuantityInput(),
  toolTips: initTooltips(),
  textfields: initTextfields(),
  customSelects: initCustomSelects(),
  ripple: initRipple()
};

console.log(projectObjects);
