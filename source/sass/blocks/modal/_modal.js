import { isEscapePressEvent } from './util.js';

const CLOSE_MODAL_CLASS = 'modal--closed';
const CLOSE_BUTTON_SELECTOR = '.modal__js-close-button';
const OVERLAY_SELECTOR = 'overlay';


export function init(modalInfo) {
  modalInfo.forEach((modal) => {
    modal.buttonElement = document.querySelector(modal.buttonSelector);
    modal.isOpened = false;
    if (modal.buttonElement) {
      modal.buttonElement.addEventListener('click', onShowModalButtonClick.bind(null, modal));
    }
  });
}


function onShowModalButtonClick(modal, evt) {
  if (modal.isOpened) return;

  evt.preventDefault();
  createElements();
  addOverlay();
  removeCloseClass();
  addHandlers();
  modal.isOpened = true;

  function createElements() {
    if (!modal.modalElement) {
      modal.modalElement = document.querySelector(modal.modalSelector);
    }
    if (!modal.closeButtonElement) {
      modal.closeButtonElement = modal.modalElement.querySelector(CLOSE_BUTTON_SELECTOR);
    }
  }

  function addOverlay() {
    modal.overlayElement = document.createElement('div');
    modal.overlayElement.classList.add(OVERLAY_SELECTOR);
    modal.modalElement.prepend(modal.overlayElement);
  }

  function removeCloseClass() {
    modal.modalElement.classList.remove(CLOSE_MODAL_CLASS);
  }

  function addHandlers() {
    modal.onOverlayClick = function() {
      closeModal(modal);
    };

    modal.onDocumentKeydown = function(evt) {
      isEscapePressEvent(evt, closeModal.bind(null, modal));
    };

    modal.onCloseButtonClick = function() {
      closeModal(modal);
    };


    modal.overlayElement.addEventListener('click', modal.onOverlayClick);
    document.addEventListener('keydown', modal.onDocumentKeydown);
    if (modal.closeButtonElement) {
      modal.closeButtonElement.addEventListener('click', modal.onCloseButtonClick);
    }
  }
}


function closeModal(modal) {
  removeOverlay();
  addCloseClass();
  removeHandlers();
  modal.isOpened = false;

  function removeOverlay() {
    modal.overlayElement.remove();
  }

  function addCloseClass() {
    modal.modalElement.classList.add(CLOSE_MODAL_CLASS);
  }

  function removeHandlers() {
    modal.overlayElement.removeEventListener('click', modal.onOverlayClick);
    document.removeEventListener('keydown', modal.onDocumentKeydown);
    if (modal.closeButtonElement) {
      modal.closeButtonElement.removeEventListener('click', modal.onCloseButtonClick);
    }
  }
}
