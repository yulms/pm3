import{isTouchDevice}from"./util.js";class MainNav{constructor(e){Object.assign(this,{mainSelector:".main-nav",mainListSelector:".main-nav__list--lvl1",firstLevelLinkSelector:".main-nav__link--lvl1"},e),this._mainElement=null,this._firstClickedElement=null,isTouchDevice()&&(this._init(),this._enableFirstClickPrevention())}_init(){this._mainElement=document.querySelector(this.mainSelector)}_enableFirstClickPrevention(){this._mainElement.addEventListener("click",e=>{let i=e.target.closest(this.firstLevelLinkSelector);i&&(this._firstClickedElement!==i&&(e.preventDefault(),document.addEventListener("click",e=>{e.target.closest(this.mainListSelector)||(this._firstClickedElement=null)},{capture:!0,once:!0})),this._firstClickedElement=i)})}}function initMainNav(){return new MainNav}export default initMainNav;