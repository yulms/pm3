'use strict';
import { isTouchDevice } from  './util.js';


class Slider {
  constructor(overrides) {
    const defaults = {
      sliderSelector: '.slider',
      firstSlideModificator: 'slider--first-slide',
      lastSlideModificator: 'slider--last-slide',
      listSelector: '.slider__list',
      itemSelector: '.slider__item',
      navItemSelector: '.slider__nav-item',
      navItemActiveClass: 'slider__nav-item--active',
      navLinkSelector: '.slider__nav-link',
      buttonToggleSelector: '.slider__toggle',
      buttonToggleLeftClass: 'slider__toggle--left',
      buttonToggleRightClass: 'slider__toggle--right'
    };

    Object.assign(this, defaults, overrides);

    this.element = document.querySelector(this.sliderSelector);
    this.listElement = this.element.querySelector(this.listSelector);
    this.itemElements = this.element.querySelectorAll(this.itemSelector);
    this.navItemElements = this.element.querySelectorAll(this.navItemSelector);
    this.lastIndex = 0; // индекс первого элемента
    this.maxIndex = this.navItemElements.length - 1;


    this.element.addEventListener('click', (evt) => {

      const isClickWasOnNavItem = () => {
        // вылавливаем клик по навигационной ссылке => перелистываем
        let target = evt.target.closest(this.navItemSelector);
        if (!target) return false;
        // отменяем переход по ссылке
        evt.preventDefault();
        // 1. Определяем индекс clicked item и скроллим
        this._scrollSlide(+target.dataset.index);
        return true;
      };

      const isClickWasOnToggleButton = () => {
        let target = evt.target.closest(this.buttonToggleSelector);
        if (!target) return false;
        let targetIndex = this.lastIndex;
        target.classList.contains(this.buttonToggleLeftClass) ?  targetIndex += -1 : targetIndex += 1;
        this._scrollSlide(targetIndex);
      };


      if (isClickWasOnNavItem()) return;
      isClickWasOnToggleButton();

    });


    this._createIntersectionObserver({
      rootElement: this.listElement,
      targetElements: this.itemElements
    });


    this.element.addEventListener('slideIn', (evt) => {
      // замена активной ссылки
      // Определяем номер активного слайда
      let targetIndex = +evt.detail.targetElement.dataset.index;
      this._updateNavItems(targetIndex);
      // кнопки видны тлько на не тач устройствах
      if (!isTouchDevice()) {
        this._updateToggleButtons(targetIndex);
      }
      this.lastIndex = targetIndex;
    });

  }


  _createIntersectionObserver({rootElement, targetElements}) {
    const options = {
      root: rootElement,
      rootMargin: '0px', // Отступы вокруг root
      threshold: 0.5 // Число или массив чисел, указывающий, при каком проценте видимости целевого элемента должен сработать callback
    };

    const callback = (entries) => {

      entries.forEach((elem)=>{
        if (elem.isIntersecting) {
          let slideIn = new CustomEvent('slideIn', {
            detail: {
              targetElement: elem.target
            }
          });
          this.element.dispatchEvent(slideIn);
        }

        // событие выхода, если понадобится
        // } else {
        //   console.time();
        //   let slideOut = new CustomEvent('slideOut', {
        //     detail: {
        //       targetElement: elem.target
        //     }
        //   });
        //   this.element.dispatchEvent(slideOut);
        // }
      });
    };

    var observer = new IntersectionObserver(callback, options);

    targetElements.forEach((elem) => {
      observer.observe(elem);
    });
  }


  _scrollSlide(targetIndex) {
    // на сколько элементов надо подвинуться? Положительное знач - вперед, отрицательное - назад
    let indexDiff = targetIndex - this.lastIndex;
    let itemWidth = this.itemElements[0].offsetWidth;
    this.listElement.scrollLeft += itemWidth * indexDiff;
  }


  _updateNavItems(targetIndex) {
    // очистить активный класс
    this.navItemElements[this.lastIndex].classList.remove(this.navItemActiveClass);
    // 3. Установить в навигацию по установленному номеру активный класс
    this.navItemElements[targetIndex].classList.add(this.navItemActiveClass);
  }


  _updateToggleButtons(targetIndex) {
    const showLeftToggle = () => this.element.classList.remove(this.firstSlideModificator);
    const hideLeftToggle = () => this.element.classList.add(this.firstSlideModificator);
    const showRightToggle = () => this.element.classList.remove(this.lastSlideModificator);
    const hideRightToggle = () => this.element.classList.add(this.lastSlideModificator);

    // left - hide
    if (targetIndex === 0) {
      hideLeftToggle();
    }

    // left - show
    if (targetIndex !== 0 && this.lastIndex === 0) {
      showLeftToggle();
    }

    // right - hide
    if (targetIndex === this.maxIndex) {
      hideRightToggle();
    }

    // right - show
    if (this.lastIndex === this.maxIndex && targetIndex !== this.maxIndex) {
      showRightToggle();
    }

  }



}


function initSlider() {
  return new Slider();
}

export default initSlider;
