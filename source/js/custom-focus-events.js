'use strict';

// События focusEnter и focusLeave - аналоги mouseEnter и mouseLeave


function appendCustomFocusEvents(containerElement) {

  let focusInside = false;

  function _onContainerFocusIn() {
    if (!focusInside) {
      containerElement.dispatchEvent(new CustomEvent('focusEnter'));
      focusInside = true;
    }
  }

  function  _onContainerFocusOut() {
    if (!containerElement.contains(document.activeElement)) {
      containerElement.dispatchEvent(new CustomEvent('focusLeave'));
      focusInside = false;
    }
  }


  containerElement.addEventListener('focusin', _onContainerFocusIn);
  containerElement.addEventListener('focusout', () => {
    setTimeout(_onContainerFocusOut, 0);
  });
}


export default appendCustomFocusEvents;
