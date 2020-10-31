import appendCustomFocusEvents from './custom-focus-events.js';


class MainNav {
  constructor(overrides) {
    const defaults = {
      mainSelector: '.main-nav',
      mainListSelector: '.main-nav__list--lvl1',
      firstLevelLinkSelector: '.main-nav__link--lvl1'
    };

    Object.assign(this, defaults, overrides);


    this._state = {
      _isOpened: false,
      _focusIsInside: false,
      _mouseIsInside: false
    };

    this._mainElement = document.querySelector(this.mainSelector);
    this._mainListElement = this._mainElement.querySelector(this.mainListSelector);

    this._addOpenedStateEvents();

    this._mainElement.addEventListener('openMenu', () => {
      this._state._isOpened = true;
    });

    this._mainElement.addEventListener('closeMenu', () => {
      this._state._isOpened = false;
    });

    this._addFirstClickChecking();
  }


  _addOpenedStateEvents() {
    appendCustomFocusEvents(this._mainElement);

    this._mainElement.addEventListener('focusEnter', () => {
      this._state._focusIsInside = true;
      // сначала дем отработать click
      setTimeout(this._dispatchOpenEvent.bind(this), 0);
    });

    this._mainElement.addEventListener('focusLeave', () => {
      this._state._focusIsInside = false;
      this._dispatchCloseEvent();
    });

    this._mainListElement.addEventListener('mouseenter', () => {
      this._state._mouseIsInside = true;
      // сначала дем отработать click
      setTimeout(this._dispatchOpenEvent.bind(this), 0);
    });

    this._mainListElement.addEventListener('mouseleave', () => {
      this._state._mouseIsInside = false;
      this._dispatchCloseEvent();
    });
  }


  _dispatchOpenEvent() {
    if (this._state._isOpened) return;
    let openEvent = new CustomEvent('openMenu');
    this._mainElement.dispatchEvent(openEvent);
  }


  _dispatchCloseEvent() {
    if (this._state._isOpened) {
      if (!this._state._focusIsInside && !this._state._mouseIsInside) {
        let closeEvent = new CustomEvent('closeMenu');
        if (!this._state._focusIsInside) {
          this._mainElement.dispatchEvent(closeEvent);
        }
      }
    }
  }


  _addFirstClickChecking() {
    this._mainListElement.addEventListener('click', (evt) => {
      let target = evt.target.closest(this.firstLevelLinkSelector);
      if (!target) return;

      if (!this._state._isOpened) {
        evt.preventDefault();
      }
    });
  }
}


function initMainNav() {
  return new MainNav();
}

export default initMainNav;
