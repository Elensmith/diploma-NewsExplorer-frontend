import "../css/style.css";
import MainApi from "./api/MainApi";
import NewsApi from "./api/NewsApi";
import Popup from "./components/Popup";
import Form from "./components/Form";
import NewsCard from "./components/NewsCard";
import NewsCardList from "./components/NewsCardList";
import constants from "./constants/constants";

const { API_KEY, NEWS_URL, MAIN_URL } = constants;
// (function () {
const mainApi = new MainApi(MAIN_URL);
const newsApi = new NewsApi(NEWS_URL, API_KEY, "2020-09-01", "2020-09-11");
const buttonClose = document.querySelector(".popup__close");
const popupEnter = new Popup(document.getElementById("popup__enter"));
const auth = document.getElementById("open-popupEnter");
const registration = document.getElementById("open-popupRegistration");
const newsArray = [];
const template = document.getElementById("card-template").content;
const templateCopy = document.importNode(template, true);
// document.querySelector(".search-result__cards").appendChild(templateCopy);
const newsCardList = new NewsCardList(newsArray, template, newsApi);
const newsCard = new NewsCard(newsArray, templateCopy);

const popupRegistration = new Popup(
  document.getElementById("popupRegistration")
);
const searchButton = document.getElementById("search-button");
const preloaderSearching = document.getElementById("preloader-searching");
const preloaderNotFound = document.getElementById("preloader-not-found");
const showMoreResult = document.getElementById("search-result-show-more");
const moreCards = document.querySelector(".search-result__card_off");
const buttonMobileMenuMain = document.getElementById(
  "header__menu-mobile-main-page"
);
const buttonCloseMobileMenu = document.querySelector(
  ".header__menu-mobile_close"
);
const headerLogo = document.querySelector(".header__menu");
const addCloseButtonHeader = document.querySelector(
  ".header__menu-mobile_close"
);
const mobileMenuMain = document.querySelector(".header__buttons");
const headerInfo = document.querySelector(".header__info");
const searchResult = document.querySelector(".search-result");
const enterForm = document.getElementById("form-enter");
const registrationForm = document.getElementById("form-registration");
const validateEnterForm = new Form(enterForm, mainApi, popupEnter);
const validateRegistrationForm = new Form(
  registrationForm,
  mainApi,
  popupRegistration
);

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
  popupEnter.close();
  validateEnterForm.reset();

  buttonMobileMenuMain.classList.toggle("header__menu-mobile_off");
});

auth.addEventListener("click", () => {
  popupEnter.open(popupEnter);
  validateEnterForm.setEventListeners();
  mobileMenuMain.classList.toggle("header__buttons_open");
  headerLogo.classList.toggle("header_dark");
  buttonCloseMobileMenu.classList.remove("header__menu-mobile_on");
});

registration.addEventListener("click", () => {
  popupEnter.close(popupEnter);
  popupRegistration.open(popupRegistration);

  validateRegistrationForm.setEventListeners();
});

// const templateCopy = document.importNode(template, true);
//
searchButton.addEventListener("click", () => {
  newsApi
    .getNews("apple")
    .then((res) => {
      res.forEach((element) => {
        // newsArray.push(element);
        const newsCards = new NewsCard(element, templateCopy);
        console.log(newsCards);
        newsCards.setDataCard();
      });
      // console.log(newsArray);
    })
    .catch((err) => {
      console.log(err);
    });

  // newsCard.setDataCard();
  // newsCardList.renderResults();
});
// });
// .then((res) => {
// const articles = [res.articles];
// articles.forEach((article) => {
//   newsArray.push(article);
// });
// console.log(newsArray);
// });
// const date = new NewsCard();
// date._changeDateFormat(new Date());
// preloaderSearching.classList.add("preloader_on");
// preloaderNotFound.classList.add("preloader_on");

showMoreResult.addEventListener("click", () => {
  moreCards.classList.remove("search-result__card_off");
});

// const buttonEnter = document.getElementById("button-submit-enter");
// buttonEnter.addEventListener("click", () => {
//   mainApi.signup();
// });

// })();

// клик по "Показать еще" = добавится одна карточка (мало, да, но потом сделаю норм)
// все кнопки в хедере для образца, в мобильной надо закомментировать лишние, иначе не влезают
// клик по "Авторизоваться" = открыть попап авторизиции
// клик по "Зарегистрироваься" в попапе Авторизации = открыть попап Регистрации

// иконки "Сохранить себе и Мусорка" только в одном состоянии,
// потом сделаю шаблон с бэкграудом где они будут меняться

// popup "Вы успешно зарегистрированы" можно открыть добавив popup_is-opened
// (добавить закрыть и реакцию на клик)
