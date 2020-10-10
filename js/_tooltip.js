const tooltipSelector = '[data-tooltip]';
const tooltipCardClassName = 'tooltip__card';
const openedTooltipClassName = 'tooltip--opened';
const topTooltipClassName = 'tooltip--top';
const bottomTooltipClassName = 'tooltip--bottom';

const offset = 12;


class Tooltip {
  constructor(element) {
    this.element = element;
    this.element.addEventListener('mouseover', this._onTooltipMouseenter.bind(this));
    this.element.addEventListener('mouseout', this._onTooltipMouseleave.bind(this));
    this.tooltipCardElem = null;
  }

  _onTooltipMouseenter() {
    this._createTooltip();
    this._positionTooltip();
  }


  _onTooltipMouseleave() {
    this.tooltipCardElem.remove();
    this.tooltipCardElem = null;
    this.element.classList.remove(openedTooltipClassName);
    this.element.classList.remove(topTooltipClassName);
    this.element.classList.remove(bottomTooltipClassName);
  }


  _createTooltip() {
    this.tooltipCardElem = document.createElement('div');
    this.tooltipCardElem.className = tooltipCardClassName;
    this.tooltipCardElem.innerHTML = this.element.dataset.tooltip;
    this.element.append(this.tooltipCardElem);
    this.element.classList.add(openedTooltipClassName);
  }


  _positionTooltip() {
    let tooltipCoords = this.tooltipCardElem.getBoundingClientRect();
    // проверка выхода за пределы слева
    if (tooltipCoords.left < 0) {
      let shift = Math.floor(tooltipCoords.left) * -1;
      this.tooltipCardElem.style.transform = `translateX(${shift}px)`;
    }
    // проверка выхода за пределы справа
    if (tooltipCoords.right > document.documentElement.clientWidth) {
      let diff = Math.ceil(tooltipCoords.right - document.documentElement.clientWidth);
      this.tooltipCardElem.style.transform = `translateX(${-diff}px)`;
    }

    // показ снизу, если тултип выходит за верхнюю часть вьюпорта
    if (tooltipCoords.top < 0) {
      this.tooltipCardElem.style.bottom = 'auto';
      this.tooltipCardElem.style.top = `calc(100% + ${offset}px)`;
      this.element.classList.add(bottomTooltipClassName);
    } else {
      this.element.classList.add(topTooltipClassName);
    }
  }




  // * Старое исполнение - выравнивание тултипа строго transform + position (в текущем флекс)
  // Сохранено до полной удовлетворенности флексами

  // _positionTooltip() {
  //   let tooltipCoords = this.tooltipCardElem.getBoundingClientRect();
  //   // проверка выхода за пределы слева
  //   if (tooltipCoords.left < 0) {
  //     let shift = Math.floor(tooltipCoords.left) * -1;
  //     this.tooltipCardElem.style.transform = `translateX(-50%) translateX(${shift}px)`;
  //   }
  //   // проверка выхода за пределы справа
  //   if (tooltipCoords.right > document.documentElement.clientWidth) {
  //     let diff = tooltipCoords.right - document.documentElement.clientWidth;
  //     this.tooltipCardElem.style.transform = `translateX(-50%) translateX(${-diff}px)`;
  //   }

  //   // показ снизу, если тултип выходит за верхнюю часть вьюпорта
  //   if (tooltipCoords.top < 0) {
  //     this.tooltipCardElem.style.bottom = 'auto';
  //     this.tooltipCardElem.style.top = `calc(100% + ${offset}px)`;
  //     this.tooltipCardElem.classList.add('tooltip--bottom');
  //   }
  // }
}


function initTooltips() {
  let tooltipCardElements = document.querySelectorAll(tooltipSelector);
  tooltipCardElements.forEach((elem) => {
    new Tooltip(elem);
  });
}

export default initTooltips;
