'use sctipt';

const MENU_SELECTOR = '.main-nav';
const CLOSE_BUTTON_CONTAINER_SELECTOR = '.main-nav__close-container1';
const CLOSE_BUTTON_CONTAINER_CLOSED_CLASS = 'main-nav__close-container1--closed';
const MENU_LIST_SELECTOR = '.main-nav__list';
const OVERLAY_SELECTOR = 'overlay';


const NAV_LIST_SELECTOR = '.main-nav__list--lvl1';



class MainNav {
  constructor() {
    this._menuElement = document.querySelector(MENU_SELECTOR);
    this._menuListElement = this._menuElement.querySelector(MENU_LIST_SELECTOR);
    this._closeNavButtonContainerElement = this._menuElement.querySelector(CLOSE_BUTTON_CONTAINER_SELECTOR);
    this._mainNavListElement = this._menuElement.querySelector(NAV_LIST_SELECTOR);

    this._showMenuEvent = new CustomEvent('showMenu');
    this._hideMenuEvent = new CustomEvent('hideMenu');
    this._menuElement.addEventListener('showMenu', this._showMenu.bind(this));
    this._menuElement.addEventListener('hideMenu', this._hideMenu.bind(this));
  }


  init() {
    const onMenuMouseenter = () => {
      this._menuElement.dispatchEvent(this._showMenuEvent);
    };

    const onMenuMouseleave = () => {
      this._menuElement.dispatchEvent(this._hideMenuEvent);
    };

    const onMenuFocusin = () => {
      console.log('focusin');
      this._menuElement.dispatchEvent(this._showMenuEvent);
    };

    const onMenuFocusout = () => {
      console.log('focusout');
      this._menuElement.dispatchEvent(this._hideMenuEvent);
    };

    // this._menuListElement.addEventListener('mouseenter', () => onMenuMouseenter());
    // this._menuListElement.addEventListener('mouseleave', () => onMenuMouseleave());

    this._menuListElement.addEventListener('focusin', () => onMenuFocusin());
    this._menuListElement.addEventListener('blur', () => onMenuFocusout());
  }


  _showMenu() {
    this._addOverlay();
    this._closeNavButtonContainerElement.classList.remove(CLOSE_BUTTON_CONTAINER_CLOSED_CLASS);
  }

  _hideMenu() {
    const unFocus = () => {
      let focusedItem = document.querySelector(':focus');
      if (focusedItem) {
        focusedItem.blur();
      }
    };
    unFocus();
    this._removeOverlay();
    this._closeNavButtonContainerElement.classList.add(CLOSE_BUTTON_CONTAINER_CLOSED_CLASS);
  }

  _addOverlay() {
    if (this._overlayElement) return;
    this._overlayElement = document.createElement('div');
    this._overlayElement.classList.add(OVERLAY_SELECTOR);
    document.body.prepend(this._overlayElement);
  }

  _removeOverlay() {
    this._overlayElement.remove();
    this._overlayElement = null;
  }
}








// class MainNav {
//   constructor() {
//     this._menuElement = document.querySelector(MENU_SELECTOR);
//     this._closeNavButtonElements = this._menuElement.querySelectorAll(CLOSE_BUTTON_SELECTOR);
//     this._menuListElement = this._menuElement.querySelector(MENU_LIST_SELECTOR);
//   }

//   init() {
//     const addCloseButtonHandlers = () => {
//       for (const element of this._closeNavButtonElements) {
//         // element.addEventListener('click', (evt) => this._closeMenu(evt));
//         element.addEventListener('click', (evt) => {
//           let closeEvent = new Event('mouseleave');
//           this._menuListElement.dispatchEvent(closeEvent);
//         });
//       }
//     };

//     const addOpenMenuHandlers = () => {

//       const onMenuTouchend = (evt) => {
//         // evt.preventDefault();
//         console.log('touch end');
//         this._showMenu();
//       };

//       const onMenuMouseenter = (evt) => {
//         console.log('mouse enter');
//         this._showMenu();
//       };

//       const onMenuMouseleave = (evt) => {
//         console.log('mouse leave');
//         this._closeMenu(evt);
//       };

//       // this._menuListElement.addEventListener('touchend', (evt) => onMenuTouchend(evt));
//       this._menuListElement.addEventListener('mouseenter', (evt) => onMenuMouseenter(evt));
//       this._menuListElement.addEventListener('mouseleave', (evt) => onMenuMouseleave(evt));

//     };


//     addCloseButtonHandlers();
//     addOpenMenuHandlers();
//   }

//   _addOverlay() {
//     if (this._overlayElement) return;
//     console.log('добавляем оверлэй');
//     this._overlayElement = document.createElement('div');
//     this._overlayElement.classList.add(OVERLAY_SELECTOR);
//     document.body.prepend(this._overlayElement);
//   }

//   _removeOverlay() {
//     console.log('удаляем оверлэй');
//     this._overlayElement.remove();
//     this._overlayElement = null;
//   }

//   _showMenu(evt) {
//     this._addOverlay();
//   }

//   _closeMenu(evt) {
//     const unFocus = () => {
//       let focusedItem = document.querySelector(':focus');
//       if (focusedItem) {
//         focusedItem.blur();
//       }
//     };

//     evt.preventDefault();
//     unFocus();
//     this._removeOverlay();
//   }
// }

export default MainNav;
