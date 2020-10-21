import "../css/style.css";
import MainApi from "./api/MainApi";
import NewsApi from "./api/NewsApi";
import Popup from "./components/Popup";
import Form from "./components/Form";
import NewsCard from "./components/NewsCard";
import NewsCardList from "./components/NewsCardList";
import Header from "./components/Header";
import constants from "./constants/constants";
import {
  dateFromConverter,
  changeDateFormat,
  today,
} from "./utils/dateConverter";

(() => {
  const {
    API_KEY, NEWS_URL, MAIN_URL, TOKEN,
  } = constants;

  // дата сегодня
  const dateSevenDaysAgo = changeDateFormat(dateFromConverter());
  const dateToday = changeDateFormat(today());

  const template = document.getElementById("card-template");
  const page = document;
  const buttonClose = document.querySelector(".popup__close");
  const buttonLogout = document.querySelector(".button__logout");
  const auth = document.getElementById("open-popupEnter");
  const registration = document.getElementById("open-popupRegistration");
  const enterForm = document.getElementById("form-enter");
  const searchForm = document.getElementById("form-search");
  const registrationForm = document.getElementById("form-registration");
  const searchButton = document.getElementById("search-button");
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
  let isLoggedIn = false;

  const mainApi = new MainApi(MAIN_URL);
  const newsApi = new NewsApi(NEWS_URL, API_KEY, dateSevenDaysAgo, dateToday);
  const popupEnter = new Popup(document.getElementById("popup__enter"));
  const popupRegistration = new Popup(
    document.getElementById("popupRegistration"),
  );
  const popupUserAdded = new Popup(
    document.getElementById("popupUserAdded"),
  );
  const newsCard = new NewsCard("", template, "");
  const validateEnterForm = new Form(enterForm, mainApi, popupEnter, newsCard, "");
  const validateRegistrationForm = new Form(
    registrationForm,
    mainApi,
    popupRegistration,
    newsCard,
    popupUserAdded,
  );
  const getTopicSearch = new Form(searchForm, "", "");
  const header = new Header(page);

  // проверка авторизации при загрузке страницы
  if (TOKEN) {
    mainApi
      .getUserData(TOKEN)
      .then((data) => {
        isLoggedIn = true;
        header.render(isLoggedIn, data.name);
      })
      .catch(() => {
        isLoggedIn = false;
        header.render(isLoggedIn, "");
      });
  }

  // открыть мобильное меню
  buttonMobileMenuMain.addEventListener("click", () => {
    mobileMenuMain.classList.add("header__buttons_open");
    headerLogo.classList.add("header_dark");
    buttonMobileMenuMain.classList.add("header__menu-mobile_off");
    addCloseButtonHeader.classList.add("header__menu-mobile_on");
    headerInfo.classList.add("header__info_filter");
    searchResult.classList.add("search-result_filter");
  });
  // закрыть мобильное меню
  buttonCloseMobileMenu.addEventListener("click", () => {
    mobileMenuMain.classList.toggle("header__buttons_open");
    headerLogo.classList.toggle("header_dark");
    buttonMobileMenuMain.classList.toggle("header__menu-mobile_off");
    buttonCloseMobileMenu.classList.remove("header__menu-mobile_on");
    headerInfo.classList.remove("header__info_filter");
    searchResult.classList.remove("search-result_filter");
  });
  // закрыть попап
  buttonClose.addEventListener("click", () => {
    popupEnter.close();
    validateEnterForm.reset();
    buttonMobileMenuMain.classList.toggle("header__menu-mobile_off");
  });

  // открыть попап авторизации
  auth.addEventListener("click", () => {
    popupEnter.open(popupEnter);
    validateEnterForm.setEventListeners();
    mobileMenuMain.classList.toggle("header__buttons_open");
    headerLogo.classList.toggle("header_dark");
    buttonCloseMobileMenu.classList.remove("header__menu-mobile_on");
  });
  // открыть попап ренистрации (в попапе авторизации)
  registration.addEventListener("click", () => {
    popupEnter.close(popupEnter);
    popupRegistration.open(popupRegistration);
    validateRegistrationForm.setEventListeners();
  });

  //  валидация строки поиска
  getTopicSearch.setEventListeners();
  // поиск новостей (клик по кнопке "поиск")
  searchButton.addEventListener("click", () => {
    const newsCardList = new NewsCardList(
      template,
      newsApi,
      getTopicSearch,
      (element, card) => new NewsCard(element, card, page, mainApi, newsCardList),
      page,
      isLoggedIn,
    );

    newsCardList.searchingNews();
  });

  // выход из профиля
  buttonLogout.addEventListener("click", () => {
    header.logOut();
  });

  // const buttonEnter = document.getElementById("button-submit-enter");
  // buttonEnter.addEventListener("click", () => {
  //   mainApi.signup();
  // });
})();

// popup "Вы успешно зарегистрированы" можно открыть добавив popup_is-opened
// (добавить закрыть и реакцию на клик)
