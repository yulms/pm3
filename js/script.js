"use strict";

const modalOverlay = document.querySelector(".modal-overlay");

// бургер - открытие вспомогательного меню
const buttonBurger = document.querySelector(".header__burger");
const secondaryMenu = document.querySelector(".header__top-menu");
buttonBurger.addEventListener("click", function(evt) {
  evt.preventDefault();
  secondaryMenu.classList.add("header__top-menu--isopened");
  modalOverlay.classList.remove("closed");
});

// открытие окна телефонов
const modalTel = document.querySelector(".header__contacts-modal");
// родительский блок, с которого отлавливаем mouseleave
const contactsBlock = modalTel.parentNode;
function openModalTel() {
  modalOverlay.classList.remove("closed");
  contactsBlock.classList.add("header__contacts--isopened");
}

const buttonTel = document.querySelector(".header__button-tel");

buttonTel.addEventListener("click", function(evt) {
  evt.preventDefault();
  openModalTel();
});

buttonTel.addEventListener("mouseover", function(evt) {
  evt.preventDefault();
  openModalTel();
});

// открытие User Menu
const modalUser = document.querySelector(".user-menu");
// родительский блок, с которого отлавливаем mouseleave
const userBlock = modalUser.parentNode;
function openModalUser() {
  modalOverlay.classList.remove("closed");
  userBlock.classList.add("header__user--isopened");
}

const buttonUser = document.querySelector(".header__link--user");
buttonUser.addEventListener("click", function(evt) {
  evt.preventDefault();
  openModalUser();
});

buttonUser.addEventListener("mouseover", function(evt) {
  evt.preventDefault();
  openModalUser();
});

//
//
//
//
//

function closeModals() {
  secondaryMenu.classList.remove("header__top-menu--isopened");
  modalOverlay.classList.add("closed");
  contactsBlock.classList.remove("header__contacts--isopened");
  userBlock.classList.remove("header__user--isopened");
}

modalOverlay.addEventListener("click", function(evt) {
  evt.preventDefault();
  closeModals();
});

contactsBlock.addEventListener("mouseleave", function(evt) {
  evt.preventDefault();
  closeModals();
});

userBlock.addEventListener("mouseleave", function(evt) {
  evt.preventDefault();
  closeModals();
});

// Закрытие главного меню по клику на кнопке закрыть
const closeMainNav = document.querySelectorAll(".js-button--main-nav-close");
for (let i = 0; i < closeMainNav.length; i++) {
  closeMainNav[i].addEventListener("click", function(evt) {
    // поиск элемента с фокусом и его расфокусировка
    let el = document.querySelector(":focus");
    if (el) el.blur();
  });
}

//
//
//
//
//
//

// Double Range Slider
// let rangeSlider = document.getElementById("range-slider");
// noUiSlider.create(rangeSlider, {
//   range: {
//     min: [1],
//     max: [1000]
//   },
//   start: [1, 1000],
// минимальная разница
// margin: 0,
//цветной центр
//   connect: true,
//   step: 1,
//   format: {
//     to: function(value) {
//       return parseInt(value);
//     },
//     from: function(value) {
//       return parseInt(value);
//     }
//   }
// });
// let inputFrom = document.getElementById("input-from");
// let inputTo = document.getElementById("input-to");
// let inputs = [inputFrom, inputTo];
// rangeSlider.noUiSlider.on("update", function(values, handle) {
//   inputs[handle].value = values[handle];
// });
// inputFrom.addEventListener("change", function() {
//   rangeSlider.noUiSlider.set([this.value, null]);
// });
// inputTo.addEventListener("change", function() {
//   rangeSlider.noUiSlider.set([null, this.value]);
// });
