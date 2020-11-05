'use strict';
import { isEscapePressEvent, scrollLock, executeAfterAnimationEnd } from './util.js';


const ModalPosition = {
  CENTER: 'center',
  LEFT: 'left'
};

const ModalPositionClasses = {
  [ModalPosition.CENTER]: 'modal__inner--center',
  [ModalPosition.LEFT]: 'modal__inner--left'
};


class Modal {
  constructor(overrides) {

    const defaults = {
      triggerDataAttributeName: 'data-modal',
      closeModalClass : 'modal__content--closed',
      modalTemplateSelector: '#modal',
      modalBodySelector: '.modal',
      modalTypeDataAttribute: 'modalPosition',
      defaultPosition: ModalPosition.CENTER,
      blurClassName: 'modal__blur',
      overlaySelector : 'overlay',
      modalOverlaySelector: 'modal__overlay',
      closeButtonSelector : '.modal__close-button',
      focusElements: [
        // 'a[href]',
        // 'area[href]',
        'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
        'select:not([disabled]):not([aria-hidden])',
        'textarea:not([disabled]):not([aria-hidden])',
        'button:not([disabled]):not([aria-hidden])',
        'iframe',
        '[tabindex]:not([tabindex^="-"])'
      ],
      animationOnCloseClass: 'modal--animation-on-close',
      animationOnCloseName: 'hideModal',

    };

    Object.assign(this, defaults, overrides);

    this._init();


    document.addEventListener('click', (evt) => {
      let target = evt.target.closest('[' + this.triggerDataAttributeName + ']');
      if (!target) return;

      evt.preventDefault();
      this._triggerElement = target;
      let modalContentSelector = this._triggerElement.getAttribute(this.triggerDataAttributeName);
      this._open(modalContentSelector);
    });

  }


  _open(modalContentSelector) {

    const _cloneModalTemplate = () => {
      return document.querySelector(this.modalTemplateSelector)
        .content.querySelector(this.modalBodySelector)
        .cloneNode(true);
    };

    const _readPositionAttribute = () => {
      return this._triggerElement.dataset[this.modalTypeDataAttribute] || this.defaultPosition;
    };

    const _addPositionClass = () => {
      let modalPosition = _readPositionAttribute();
      this._modalElement.children[0].classList.add(ModalPositionClasses[modalPosition]);
    };

    const _saveHomelandPosition = () => {
      this._modalContentElementHomelandPosition = {
        parentElement: this._modalContentElement.parentElement,
        nextElement: this._modalContentElement.nextElementSibling
      };
    };

    const _changeAriaAttrIfNeeded = () => {
      if (this._modalContentElement.getAttribute('aria-hidden')) {
        this._modalContentElement.setAttribute('aria-hidden', false);
        this._ariaAttrWasRemoved = true;
      }
    };

    const _show = () => {
      if (this._modalContentElement.classList.contains(this.closeModalClass)) {
        this._modalContentElement.classList.remove(this.closeModalClass);
        this._closedClassWasRemoved = true;
      } else {
        // у него нет класса закрытия (модальное расположено в контенте)
        // могут быть проблемы, если надо flex или grid.
        // При необходимости добавить значение по умолчанию и указание необходимого стиля в data атрибуте
        this._modalContentElement.style.display = 'block';
      }
    };

    const _addHandlers = () => {
      this._onDocumentKeydown = (evt) => {
        isEscapePressEvent(evt, this._closeAfterAnnimationEnd.bind(this));
      };

      this._onCloseButtonClick = () => this._closeAfterAnnimationEnd();


      this._overlayElement.addEventListener('click', this._closeAfterAnnimationEnd.bind(this));
      document.addEventListener('keydown', this._onDocumentKeydown);
      this._closeButtonElement = this._modalElement.querySelector(this.closeButtonSelector);
      if (this._closeButtonElement) {
        this._closeButtonElement.addEventListener('click', this._onCloseButtonClick);
      }
    };


    this._modalElement = _cloneModalTemplate();
    _addPositionClass();
    this._modalContentElement = document.querySelector(modalContentSelector);
    _saveHomelandPosition();
    _changeAriaAttrIfNeeded();
    this._modalElement.children[0].prepend(this._modalContentElement);
    document.body.append(this._modalElement);
    _show();
    this._toggleOverlay();
    _addHandlers();
    scrollLock({lock: true});
    this._focusContol();
    this._isOpened = true;
  }


  _close() {
    const _removeHandlers = () => {
      document.removeEventListener('keydown', this._onDocumentKeydown);
      if (this._closeButtonElement) {
        this._closeButtonElement.removeEventListener('click', this._onCloseButtonClick);
      }
    };

    this._modalContentElement.style.display = '';

    if (this._closedClassWasRemoved) {
      this._modalContentElement.classList.add(this.closeModalClass);
    }
    if (this._ariaAttrWasRemoved) {
      this._modalContentElement.setAttribute('aria-hidden', true);
    }

    let {parentElement, nextElement} =  this._modalContentElementHomelandPosition;
    parentElement.insertBefore(this._modalContentElement, nextElement);

    this._modalElement.remove();
    this._toggleOverlay();
    _removeHandlers();
    scrollLock({lock: false});
    this._focusContol();
    this._init();
    this._isOpened = false;
  }


  _closeAfterAnnimationEnd() {

    executeAfterAnimationEnd(
      {
        element: this._modalElement,
        animationClass: this.animationOnCloseClass,
        animationName: this.animationOnCloseName,
        callback: this._close.bind(this)
      });

  }


  _toggleOverlay() {
    if (!this._isOpened) {
      // if (this.blurClassName) {
      //   document.body.classList.add(this.blurClassName);
      // }
      this._overlayElement = document.createElement('div');
      this._overlayElement.classList.add(this.overlaySelector);
      this._overlayElement.classList.add(this.modalOverlaySelector);
      this._modalElement.append(this._overlayElement);
    } else {
      // if (this.blurClassName) {
      //   document.body.classList.remove(this.blurClassName);
      // }
      this._overlayElement.remove();
    }
  }


  _focusContol() {
    // Метод переносит фокус с элемента открывающего окно
    // в само окно, и обратно, когда окно закрывается

    const nodes = this._modalElement.querySelectorAll(this.focusElements);
    if (this._isOpened && this._triggerElement) {
      this._triggerElement.focus();
    } else {
      if (nodes.length) nodes[0].focus();
    }
  }


  _init() {
    this._isOpened = false;
    this._closedClassWasRemoved = false;
    this._ariaAttrWasRemoved = false;
    this._triggerElement = null;
    this._modalElement = null;
    this._closeButtonElement = null;
    this._overlayElement = null;
    this._modalContentElement = null;
    this._modalContentElementHomelandPosition = null;
  }
}





function initModal() {
  return new Modal();
}

export default initModal;
