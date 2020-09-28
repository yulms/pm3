import Modal from './_modal.js';

function initModals() {
  const modalContactsArgs = {
    openButtonSelector: '.header__contacts-button',
    modalSelector: '.header__contacts'
  };

  const modalUserArgs = {
    openButtonSelector: '.header__user .header__link',
    modalSelector: '.header__user'
  };

  const modalCartArgs = {
    openButtonSelector: '.header__cart .header__link',
    modalSelector: '.header__cart'
  };

  new Modal(modalContactsArgs);
  new Modal(modalUserArgs);
  new Modal(modalCartArgs);
}

initModals();



import * as quantityInput from './_quantity-input.js';
quantityInput.init();

import * as headerTopMenu from './_header__top-menu.js';
headerTopMenu.init();
