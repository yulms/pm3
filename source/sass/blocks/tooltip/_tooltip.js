const tooltipSelector = '[data-tooltip]';
const offset = 12;

class Tooltip {
  constructor(element) {
    this.element = element;
    this.element.addEventListener('mouseover', this._onTooltipMouseover.bind(this));
    this.element.addEventListener('mouseout', this._onTooltipMouseout.bind(this));
    this.tooltipElem = null;
  }

  _onTooltipMouseover() {
    this._createTooltip();
    this._positionTooltip();
  }


  _onTooltipMouseout() {
    this.tooltipElem.remove();
    this.tooltipElem = null;
    this.element.style.zIndex = '';
  }


  _createTooltip() {
    this.tooltipElem = document.createElement('div');
    this.tooltipElem.className = 'tooltip';
    this.tooltipElem.innerHTML = this.element.dataset.tooltip;
    this.element.style.zIndex = 1;
    this.element.append(this.tooltipElem);
  }


  _positionTooltip() {
    let tooltipCoords = this.tooltipElem.getBoundingClientRect();
    // проверка выхода за пределы слева
    if (tooltipCoords.left < 0) {
      this.tooltipElem.style.transform = `translateX(-50%) translateX(${-tooltipCoords.left}px)`;
    }
    // проверка выхода за пределы справа
    if (tooltipCoords.right > document.documentElement.clientWidth) {
      let diff = tooltipCoords.right - document.documentElement.clientWidth;
      this.tooltipElem.style.transform = `translateX(-50%) translateX(${-diff}px)`;
    }

    // показ снизу, если тултип выходит за верхнюю часть вьюпорта
    if (tooltipCoords.top < 0) {
      this.tooltipElem.style.bottom = 'auto';
      this.tooltipElem.style.top = `calc(100% + ${offset}px)`;
      this.tooltipElem.classList.add('tooltip--bottom');
    }
  }
}


function initTooltips() {
  let tooltipElements = document.querySelectorAll(tooltipSelector);
  tooltipElements.forEach((elem) => {
    new Tooltip(elem);
  });
}

export default initTooltips;
