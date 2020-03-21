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

let modalOpened;
function headerModalShow(button) {
  modalOverlay.classList.remove("closed");
  // добавляем класс открытия окна родителю
  modalOpened = button.parentNode;
  modalOpened.classList.add("header-modal--isopened");
  // навешиваем обработчик закрытия окна по уходу мыши
  modalOpened.addEventListener("mouseleave", function(evt) {
    evt.preventDefault();
    closeModals();
  });
}

const buttonContacts = document.querySelector(".header__button-tel");
buttonContacts.addEventListener("click", function(evt) {
  evt.preventDefault();
  headerModalShow(buttonContacts);
});
buttonContacts.addEventListener("mouseover", function(evt) {
  evt.preventDefault();
  headerModalShow(buttonContacts);
});
// открытие User Menu
const buttonUser = document.querySelector(".header__link--user");
buttonUser.addEventListener("click", function(evt) {
  evt.preventDefault();
  headerModalShow(buttonUser);
});
buttonUser.addEventListener("mouseover", function(evt) {
  evt.preventDefault();
  headerModalShow(buttonUser);
});

//
//
//
//
//

function closeModals() {
  secondaryMenu.classList.remove("header__top-menu--isopened");
  modalOverlay.classList.add("closed");
  let modalOpened = document.querySelector(".header-modal--isopened");
  if (modalOpened) {
    modalOpened.classList.remove("header-modal--isopened");
  }
}

modalOverlay.addEventListener("click", function(evt) {
  evt.preventDefault();
  closeModals();
});

// закрытие окна по нажатию esc
window.addEventListener("keydown", function(evt) {
  // если нажата esc
  if (evt.keyCode === 27) {
    if (modalOpened) closeModals();
  }
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
