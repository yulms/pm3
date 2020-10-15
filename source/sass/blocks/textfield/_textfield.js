import appendCustomFocusEvents from './custom-focus-events.js';


const textfieldSelector = '.js-textfield';
const inputSelector = '.textfield__input';
const labelSelector = '.textfield__label';
const textfieldActiveClass = 'textfield--active';
const labelOnTopClass = 'textfield__label--top';


class Textfield {
  constructor(element) {
    this.element = element;
    this.inputElement = this.element.querySelector(inputSelector);
    this.labelElement = this.element.querySelector(labelSelector);

    appendCustomFocusEvents(this.element);
    this.element.addEventListener('focusEnter', this._onTextfieldFocusEnter.bind(this));
    this.element.addEventListener('focusLeave', this._onTextfieldFocusLeave.bind(this));
  }



  _onTextfieldFocusEnter() {
    this._activateTextfield();
  }

  _onTextfieldFocusLeave() {
    this._deactivateTextfield();
  }


  _activateTextfield() {
    this.element.classList.add(textfieldActiveClass);
    this.labelElement.classList.add(labelOnTopClass);
  }

  _deactivateTextfield() {
    this.element.classList.remove(textfieldActiveClass);
    if (!this.inputElement.value) {
      this.labelElement.classList.remove(labelOnTopClass);
    }
  }

}


function initTextfields() {
  let textfieldElements = document.querySelectorAll(textfieldSelector);
  textfieldElements.forEach((elem) => {
    new Textfield(elem);
  });
}

export {Textfield, initTextfields};




// * Material design
// Вызов для одного элемента на странице
// const foo = new MDCFoo(document.querySelector('.mdc-foo'));

// Вызов для всех элементов на странице
// const foos = [].map.call(document.querySelectorAll('.mdc-foo'), function(el) {
//   return new MDCFoo(el);
// });
