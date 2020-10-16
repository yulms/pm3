import { isEscapePressEvent } from './util.js';


const OVERLAY_SELECTOR = 'overlay';
const DISABLE_SCROLLING_CLASS = 'header__top-menu-disable-scrolling';


class HeaderTopMenu {
  constructor({menuOpenSelector, menuSelector, openedMenuClass}) {
    this._menuSelector = menuSelector;
    this._openedMenuClass = openedMenuClass;
    this._menuOpenButtonElement = document.querySelector(menuOpenSelector);
    this._menuElement = document.querySelector(menuSelector);
    this._menuOpenButtonElement.addEventListener('click', this._showMenu.bind(this));
  }

  _showMenu(evt) {
    const addOverlay = () => {
      this._overlayElement = document.createElement('div');
      this._overlayElement.classList.add(OVERLAY_SELECTOR);
      this._menuElement.before(this._overlayElement);
    };

    const addOpenClass = () => {
      this._menuElement.classList.add(this._openedMenuClass);
    };

    const addHandlers = () => {
      this._onOverlayClick = () => {
        this._hideMenu();
      };

      this._onDocumentKeydown = (evt) => {
        isEscapePressEvent(evt, this._hideMenu.bind(this));
      };

      this._overlayElement.addEventListener('click', this._onOverlayClick);
      document.addEventListener('keydown', this._onDocumentKeydown);
    };

    const blockPageScrolling = () => {
      document.body.classList.add(DISABLE_SCROLLING_CLASS);
    };


    evt.preventDefault();
    addOverlay();
    addOpenClass();
    addHandlers();
    blockPageScrolling();
  }

  _hideMenu() {
    const removeOverlay = () => this._overlayElement.remove();

    const removeOpenClass = () => this._menuElement.classList.remove(this._openedMenuClass);

    const removeHandlers = () => {
      this._overlayElement.removeEventListener('click', this._onOverlayClick);
      document.removeEventListener('keydown', this._onDocumentKeydown);
    };

    const unblockPageScrolling = () => {
      document.body.classList.remove(DISABLE_SCROLLING_CLASS);
    };


    removeOverlay();
    removeOpenClass();
    removeHandlers();
    unblockPageScrolling();
  }
}



function initHeaderTopMenu() {
  const headerTopMenuArgs = {
    menuOpenSelector: '.header__burger',
    menuSelector: '.header__top-menu',
    openedMenuClass: 'header__top-menu--isopened'
  };

  return new HeaderTopMenu(headerTopMenuArgs);
}

export default initHeaderTopMenu;
