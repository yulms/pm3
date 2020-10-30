'use strict';

class SwitchView {
  constructor(overrides) {
    const defaults = {
      gridTriggerSelector: '.switch-view__input--grid',
      listTriggerSelector: '.switch-view__input--list',
      parentElementSelector: '.content-goods',
      gridClass: 'minicard--grid',
      listClass: 'minicard--list',
    };

    Object.assign(this, defaults, overrides);


    this.gridTriggerElement = document.querySelector(this.gridTriggerSelector);
    this.listTriggerElement = document.querySelector(this.listTriggerSelector);

    this._addHandlers();
  }

  _addHandlers() {
    this.gridTriggerElement.addEventListener('input', () => {
      let parentElement = document.querySelector(this.parentElementSelector);
      parentElement.classList.remove(this.listClass);
      parentElement.classList.add(this.gridClass);
    });

    this.listTriggerElement.addEventListener('input', () => {
      let parentElement = document.querySelector(this.parentElementSelector);
      parentElement.classList.remove(this.gridClass);
      parentElement.classList.add(this.listClass);
    });
  }
}


function initSwitchView() {
  return new SwitchView;
}

export default initSwitchView;
