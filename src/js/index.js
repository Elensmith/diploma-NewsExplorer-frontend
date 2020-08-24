import "../css/style.css";
// клик по "Показать еще" = добавится одна карточка (мало, да, но потом сделаю норм)
// все кнопки в хедере для образца, в мобильной надо закомментировать лишние, иначе не влезают
// клик по "Авторизоваться" = открыть попап авторизиции
// клик по "Зарегистрироваься" в попапе Авторизации = открыть попап Регистрации

// не смогла совладать с гридами в карточках, пока так, буду разбираться

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

buttonClose.addEventListener("click", () => {
  popup.classList.remove("popup_is-opened");
});

auth.addEventListener("click", () => {
  popupEnter.classList.add("popup_is-opened");
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
