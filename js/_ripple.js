'use strict';

<<<<<<< HEAD
const RIPPLE_CLASSNAME = 'ripple';
const RIPPLE_BEFORE_MOD_CLASSNAME = 'ripple--before';
const RIPPLE_AFTER_MOD_CLASSNAME = 'ripple--after';

=======
>>>>>>> 07f6510798b0c10da3c1872e32ebb6a968a27ca5

class Ripple {

  constructor(overrides) {

    let defaults = {
<<<<<<< HEAD
=======
      rippleClassName: 'ripple',
>>>>>>> 07f6510798b0c10da3c1872e32ebb6a968a27ca5
      selectors: ['button'],
      activationEventTypes: ['mousedown', 'keydown'],
      startScale: 0.6, // начальный размер ripple от максимальной стороны контейнера -> используется для расчета rippleSize
      padding: 10,
      opacity: 0.12,
      lastAnimationName: 'ripple-opacity-out'
    };

    Object.assign(this, defaults, overrides);

<<<<<<< HEAD
    this.rippleActiveModClassName = RIPPLE_AFTER_MOD_CLASSNAME;

=======
>>>>>>> 07f6510798b0c10da3c1872e32ebb6a968a27ca5
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
<<<<<<< HEAD

          default:
            this._activateHandler(evt);
=======
>>>>>>> 07f6510798b0c10da3c1872e32ebb6a968a27ca5
        }
      });
    });
  }


  _activateHandler(evt) {

    this.selectors.some((selector) => {
<<<<<<< HEAD

      let target = evt.target.closest(selector);
      if (!target) return false;

      // если предыдущая анимация не закончилась, принудительно завершим
      if (target.classList.contains(RIPPLE_CLASSNAME)) {
        this._endExecution(target);
      }

      // если у элемента есть after, проверяем существует ли before, если да - отменяем запуск
      let targetCoputedStyle = getComputedStyle(target, '::after');
      if (targetCoputedStyle.content !== 'none') {
        targetCoputedStyle = getComputedStyle(target, '::before');
        if (targetCoputedStyle.content === 'none') {
          this.rippleActiveModClassName = RIPPLE_BEFORE_MOD_CLASSNAME;
        } else {
          return false;
        }
=======
      let target = evt.target.closest(selector);
      if (!target) return false;

      // если у элемента есть after, не трогаем его
      let targetCoputedStyle = getComputedStyle(target, '::after');
      if (targetCoputedStyle.content !== 'none') return false;

      // если предыдущая анимация не закончилась, принудительно завершим
      if (target.classList.contains(this.rippleClassName)) {
        target.classList.remove(this.rippleClassName);
>>>>>>> 07f6510798b0c10da3c1872e32ebb6a968a27ca5
      }


      let rippleSize = this._getSize(target);
      let translationCoordinates = this._getTranslationCoordinates(evt, target, rippleSize);
      let scale = this._getScale(target, rippleSize);

<<<<<<< HEAD
=======

>>>>>>> 07f6510798b0c10da3c1872e32ebb6a968a27ca5
      target.style.setProperty('--size', rippleSize + 'px');
      target.style.setProperty('--startTranslate',
        `${translationCoordinates.startPointX}px,
         ${translationCoordinates.startPointY}px`);
      target.style.setProperty('--endTranslate',
        `${translationCoordinates.endPointX}px,
         ${translationCoordinates.endPointY}px`);
      target.style.setProperty('--endScale', scale);
      target.style.setProperty('--opacity', this.opacity);


<<<<<<< HEAD
      target.classList.add(RIPPLE_CLASSNAME);
      target.classList.add(this.rippleActiveModClassName);

      target.addEventListener('animationend', (evt) => {
        if (evt.animationName !== this.lastAnimationName) return;
        this._endExecution(target);
=======
      target.classList.add(this.rippleClassName);

      target.addEventListener('animationend', (evt) => {
        if (evt.animationName !== this.lastAnimationName) return;
        target.classList.remove(this.rippleClassName);
>>>>>>> 07f6510798b0c10da3c1872e32ebb6a968a27ca5
      });

      return true;
    });

  }

<<<<<<< HEAD
  _endExecution(rippleElement) {
    rippleElement.classList.remove(RIPPLE_CLASSNAME);
    rippleElement.classList.remove(this.rippleActiveModClassName);
  }

=======
>>>>>>> 07f6510798b0c10da3c1872e32ebb6a968a27ca5
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
<<<<<<< HEAD
    // selectors: ['button', 'a']
    selectors: ['a', 'button']
=======
    selectors: ['button', 'a']
>>>>>>> 07f6510798b0c10da3c1872e32ebb6a968a27ca5
  };

  return new Ripple(rippleConfig);
}

export default initRipple;
