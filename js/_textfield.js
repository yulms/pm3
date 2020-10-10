const textfieldSelector = '.textfield';
const inputSelector = '.textfield__input';
const labelSelector = '.textfield__label';
const inputFocusedClass = 'textfield__input--focused';
const labelOnTopClass = 'textfield__label--top';



class Textfield {
  constructor(element) {
    this.element = element;
    this.inputElement = this.element.querySelector(inputSelector);
    this.inputElement.addEventListener('focus', this._onInputFocus.bind(this));
    this.inputElement.addEventListener('blur', this._onInputBlur.bind(this));
    this.labelElement = this.element.querySelector(labelSelector);
  }


  _onInputFocus() {
    console.log('focus');
    this.inputElement.classList.add(inputFocusedClass);
    if (!this.labelElement.classList.contains(labelOnTopClass)) {
      this.labelElement.classList.add(labelOnTopClass);
    }
  }

  _onInputBlur() {
    console.log('blur');
    this.inputElement.classList.remove(inputFocusedClass);

    console.log(this.inputElement.value);
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

export default initTextfields;
