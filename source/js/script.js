'use strict';

const modalOverlay = document.querySelector('.modal-overlay');

// бургер - открытие вспомогательного меню
const buttonBurger = document.querySelector('.header__burger');
const secondaryMenu = document.querySelector('.header__top-menu');
buttonBurger.addEventListener('click', function(evt) {
  evt.preventDefault();
  secondaryMenu.classList.add('header__top-menu--isopened');
  modalOverlay.classList.remove('modal-overlay--closed');
});

let modalOpened;
function headerModalShow(button) {
  modalOverlay.classList.remove('modal-overlay--closed');
  // добавляем класс открытия окна родителю
  modalOpened = button.parentElement;
  modalOpened.classList.add('header-modal--isopened');
  // навешиваем обработчик закрытия модального окна по уходу мыши
  modalOpened.addEventListener('mouseleave', function(evt) {
    evt.preventDefault();
    closeModals();
  });

  let closeButton = document.querySelector('.header-modal--isopened' + ' .button--modal-close');
  closeButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    closeModals();
  });
}

// открытие Телефонов
const buttonContacts = document.querySelector('.header__button-tel');
buttonContacts.addEventListener('click', function(evt) {
  evt.preventDefault();
  headerModalShow(buttonContacts);
});
buttonContacts.addEventListener('mouseover', function(evt) {
  evt.preventDefault();
  headerModalShow(buttonContacts);
});
// открытие User Menu
const buttonUser = document.querySelector('.header__link--user');
buttonUser.addEventListener('click', function(evt) {
  evt.preventDefault();
  headerModalShow(buttonUser);
});
buttonUser.addEventListener('mouseover', function(evt) {
  evt.preventDefault();
  headerModalShow(buttonUser);
});
// открытие Корзины
const buttonCart = document.querySelector('.header__link--cart');
buttonCart.addEventListener('click', function(evt) {
  evt.preventDefault();
  headerModalShow(buttonCart);
});
buttonCart.addEventListener('mouseover', function(evt) {
  evt.preventDefault();
  headerModalShow(buttonCart);
});

//
//
//
//
//

function closeModals() {
  secondaryMenu.classList.remove('header__top-menu--isopened');
  modalOverlay.classList.add('modal-overlay--closed');
  let modalOpened = document.querySelector('.header-modal--isopened');
  if (modalOpened) {
    modalOpened.classList.remove('header-modal--isopened');
  }
}

modalOverlay.addEventListener('click', function(evt) {
  evt.preventDefault();
  closeModals();
});

// закрытие окна по нажатию esc
window.addEventListener('keydown', function(evt) {
  // если нажата esc
  if (evt.keyCode === 27) {
    if (modalOpened) closeModals();
  }
});

// Закрытие главного меню по клику на кнопке закрыть
const closeMainNav = document.querySelectorAll('.js-button--main-nav-close');
for (let i = 0; i < closeMainNav.length; i++) {
  closeMainNav[i].addEventListener('click', function(evt) {
    // поиск элемента с фокусом и его расфокусировка
    let el = document.querySelector(':focus');
    if (el) el.blur();
  });
}
