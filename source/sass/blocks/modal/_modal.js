'use strict';
import { isEscapePressEvent, scrollLock, executeAfterAnimationEnd } from './util.js';


class Modal {
  constructor(overrides) {

    const defaults = {
      triggerDataAttributeName: 'data-modal',
      closeModalClass : 'modal--closed',
      overlaySelector : 'overlay',
      modalOverlaySelector: 'modal__overlay',
      closeButtonSelector : '.modal__close-button',
      focusElements: [
        'a[href]',
        'area[href]',
        'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
        'select:not([disabled]):not([aria-hidden])',
        'textarea:not([disabled]):not([aria-hidden])',
        'button:not([disabled]):not([aria-hidden])',
        'iframe',
        '[tabindex]:not([tabindex^="-"])'
      ],
      animationOnCloseClass: 'modal--animation-on-close',
      animationOnCloseName: 'hideModal'
    };

    Object.assign(this, defaults, overrides);

    this._isOpened = false;
    this._initElements();

    document.addEventListener('click', (evt) => {
      let target = evt.target.closest('[' + this.triggerDataAttributeName + ']');
      if (!target) return;

      evt.preventDefault();
      this._triggerElement = target;
      let modalSelector = this._triggerElement.getAttribute(this.triggerDataAttributeName);
      this._open(modalSelector);
    });

  }


  _open(modalSelector) {
    const _addHandlers = () => {
      this._onDocumentKeydown = (evt) => {
        isEscapePressEvent(evt, this._closeAfterAnnimationEnd.bind(this));
      };

      this._onCloseButtonClick = () => this._closeAfterAnnimationEnd();
      // this._onCloseButtonClick = () => {
      //   this._executeAfterAnimation(this._close.bind(this));
      // };



      this._overlayElement.addEventListener('click', this._closeAfterAnnimationEnd.bind(this));
      document.addEventListener('keydown', this._onDocumentKeydown);
      if (this._closeButtonElement) {
        this._closeButtonElement.addEventListener('click', this._onCloseButtonClick);
      }
    };


    this._modalElement = document.querySelector(modalSelector);
    this._closeButtonElement = this._modalElement.querySelector(this.closeButtonSelector);
    this._modalElement.setAttribute('aria-hidden', false);
    this._modalElement.classList.remove(this.closeModalClass);
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

    this._modalElement.setAttribute('aria-hidden', true);
    this._modalElement.classList.add(this.closeModalClass);
    this._toggleOverlay();
    _removeHandlers();
    scrollLock({lock: false});
    this._focusContol();
    this._initElements();
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
      this._overlayElement = document.createElement('div');
      this._overlayElement.classList.add(this.overlaySelector);
      this._overlayElement.classList.add(this.modalOverlaySelector);
      this._modalElement.append(this._overlayElement);
    } else {
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


  _initElements() {
    this._triggerElement = null;
    this._modalElement = null;
    this._closeButtonElement = null;
    this._overlayElement = null;
  }




}





function initModal() {
  return new Modal();
}

export default initModal;
