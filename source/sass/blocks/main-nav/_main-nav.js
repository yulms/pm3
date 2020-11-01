// Определить поддержку hover
// Если поддержки нет - блокировать первый клик по меню первого уровня


class MainNav {
  constructor(overrides) {
    const defaults = {
      mainSelector: '.main-nav',
      mainListSelector: '.main-nav__list--lvl1',
      firstLevelLinkSelector: '.main-nav__link--lvl1'
    };

    Object.assign(this, defaults, overrides);

    this._mainElement = null;
    this._firstClickedElement = null;


    if (this._detectTouchSupport()) {
      this._init();
      this._enableFirstClickPrevention();
    }
  }

  _init() {
    this._mainElement = document.querySelector(this.mainSelector);
  }

  _detectTouchSupport() {
    let isTouchSupport = true;
    try {
      document.createEvent('TouchEvent');
    }
    catch (err) {
      isTouchSupport = false;
    }
    return isTouchSupport;
  }

  _enableFirstClickPrevention() {
    this._mainElement.addEventListener('click', (evt) => {
      let target = evt.target.closest(this.firstLevelLinkSelector);
      if (!target) return;

      if (this._firstClickedElement !== target) {
        evt.preventDefault();
      }

      this._firstClickedElement = target;
    });
  }

}


function initMainNav() {
  return new MainNav();
}

export default initMainNav;
