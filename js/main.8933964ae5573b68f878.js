!function(e){var t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);o(1);const r=document.querySelector(".popup"),n=document.querySelector(".popup__close"),s=document.getElementById("popup__enter"),d=document.getElementById("open-popupEnter"),l=document.getElementById("open-popupRegistration"),c=document.getElementById("popupRegistration"),a=document.getElementById("search-button"),u=document.getElementById("preloader-searching"),i=document.getElementById("preloader-not-found"),_=document.getElementById("search-result-show-more"),m=document.querySelector(".search-result__card_off"),p=document.getElementById("header__menu-mobile-main-page"),f=document.querySelector(".header__menu-mobile_close"),g=document.querySelector(".header__menu"),h=document.querySelector(".header__menu-mobile_close"),y=document.querySelector(".header__buttons"),L=document.querySelector(".header__info"),b=document.querySelector(".search-result");p.addEventListener("click",()=>{y.classList.add("header__buttons_open"),g.classList.add("header_dark"),p.classList.add("header__menu-mobile_off"),h.classList.add("header__menu-mobile_on"),L.classList.add("header__info_filter"),b.classList.add("search-result_filter")}),f.addEventListener("click",()=>{y.classList.toggle("header__buttons_open"),g.classList.toggle("header_dark"),p.classList.toggle("header__menu-mobile_off"),f.classList.remove("header__menu-mobile_on"),L.classList.remove("header__info_filter"),b.classList.remove("search-result_filter")}),n.addEventListener("click",()=>{r.classList.remove("popup_is-opened"),p.classList.toggle("header__menu-mobile_off")}),d.addEventListener("click",()=>{s.classList.add("popup_is-opened"),y.classList.toggle("header__buttons_open"),g.classList.toggle("header_dark"),f.classList.remove("header__menu-mobile_on")}),l.addEventListener("click",()=>{c.classList.add("popup_is-opened"),s.classList.remove("popup_is-opened")}),a.addEventListener("click",()=>{u.classList.add("preloader_on"),i.classList.add("preloader_on")}),_.addEventListener("click",()=>{m.classList.remove("search-result__card_off")})},function(e,t,o){}]);