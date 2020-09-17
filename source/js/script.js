import * as modal from './_modal.js';
modal.init([
  {
    buttonSelector: '.header__contacts-button',
    modalSelector: '.header__contacts'
  },{
    buttonSelector: '.header__user .header__link',
    modalSelector: '.header__user'
  },{
    buttonSelector: '.header__cart .header__link',
    modalSelector: '.header__cart'
  }
]);

import * as quantityInput from './_quantity-input.js';
quantityInput.init();

import * as headerTopMenu from './_header__top-menu.js';
headerTopMenu.init();



// let modalOpened;
// function headerModalShow(button) {
//   modalOverlay.classList.remove('modal-overlay--closed');
//   modalOpened = button.parentElement;
//   modalOpened.classList.add('modal--isopened');
//   modalOpened.addEventListener('mouseleave', function(evt) {
//     evt.preventDefault();
//     closeModals();
//   });

//   let closeButton = document.querySelector('.modal--isopened' + ' .button--modal-close');
//   closeButton.addEventListener('click', function(evt) {
//     evt.preventDefault();
//     closeModals();
//   });
// }

// открытие Телефонов
// const buttonContacts = document.querySelector('.header__contacts-button');
// buttonContacts.addEventListener('click', function(evt) {
//   evt.preventDefault();
//   headerModalShow(buttonContacts);
// });
// buttonContacts.addEventListener('mouseover', function(evt) {
//   evt.preventDefault();
//   headerModalShow(buttonContacts);
// });
// открытие User Menu
// const buttonUser = document.querySelector('.header__user .header__link');
// buttonUser.addEventListener('click', function(evt) {
//   evt.preventDefault();
//   headerModalShow(buttonUser);
// });
// buttonUser.addEventListener('mouseover', function(evt) {
//   evt.preventDefault();
//   headerModalShow(buttonUser);
// });
// открытие Корзины
// const buttonCart = document.querySelector('.header__cart .header__link');
// buttonCart.addEventListener('click', function(evt) {
//   evt.preventDefault();
//   headerModalShow(buttonCart);
// });
// buttonCart.addEventListener('mouseover', function(evt) {
//   evt.preventDefault();
//   headerModalShow(buttonCart);
// });

//
//
//
//
//

// function closeModals() {
//   secondaryMenu.classList.remove('header__top-menu--isopened');
//   modalOverlay.classList.add('modal-overlay--closed');
//   let modalOpened = document.querySelector('.modal--isopened');
//   if (modalOpened) {
//     modalOpened.classList.remove('modal--isopened');
//   }
// }

// modalOverlay.addEventListener('click', function(evt) {
//   evt.preventDefault();
//   closeModals();
// });

// закрытие окна по нажатию esc
// window.addEventListener('keydown', function(evt) {
//   if (evt.keyCode === 27) {
//     if (modalOpened) closeModals();
//   }
// });

// Закрытие главного меню по клику на кнопке закрыть
// const closeMainNav = document.querySelectorAll('.js-button--main-nav-close');
// for (let i = 0; i < closeMainNav.length; i++) {
//   closeMainNav[i].addEventListener('click', function(evt) {
//     // поиск элемента с фокусом и его расфокусировка
//     let el = document.querySelector(':focus');
//     if (el) el.blur();
//   });
// }
