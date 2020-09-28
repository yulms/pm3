export function debounce(callback, ms) {
  let isCooldown = false;

  return function() {
    if (isCooldown) return;
    callback.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => isCooldown = false, ms);
  };
}