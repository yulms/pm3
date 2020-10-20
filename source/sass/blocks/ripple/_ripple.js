'use strict';


class Ripple {

  constructor(overrides) {

    let defaults = {
      rippleClassName: 'ripple',
      selectors: ['button'],
      activationEventTypes: ['mousedown', 'keydown'],
      startScale: 0.6, // начальный размер ripple от максимальной стороны контейнера -> используется для расчета rippleSize
      padding: 10,
      opacity: 0.12,
      lastAnimationName: 'ripple-opacity-out'
    };

    Object.assign(this, defaults, overrides);

    this.activationEventTypes.forEach((eventType) => {
      document.addEventListener(eventType, (evt) => {
        switch (evt.type) {
          case 'mousedown':
            if (evt.which === 1) {
              this._activateHandler(evt);
            }
            break;

          case 'keydown':
            if (evt.key === 'Enter') {
              evt.ripplePositionInCenter = true;
              this._activateHandler(evt);
            }
            break;
        }
      });
    });
  }


  _activateHandler(evt) {

    this.selectors.some((selector) => {
      let target = evt.target.closest(selector);
      if (!target) return false;

      // если у элемента есть after, не трогаем его
      let targetCoputedStyle = getComputedStyle(target, '::after');
      if (targetCoputedStyle.content !== 'none') return false;

      // если предыдущая анимация не закончилась, принудительно завершим
      if (target.classList.contains(this.rippleClassName)) {
        target.classList.remove(this.rippleClassName);
      }


      let rippleSize = this._getSize(target);
      let translationCoordinates = this._getTranslationCoordinates(evt, target, rippleSize);
      let scale = this._getScale(target, rippleSize);


      target.style.setProperty('--size', rippleSize + 'px');
      target.style.setProperty('--startTranslate',
        `${translationCoordinates.startPointX}px,
         ${translationCoordinates.startPointY}px`);
      target.style.setProperty('--endTranslate',
        `${translationCoordinates.endPointX}px,
         ${translationCoordinates.endPointY}px`);
      target.style.setProperty('--endScale', scale);
      target.style.setProperty('--opacity', this.opacity);


      target.classList.add(this.rippleClassName);

      target.addEventListener('animationend', (evt) => {
        if (evt.animationName !== this.lastAnimationName) return;
        target.classList.remove(this.rippleClassName);
      });

      return true;
    });

  }

  _getSize(target) {
    return Math.floor(this.startScale * Math.max(target.clientWidth, target.clientHeight));
  }

  _getTranslationCoordinates(evt, target, rippleSize) {
    let resultCoordinates = {};
    let startPointX;
    let startPointY;
    let rect = target.getBoundingClientRect();

    if (evt.ripplePositionInCenter) {
      startPointX = (rect.width / 2) - (rippleSize / 2);
      startPointY = (rect.height / 2) - (rippleSize / 2);
    } else {
      startPointX = evt.clientX - rect.x - rippleSize / 2;
      startPointY = evt.clientY - rect.y - rippleSize / 2;
    }

    resultCoordinates = {
      startPointX: startPointX,
      startPointY: startPointY,
      endPointX: (rect.width / 2) - (rippleSize / 2),
      endPointY: (rect.height / 2) - (rippleSize / 2)
    };

    return resultCoordinates;
  }

  _getScale(target, rippleSize) {
    let hypotenuse = Math.sqrt(Math.pow(target.clientWidth, 2) + Math.pow(target.clientHeight, 2));
    let maxRadius = hypotenuse + this.padding;
    return maxRadius / rippleSize;
  }
}





function initRipple() {
  const rippleConfig = {
    selectors: ['button', 'a']
  };

  return new Ripple(rippleConfig);
}

export default initRipple;
