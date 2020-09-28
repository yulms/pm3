import { isEscapePressEvent } from './util.js';

const OVERLAY_SELECTOR = 'overlay';
const MENU_OPEN_SELECTOR = '.header__burger';
const MENU_SELECTOR = '.header__top-menu';


export function init() {
  const menuOpenButtonElement = document.querySelector(MENU_OPEN_SELECTOR);
  const menuElement = document.querySelector(MENU_SELECTOR);

  menuOpenButtonElement.addEventListener('click', onMenuOpenButtonClick.bind(null, menuElement));
}


function onMenuOpenButtonClick(menuElement, evt) {

  function addOverlay() {
    let overlayElement = document.createElement('div');
    overlayElement.classList.add(OVERLAY_SELECTOR);
    menuElement.before(overlayElement);
    menuElement.overlayElement = overlayElement;
  }

  function addOpenClass() {
    menuElement.classList.add('header__top-menu--isopened');
  }

  function addHandlers() {
    menuElement.onOverlayClick = function () {
      closeMenu(menuElement);
    };

    menuElement.onDocumentKeydown = function(evt) {
      isEscapePressEvent(evt, closeMenu.bind(null, menuElement));
    };

    menuElement.overlayElement.addEventListener('click', menuElement.onOverlayClick);
    document.addEventListener('keydown', menuElement.onDocumentKeydown);
  }


  evt.preventDefault();
  addOverlay();
  addOpenClass();
  addHandlers();
}


function closeMenu(menuElement) {
  function removeOverlay() {
    menuElement.overlayElement.remove();
  }

  function removeOpenClass() {
    menuElement.classList.remove('header__top-menu--isopened');
  }

  function removeHandlers() {
    menuElement.overlayElement.removeEventListener('click', menuElement.onOverlayClick);
    document.removeEventListener('keydown', menuElement.onDocumentKeydown);
  }

  removeOverlay();
  removeOpenClass();
  removeHandlers();
}
