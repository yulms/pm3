"use strict";import{scrollLock}from"./util.js";const SHOW_TEXT_DATA_ATTR="showmoreShowtext",HIDE_TEXT_DATA_ATTR="showmoreHidetext",NODES_QUANTITY_DATA_ATTR="showmoreNodes",COLLAPSED_HEIGHT_DATA_ATTR="showmoreHeight",BUTTON_CLASS_DATA_ATTR="showmoreButtonClass",BUTTON_HTML='<button class="showmore__button link" aria-expanded="false" type="button">\n                      <svg class="showmore__button-icon" width="32" height="32">\n                        <use href="img/svg/_sprite.svg#icon-arrow"></use>\n                      </svg>\n                    </button>';class ShowmoreButton{constructor(t){let e={showText:t.dataset.showmoreShowtext||"Показать больше",hideText:t.dataset.showmoreHidetext||"Скрыть",additionalClass:t.dataset.showmoreButtonClass};Object.assign(this,e),this._createButton()}_createButton(){let t=document.createElement("div");t.innerHTML=BUTTON_HTML,this.element=t.firstChild,this.additionalClass&&this._addAdditionalClasses(),this.caption=document.createElement("span"),this.caption.innerText=this.showText,this.element.prepend(this.caption)}_addAdditionalClasses(){let t=this.additionalClass.split(" ");Array.isArray(t)&&t.forEach(t=>{this.element.classList.add(t)})}changeState({isExpanded:t}){this.element.setAttribute("aria-expanded",t),this.caption.innerText=t?this.hideText:this.showText}}class Showmore{constructor(t){Object.assign(this,{}),this.stateIsExpanded=!1,this.element=t,this.button=null}_createButton(){this.button=new ShowmoreButton(this.element)}_insertButton(){this.element.after(this.button.element)}}class ShowmoreNodes extends Showmore{constructor(t){super(t);const e={alwaysVisibleNodeQuantity:t.dataset.showmoreNodes||2};Object.assign(this,e),this._toggleNodes({isHidden:!0})&&(super._createButton(),super._insertButton(),this.button.element.addEventListener("click",this._onButtonClick.bind(this)))}_toggleNodes({isHidden:t}){let e=0,s=this.element.children;for(let i=this.alwaysVisibleNodeQuantity;i<s.length;i++)s[i].hidden=t,e++;return e}_onButtonClick(){this.stateIsExpanded?this._hideNodes():this._showNodes()}_showNodes(){this.element.addEventListener("transitionend",()=>{scrollLock({lock:!1}),this.element.style.height="auto"},{once:!0}),this.collapsedHeight=this.element.scrollHeight,scrollLock({lock:!0}),this.element.style.height=this.element.scrollHeight+"px",this._toggleNodes({isHidden:!1}),this.element.style.height=this.element.scrollHeight+"px",this.button.changeState({isExpanded:!0}),this.stateIsExpanded=!0}_hideNodes(){this.element.addEventListener("transitionend",()=>{this._toggleNodes({isHidden:!0}),scrollLock({lock:!1}),this.element.style.height="auto",this.element.style.transitionDuration=""},{once:!0}),this.element.style.height=this.element.scrollHeight+"px",setTimeout(()=>{scrollLock({lock:!0}),this.element.style.transitionDuration="75ms",this.element.style.height=this.collapsedHeight+"px"},0),this.button.changeState({isExpanded:!1}),this.stateIsExpanded=!1}}class ShowmoreHeight extends Showmore{constructor(t){super(t);const e={collapsedHeight:t.dataset.showmoreHeight||226};Object.assign(this,e),this.element.scrollHeight>this.collapsedHeight&&(this.element.style.height=this.collapsedHeight+"px",super._createButton(),super._insertButton(),this.button.element.addEventListener("click",()=>{this.stateIsExpanded?this._collapse():this._show()}))}_show(){this.element.addEventListener("transitionend",()=>{scrollLock({lock:!1}),this.element.style.height="auto"},{once:!0}),scrollLock({lock:!0}),this.element.style.height=this.element.scrollHeight+"px",this.button.changeState({isExpanded:!0}),this.stateIsExpanded=!0}_collapse(){this.element.addEventListener("transitionend",()=>{scrollLock({lock:!1}),this.element.style.transitionDuration=""},{once:!0}),this.element.style.height=this.element.scrollHeight+"px",setTimeout(()=>{scrollLock({lock:!0}),this.element.style.transitionDuration="75ms",this.element.style.height=this.collapsedHeight+"px"},0),this.button.changeState({isExpanded:!1}),this.stateIsExpanded=!1}}const selector="[data-showmore]",actionAttr="showmoreAction",typeDataAttr={NODE_TYPE:"hideNodes",HEIGHT_TYPE:"hideHeight"},typeActions={[typeDataAttr.NODE_TYPE]:t=>new ShowmoreNodes(t),[typeDataAttr.HEIGHT_TYPE]:t=>new ShowmoreHeight(t)};function initShowmores(){return Array.from(document.querySelectorAll(selector)).map(t=>typeActions[t.dataset[actionAttr]](t))}export default initShowmores;