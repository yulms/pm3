'use strict';


class Slider {
  constructor() {
    const defaults = {
      sliderSelector: '.slider',
      listSelector: '.slider__list',
      itemSelector: '.slider__item',
      navItemSelector: '.slider__nav-item',
      navLinkSelector: '.slider__nav-link',
      navLinkActiveClass: 'slider__nav-link--active'
    };

    Object.assign(this, defaults);

    this.element = document.querySelector(this.sliderSelector);
    this.listElement = this.element.querySelector(this.listSelector);
    this.itemElements = this.element.querySelectorAll(this.itemSelector);
    this.navItemElements = this.element.querySelectorAll(this.navItemSelector);
    this.lastIndex = 0; // индекс первого элемента


    this.element.addEventListener('click', (evt) => {
      // вылавливаем клик по навигационной ссылке => перелистываем
      let target = evt.target.closest(this.navItemSelector);
      if (!target) return;
      evt.preventDefault();

      // 1. Определяем индекс clicked item
      let navItemElements = Array.from(this.navItemElements);
      let targetIndex = navItemElements.indexOf(target);
      this._scrollSlide(targetIndex);
    });


    this._createIntersectionObserver({
      rootElement: this.listElement,
      targetElements: this.itemElements
    });


    this.element.addEventListener('slideIn', (evt) => {
      // замена активной ссылки
      // Определяем номер активного слайда
      let items = Array.from(this.itemElements);
      let targetIndex = items.indexOf(evt.detail.targetElement);
      this._updateNavItems(targetIndex);
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
    this.navItemElements[this.lastIndex].firstElementChild.classList.remove(this.navLinkActiveClass);
    // 3. Установить в навигацию по установленному номеру активный класс
    this.navItemElements[targetIndex].firstElementChild.classList.add(this.navLinkActiveClass);
  }



}


function initSlider() {
  return new Slider();
}

export default initSlider;
