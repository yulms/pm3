import { isEscapePressEvent } from './util.js';

const CLOSE_MODAL_CLASS = 'modal--closed';
const CLOSE_BUTTON_SELECTOR = '.modal__js-close-button';
const OVERLAY_SELECTOR = 'overlay';
const SHOW_DELAY = 500;
const CLOSE_DELAY = 1000;



class Modal {
  constructor({openButtonSelector, modalSelector}) {
    this._isOpened = false;
    this._buttonElement = document.querySelector(openButtonSelector);
    this._buttonElement.addEventListener('click', this._showModal.bind(this));
    this._buttonElement.addEventListener('mouseenter', (evt) => {
      this._isCooldown = false;
      setTimeout(() => {
        if (!this._isCooldown) {
          this._showModal(evt);
        }
      }, SHOW_DELAY);
    });
    this._buttonElement.addEventListener('mouseleave', () => this._isCooldown = true);
    this._modalSelector = modalSelector;
  }


  _showModal (evt) {

    const createElements = () => {
      if (!this._modalElement) {
        this._modalElement = document.querySelector(this._modalSelector);
      }
      if (!this._closeButtonElement) {
        this._closeButtonElement = this._modalElement.querySelector(CLOSE_BUTTON_SELECTOR);
      }
    };

    const addOverlay = () => {
      this._overlayElement = document.createElement('div');
      this._overlayElement.classList.add(OVERLAY_SELECTOR);
      this._modalElement.before(this._overlayElement);
    };

    const removeCloseClass = () => {
      this._modalElement.classList.remove(CLOSE_MODAL_CLASS);
    };

    const addHandlers = () => {
      this._onOverlayClick = () => {
        this._closeModal();
      };

      this._onDocumentKeydown = (evt) => {
        isEscapePressEvent(evt, this._closeModal.bind(this));
      };

      this._onCloseButtonClick = () => {
        this._closeModal();
      };

      this._onModalMouseLeave = () => {
        this._isCooldown = false;
        setTimeout(() => {
          if (!this._isCooldown) {
            this._closeModal();
          }
        }, CLOSE_DELAY);
      };

      this._onModalMouseEnter = () => {
        this._isCooldown = true;
      };

      this._overlayElement.addEventListener('click', this._onOverlayClick);
      document.addEventListener('keydown', this._onDocumentKeydown);
      if (this._closeButtonElement) {
        this._closeButtonElement.addEventListener('click', this._onCloseButtonClick);
      }
      this._modalElement.addEventListener('mouseleave', this._onModalMouseLeave);
      this._modalElement.addEventListener('mouseenter', this._onModalMouseEnter);
    };


    if (this._isOpened) return;
    evt.preventDefault();
    createElements();
    addOverlay();
    removeCloseClass();
    addHandlers();
    this._isOpened = true;
  }


  _closeModal() {
    const removeOverlay = () => {
      this._overlayElement.remove();
    };

    const addCloseClass = () => {
      this._modalElement.classList.add(CLOSE_MODAL_CLASS);
    };

    const removeHandlers = () => {
      this._overlayElement.removeEventListener('click', this._onOverlayClick);
      document.removeEventListener('keydown', this._onDocumentKeydown);
      if (this._closeButtonElement) {
        this._closeButtonElement.removeEventListener('click', this._onCloseButtonClick);
      }
      this._modalElement.removeEventListener('mouseleave', this._onModalMouseLeave);
      this._modalElement.removeEventListener('mouseenter', this._onModalMouseEnter);
    };

    removeOverlay();
    addCloseClass();
    removeHandlers();
    this._isOpened = false;

  }

}

export default Modal;
