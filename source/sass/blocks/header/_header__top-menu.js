import { isEscapePressEvent, scrollLock, executeAfterAnimationEnd } from './util.js';


const OVERLAY_CLASS = 'overlay';
const OVERLAY_ELEMENT_CLASS = 'header__top-menu-overlay';
const ANIMATION_ON_CLOSE_CLASS = 'header__top-menu--animation-on-close';
const ANIMATION_ON_CLOSE_NAME = 'hide-header__top-menu';

class HeaderTopMenu {
  constructor({menuOpenSelector, menuSelector, openedMenuClass}) {
    this._menuSelector = menuSelector;
    this._openedMenuClass = openedMenuClass;
    this._menuOpenButtonElement = document.querySelector(menuOpenSelector);
    this._menuElement = document.querySelector(menuSelector);
    this._menuOpenButtonElement.addEventListener('click', this._showMenu.bind(this));
    this._stateIsOpened = false;
  }

  _showMenu(evt) {
    const addOverlay = () => {
      this._overlayElement = document.createElement('div');
      this._overlayElement.classList.add(OVERLAY_CLASS);
      this._overlayElement.classList.add(OVERLAY_ELEMENT_CLASS);
      this._menuElement.before(this._overlayElement);
    };

    const addOpenClass = () => {
      this._menuElement.classList.add(this._openedMenuClass);
    };

    const addHandlers = () => {
      this._onOverlayClick = () => {
        this._hideAfterAnimationEnd();
      };

      this._onDocumentKeydown = (evt) => {
        isEscapePressEvent(evt, this._hideAfterAnimationEnd.bind(this));
      };

      this._overlayElement.addEventListener('click', this._onOverlayClick);
      document.addEventListener('keydown', this._onDocumentKeydown);
    };


    evt.preventDefault();
    this._stateIsOpened = true;
    addOverlay();
    addOpenClass();
    this._toggleAriaAttributes();
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


    this._stateIsOpened = false;
    removeOverlay();
    removeOpenClass();
    this._toggleAriaAttributes();
    removeHandlers();
    scrollLock({lock: false});
  }

  _hideAfterAnimationEnd() {
    executeAfterAnimationEnd(
      {
        element: this._menuElement.parentNode,
        animationClass: ANIMATION_ON_CLOSE_CLASS,
        animationName: ANIMATION_ON_CLOSE_NAME,
        callback: this._hideMenu.bind(this)
      });
  }


  _toggleAriaAttributes() {
    this._menuOpenButtonElement.setAttribute('aria-expanded', this._stateIsOpened);
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
