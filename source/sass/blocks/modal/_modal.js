import { isEscapePressEvent } from './util.js';

const CLOSE_MODAL_CLASS = 'modal--closed';
const CLOSE_BUTTON_SELECTOR = '.modal__js-close-button';
const OVERLAY_SELECTOR = 'overlay';
const SHOW_DELAY = 200;
const CLOSE_DELAY = 200;


export function init(modalInfo) {
  modalInfo.forEach((modal) => {
    modal.buttonElement = document.querySelector(modal.buttonSelector);
    modal.isOpened = false;
    if (modal.buttonElement) {
      modal.buttonElement.addEventListener('click', onShowModalButtonClick.bind(null, modal));
      modal.buttonElement.addEventListener('mouseenter', onShowModalMouseEnter.bind(null, modal));
      modal.buttonElement.addEventListener('mouseleave', onShowModalMouseLeave.bind(null, modal));
    }
  });
}


function onShowModalButtonClick(modal, evt) {
  showModal(modal, evt);
}


function onShowModalMouseEnter(modal, evt) {
  modal.isCooldown = false;
  setTimeout(function () {
    if (!modal.isCooldown) {
      showModal(modal, evt);
    }
  }, SHOW_DELAY);
}


function onShowModalMouseLeave(modal) {
  modal.isCooldown = true;
}


function showModal(modal, evt) {
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
    modal.modalElement.before(modal.overlayElement);
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

    modal.onModalMouseLeave = function() {
      modal.isCooldown = false;
      setTimeout(function () {
        if (!modal.isCooldown) {
          closeModal(modal);
        }
      }, CLOSE_DELAY);
    };

    modal.onModalMouseEnter = function() {
      modal.isCooldown = true;
    };


    modal.overlayElement.addEventListener('click', modal.onOverlayClick);
    document.addEventListener('keydown', modal.onDocumentKeydown);
    if (modal.closeButtonElement) {
      modal.closeButtonElement.addEventListener('click', modal.onCloseButtonClick);
    }
    modal.modalElement.addEventListener('mouseleave', modal.onModalMouseLeave);
    modal.modalElement.addEventListener('mouseenter', modal.onModalMouseEnter);
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
    modal.modalElement.removeEventListener('mouseleave', modal.onModalMouseLeave);
    modal.modalElement.removeEventListener('mouseenter', modal.onModalMouseEnter);
  }
}
