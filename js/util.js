export function isEscapePressEvent (evt, callback) {
  if (evt.code === 'Escape') {
    callback();
  }
}

export function isEnterPressEvent (evt, callback) {
  if (evt.code === 'Enter') {
    callback();
  }
}
