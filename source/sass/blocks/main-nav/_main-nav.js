'use sctipt';

const CLOSE_BUTTON_SELECTOR = '.main-nav__close-button';


class MainNav {
  constructor() {
    this._closeNavButtonElements = document.querySelectorAll(CLOSE_BUTTON_SELECTOR);
    for (const element of this._closeNavButtonElements) {
      element.addEventListener('click', (evt) => {
        evt.preventDefault();
        let focusedItem = document.querySelector(':focus');
        if (focusedItem) {
          focusedItem.blur();
        }
      });
    }
  }
}

export default MainNav;
