class QuantityInput {
  constructor(overrides) {

    const defaults = {
      buttonSelector: '.quantity-input__button',
      buttonMoreClass: 'quantity-input__button--more'
    };

    Object.assign(this, defaults, overrides);

    if (document.querySelector(this.buttonSelector)) {
      this._init();
    }
  }


  _init() {
    document.addEventListener('click', (evt) => {
      let target = evt.target.closest(this.buttonSelector);

      if (!target) return;

      const inputElement = target.parentElement.querySelector('input');

      if (target.classList.contains(this.buttonMoreClass)) {
        inputElement.value++;
      } else {
        if (inputElement.value <= 1) return;
        inputElement.value--;
      }
    });
  }
}


function initQuantityInput() {
  return new QuantityInput();
}

export default initQuantityInput;
