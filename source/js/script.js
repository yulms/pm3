import Modal from './_modal.js';
import HeaderTopMenu from './_header__top-menu.js';
import * as quantityInput from './_quantity-input.js';
import MainNav from './_main-nav.js';


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

function initHeaderTopMenu() {
  const headerTopMenuArgs = {
    menuOpenSelector: '.header__burger',
    menuSelector: '.header__top-menu',
    openedMenuClass: 'header__top-menu--isopened'
  };

  new HeaderTopMenu(headerTopMenuArgs);
}

function initMainNav() {
  new MainNav();
}


initHeaderTopMenu();
initModals();
quantityInput.init();
initMainNav();
