import { isEscapePressEvent, scrollLock } from './util.js';


const OVERLAY_SELECTOR = 'overlay';


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


    evt.preventDefault();
    addOverlay();
    addOpenClass();
    addHandlers();
    scrollLock({lock: true});
  }

  _hideMenu() {
    const removeOverlay = () => this._overlayElement.remove();

    const removeOpenClass = () => this._menuElement.classList.remove(this._openedMenuClass);

    const removeHandlers = () => {
      this._overlayElement.removeEventListener('click', this._onOverlayClick);
      document.removeEventListener('keydown', this._onDocumentKeydown);
    };


    removeOverlay();
    removeOpenClass();
    removeHandlers();
    scrollLock({lock: false});
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
