'use strict';


class Slider {
  constructor() {
    const defaults = {
      sliderSelector: '.slider',
      listSelector: '.slider__list',
      itemSelector: '.slider__item',
      linkSelector: '.slider__nav-link',
      navItemSelector: '.slider__nav-item',
      navLinkActiveClass: 'slider__nav-link--active'
    };

    Object.assign(this, defaults);

    this.element = document.querySelector(this.sliderSelector);
    this.listElement = this.element.querySelector(this.listSelector);
    this.itemElements = this.element.querySelectorAll(this.itemSelector);
    this.navItemElements = this.element.querySelectorAll(this.navItemSelector);
    this.lastIndex = 0; // индекс первого элемента


    this.element.addEventListener('click', (evt) => {
      let target = evt.target.closest(this.linkSelector);
      if (!target) return;
      evt.preventDefault();

      // добавить функцию перелистывания
      this.listElement.scrollLeft += 420;

    });



    this._createIntersectionObserver({
      rootElement: this.listElement,
      targetElements: this.itemElements
    });

    this.element.addEventListener('slideIn', (evt) => {
      // менять активную ссылку
      // 1. Определить номер активного слайда (ol Number?)
      let items = Array.from(this.itemElements);
      let currentIndex = items.indexOf(evt.detail.targetElement);
      // очистить активный класс
      this.navItemElements[this.lastIndex].firstElementChild.classList.remove(this.navLinkActiveClass);
      // 3. Установить в навигацию по установленному номеру активный класс
      this.navItemElements[currentIndex].firstElementChild.classList.add(this.navLinkActiveClass);
      this.lastIndex = currentIndex;
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



}


function initSlider() {
  return new Slider();
}

export default initSlider;
