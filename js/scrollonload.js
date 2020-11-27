'use strict';

const DATA_ATTR_SELECTOR = '[data-scroll-on-load]';

function initScrollOnLoad() {
  let element = document.querySelector(DATA_ATTR_SELECTOR);
  if (!element) return;

  document.addEventListener('DOMContentLoaded', () => {
    let elementCoords = element.getBoundingClientRect();
    let elementTop = pageYOffset + elementCoords.top;

    window.scrollTo(0, elementTop);
  }, {once: true});

}


export default initScrollOnLoad;
