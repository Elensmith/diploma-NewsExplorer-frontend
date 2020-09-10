import "../css/style.css";

// клик по "Показать еще" = добавится одна карточка (мало, да, но потом сделаю норм)
// все кнопки в хедере для образца, в мобильной надо закомментировать лишние, иначе не влезают
// клик по "Авторизоваться" = открыть попап авторизиции
// клик по "Зарегистрироваься" в попапе Авторизации = открыть попап Регистрации

// иконки "Сохранить себе и Мусорка" только в одном состоянии,
// потом сделаю шаблон с бэкграудом где они будут меняться

// popup "Вы успешно зарегистрированы" можно открыть добавив popup_is-opened
// (добавить закрыть и реакцию на клик)

const popup = document.querySelector(".popup");
const buttonClose = document.querySelector(".popup__close");
const popupEnter = document.getElementById("popup__enter");
const auth = document.getElementById("open-popupEnter");
const registration = document.getElementById("open-popupRegistration");
const popupRegistration = document.getElementById("popupRegistration");
const searchButton = document.getElementById("search-button");
const preloaderSearching = document.getElementById("preloader-searching");
const preloaderNotFound = document.getElementById("preloader-not-found");
const showMoreResult = document.getElementById("search-result-show-more");
const moreCards = document.querySelector(".search-result__card_off");
const buttonMobileMenuMain = document.getElementById(
  "header__menu-mobile-main-page",
);
const buttonCloseMobileMenu = document.querySelector(
  ".header__menu-mobile_close",
);
const headerLogo = document.querySelector(".header__menu");
const addCloseButtonHeader = document.querySelector(
  ".header__menu-mobile_close",
);
const mobileMenuMain = document.querySelector(".header__buttons");
const headerInfo = document.querySelector(".header__info");
const searchResult = document.querySelector(".search-result");

buttonMobileMenuMain.addEventListener("click", () => {
  mobileMenuMain.classList.add("header__buttons_open");
  headerLogo.classList.add("header_dark");
  buttonMobileMenuMain.classList.add("header__menu-mobile_off");
  addCloseButtonHeader.classList.add("header__menu-mobile_on");
  headerInfo.classList.add("header__info_filter");
  searchResult.classList.add("search-result_filter");
});

buttonCloseMobileMenu.addEventListener("click", () => {
  mobileMenuMain.classList.toggle("header__buttons_open");
  headerLogo.classList.toggle("header_dark");
  buttonMobileMenuMain.classList.toggle("header__menu-mobile_off");
  buttonCloseMobileMenu.classList.remove("header__menu-mobile_on");
  headerInfo.classList.remove("header__info_filter");
  searchResult.classList.remove("search-result_filter");
});

buttonClose.addEventListener("click", () => {
  popup.classList.remove("popup_is-opened");
  buttonMobileMenuMain.classList.toggle("header__menu-mobile_off");
});

auth.addEventListener("click", () => {
  popupEnter.classList.add("popup_is-opened");
  mobileMenuMain.classList.toggle("header__buttons_open");
  headerLogo.classList.toggle("header_dark");
  buttonCloseMobileMenu.classList.remove("header__menu-mobile_on");
});

registration.addEventListener("click", () => {
  popupRegistration.classList.add("popup_is-opened");
  popupEnter.classList.remove("popup_is-opened");
});

searchButton.addEventListener("click", () => {
  preloaderSearching.classList.add("preloader_on");
  preloaderNotFound.classList.add("preloader_on");
});

showMoreResult.addEventListener("click", () => {
  moreCards.classList.remove("search-result__card_off");
});
