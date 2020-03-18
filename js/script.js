"use strict";

let buttonBurger = document.querySelector(".header__link--burger");
let secondaryMenu = document.querySelector(".header__top-menu");
let modalOverlay = document.querySelector(".modal-overlay");

buttonBurger.addEventListener("click", function(evt) {
  evt.preventDefault;
  secondaryMenu.classList.add("header__top-menu--active");
  modalOverlay.classList.remove("closed");
});

modalOverlay.addEventListener("click", function(evt) {
  evt.preventDefault;
  secondaryMenu.classList.remove("header__top-menu--active");
  modalOverlay.classList.add("closed");
});

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
