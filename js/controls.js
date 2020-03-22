"use strict";

// Контрол + - количество
document.addEventListener("click", function(evt) {
  let target = evt.target.closest(".quantity-input__button");
  if (!target) return;
  if (target.classList.contains("quantity-input__button--more")) {
    target.previousElementSibling.value++;
  } else {
    if (target.nextElementSibling.value <= 1) return;
    target.nextElementSibling.value--;
  }
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
