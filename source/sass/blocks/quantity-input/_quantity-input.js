export function init() {
  let quantityInputElement = document.querySelector('.quantity-input');
  if (quantityInputElement) {
    addHandlers();
  }
}

function addHandlers() {
  document.addEventListener('click', function(evt) {
    let target = evt.target.closest('.quantity-input__button');
    if (!target) return;
    if (target.classList.contains('quantity-input__button--more')) {
      target.previousElementSibling.value++;
    } else {
      if (target.nextElementSibling.value <= 1) return;
      target.nextElementSibling.value--;
    }
  });
}
