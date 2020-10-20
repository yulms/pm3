export function isEscapePressEvent(evt, callback) {
  if (evt.code === 'Escape') {
    callback();
  }
}

export function isEnterPressEvent(evt, callback) {
  if (evt.code === 'Enter') {
    callback();
  }
}

export function isLeftButtonMouseDown(evt, callback) {
  if (evt.which === 1) {
    callback();
  }
}





let scrollPosition;
export function scrollLock({lock = true} = {}) {
  const htmlStyle = document.documentElement.style;

  if (lock) {
    scrollPosition = window.pageYOffset;
    htmlStyle.position = 'fixed';
    htmlStyle.top = -scrollPosition + 'px';
    htmlStyle.right = '0';
    htmlStyle.left = '0';
    htmlStyle.overflow = 'hidden';
  } else {
    htmlStyle.top = '';
    htmlStyle.position = '';
    htmlStyle.right = '';
    htmlStyle.left = '';
    htmlStyle.overflow = '';
    window.scrollTo(0, scrollPosition);
  }
}
