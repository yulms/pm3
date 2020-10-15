import { Textfield } from './_textfield.js';


const mainSelector = '.js-custom-select';
const listSelector = '.textfield__options-list';
const listCloseClass = 'textfield__options-list--closed';
const itemSelector = '.textfield__options-item';
const statusSelector = '[aria-live="polite"]';
const inputContainerSelector = '.textfield__input-container';
const optionTitleSelector = '.textfield__option-title';
const filteredStatusPrefix = 'Доступно вариантов : ';


const State = {
  isOpened: false
};


class CustomSelect extends Textfield {
  constructor(element) {
    super(element);
    this.state = State;
    this.listElement = this.element.querySelector(listSelector);
    this.itemElements = this.element.querySelectorAll(itemSelector);
    this.items = Array.from(this.itemElements);
    this.statusElement = this.element.querySelector(statusSelector);
    this.inputContainer = this.element.querySelector(inputContainerSelector);


    // * setting Aria attributes
    this.element.setAttribute('role', 'combobox');
    this.element.setAttribute('aria-haspopup', 'listbox');
    this.element.setAttribute('aria-owns', this.listElement.id);
    this.inputElement.setAttribute('aria-controls', this.listElement.id);
    this.inputElement.setAttribute('aria-autocomplete', 'both');
    this.listElement.setAttribute('role', 'listbox');
    this.itemElements.forEach(function(item) {
      item.setAttribute('role', 'option');
      item.setAttribute('tabindex', '-1');
    });


    // * Adding handlers
    this.inputElement.addEventListener('click', () => {
      this._toggleList();
    });


    this.listElement.addEventListener('click', () => {
      const focusedElement = document.activeElement;
      if (focusedElement.tagName === 'LI') {
        this._makeChoice(focusedElement);
        this._toggleList();
      }
    });


    this.element.addEventListener('keyup', (evt) => {
      this._doKeyAction(evt.key);
    });


    this.element.addEventListener('focusLeave', () => {
      this._toggleList('shut');
    });


    document.addEventListener('click', (evt) => {
      if (!evt.target.closest(mainSelector) && this.state.isOpened) {
        this._toggleList('shut');
      }
    });
  }


  _toggleList(action = 'toggle') {

    let _openList  = () => {
      this.listElement.classList.remove(listCloseClass);
      this.inputContainer.setAttribute('aria-expanded', 'true');
      this.state.isOpened = true;
    };

    let _closeList  = () => {
      this.listElement.classList.add(listCloseClass);
      this.inputContainer.setAttribute('aria-expanded', 'false');
      this.state.isOpened = false;
    };


    switch (action) {
    case 'toggle':
      if (this.state.isOpened) {
        _closeList();
      } else {
        _openList();
      }
      break;

    case 'open':
      _openList();
      break;

    case 'shut':
      _closeList();
      break;
    }
  }


  _makeChoice(focusedItem) {
    const optionTitle = focusedItem.querySelector(optionTitleSelector);
    this.inputElement.value = optionTitle.textContent;
    this.inputElement.focus();
  }


  _moveFocus({moveDirection}) {

    const visibleItems = this.items.filter((item) => (item.style.display === ''));
    const currentFocus = document.activeElement;
    let currentIndex;

    let _moveFocusUp = () => {
      switch (true) {

      case (currentFocus === this.inputElement):
        visibleItems[visibleItems.length - 1].focus();
        break;

      case (currentFocus.tagName === 'LI'):
        currentIndex = visibleItems.indexOf(currentFocus);
        if (currentIndex === 0) {
          this.inputElement.focus();
        } else {
          visibleItems[currentIndex - 1].focus();
        }
        break;
      }
    };

    let _moveFocusDown = () => {
      switch (true) {

      case (currentFocus === this.inputElement):
        visibleItems[0].focus();
        break;

      case (currentFocus.tagName === 'LI'):
        currentIndex = visibleItems.indexOf(currentFocus);
        if (currentIndex !== visibleItems.length - 1) {
          visibleItems[currentIndex + 1].focus();
        } else {
          visibleItems[0].focus();
        }
        break;
      }
    };


    if (visibleItems.length === 0) return;
    if (moveDirection === 'up') {
      _moveFocusUp();
    } else {
      _moveFocusDown();
    }
  }


  _doKeyAction(key) {
    const currentFocus = document.activeElement;

    switch(key) {

    case 'Enter':
      if (this.state.isOpened && currentFocus.tagName === 'LI') {
        this._makeChoice(currentFocus);
      }
      this._toggleList();
      break;

    case 'Escape':
      if (this.state.isOpened) {
        this._toggleList();
      }
      break;

    case 'ArrowDown':
      if (!this.state.isOpened) {
        this._toggleList();
      }
      this._moveFocus({moveDirection: 'down'});
      break;

    case 'ArrowUp':
      if (!this.state.isOpened) {
        this._toggleList();
      }
      this._moveFocus({moveDirection: 'up'});
      break;

    default:
      if (!this.state.isOpened) {
        this._toggleList();
      }
      this._doFilter();
      break;
    }

  }


  _doFilter() {
    const terms = this.inputElement.value;

    this.itemElements.forEach((item) => item.style.display = 'none');

    const filteredItems = this.items.filter((item) =>
      item.innerText.toUpperCase().startsWith(terms.toUpperCase()));

    filteredItems.forEach((item) => item.style.display = '');

    this._updateStatus(filteredItems.length);
  }


  _updateStatus(itemsQuantity) {
    this.statusElement.textContent = filteredStatusPrefix + itemsQuantity;
  }

}



function initCustomSelects() {
  let customSelectElements = document.querySelectorAll(mainSelector);
  customSelectElements.forEach((elem) => {
    new CustomSelect(elem);
  });
}

export { initCustomSelects };
