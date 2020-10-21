import BaseComponent from "./BaseComponent";
import { changeDate } from "../utils/dateConverter";

//  Класс карточки новости
export default class NewsCard extends BaseComponent {
  constructor(data, template, page, mainApi, newsCardList) {
    super();
    this.data = data;
    this.template = template;
    this.page = page;
    this.mainApi = mainApi;
    this.newsCardList = newsCardList;
    this.setDataCard = this.setDataCard.bind(this);
    this._searchResultLoginAsk = this._searchResultLoginAsk.bind(this);
    this.renderIcon = this.renderIcon.bind(this);
    this._iconActive = this._iconActive.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.getDataToSaveArticle = this.getDataToSaveArticle.bind(this);
  }

  // отвечает за отрисовку иконки карточки. У этой иконки три состояния: иконка незалогиненного
  // пользователя, активная иконка залогиненного, неактивная иконка залогиненного.
  renderIcon(isLoggedIn) {
    const cardMark = this.template.querySelector(".search-result__addIcon");
    const deleteMark = this.template.querySelector(".search-result__deleteIcon");
    // console.log(isLoggedIn, 3);
    // console.log(cardMark, "render");

    this.isLoggedIn = isLoggedIn;
    if (isLoggedIn && cardMark) {
      cardMark.classList.add("search-result__add-button");
      this._iconActive();
      // console.log(cardMark);
    } else if (isLoggedIn && deleteMark) {
      // console.log(deleteMark);
      deleteMark.classList.add("search-result__delete-button");
      deleteMark.classList.add("search-result__add-button");
      this._searchResultLoginAsk();
      this._iconActive();
    } else {
      cardMark.classList.add("search-result__add-button");
      this._searchResultLoginAsk();
    }
  }

  // слушатель на клик по иконке добавить себе (синяя заливка)
  _iconActive() {
    // console.log("icon here");
    const cardsToListen = this.page.querySelectorAll(".search-result__icon");
    // console.log(cardsToListen.length);
    Array.from(cardsToListen).forEach((element) => {
      element.addEventListener("click", () => {
        if (element.classList.contains("search-result__add-button_active") || element.classList.contains("search-result__deleteIcon")) {
          const card = element.closest(".search-result__card");
          const id = card.getAttribute("id");
          this.deleteArticle(id);
          element.classList.remove("search-result__add-button_active");
          console.log("delete this");
          card.removeAttribute("id");
        } else {
          element.classList.add("search-result__add-button_active");
          console.log("save here");
          this.saveArticle(element);
        }
      });
    });
  }

  // подсказка рядом с кнопкой удалить/добавить себе
  _searchResultLoginAsk() {
    const cardsToListen = this.page.querySelectorAll(".search-result__card");
    cardsToListen.forEach((card) => {
      const addButton = card.querySelector(".search-result__addIcon");
      const deleteButton = card.querySelector(".search-result__deleteIcon");
      const loginAsk = card.querySelector(".search-result__login-ask");
      // console.log("232323");

      if (addButton) {
        // console.log("addButton");
        addButton.addEventListener("mouseover", () => {
          loginAsk.classList.add("search-result__login-ask_on");
        });
        addButton.addEventListener("mouseout", () => {
          loginAsk.classList.remove("search-result__login-ask_on");
        });
      } else if (deleteButton) {
        // console.log(deleteButton);
        deleteButton.addEventListener("mouseover", () => {
          loginAsk.classList.add("search-result__login-ask_on");
        });
        deleteButton.addEventListener("mouseout", () => {
          loginAsk.classList.remove("search-result__login-ask_on");
        });
      }
    });
  }

  createCard() {
    this.page
      .querySelector(".search-result__cards")
      .append(
        this.page.getElementById("card-template").content.cloneNode(true),
      );
  }

  setDataCard(isLoggedIn) {
    if (this.data._id) {
      // console.log(this.template);
      this.template.setAttribute("id", `${this.data._id}`);
      this.template.querySelector(
        ".search-result__tag_on",
      ).textContent = this.data.keyword;
      this.template.querySelector(
        ".search-result__date",
      ).textContent = this.data.date;
      this.template.querySelector(
        ".search-result__image",
      ).src = this.data.image;
      this.template.querySelector(
        ".title__search-result-article",
      ).textContent = this.data.title;
      this.template.querySelector(
        ".subtitle__article",
      ).textContent = this.data.text;
      this.template.querySelector(
        ".search-result__source",
      ).textContent = this.data.source;
      this.template.querySelector(".search-result__info-box").setAttribute("onclick", `'${this.data.link}'`);
      this.renderIcon(isLoggedIn);
    } else {
      const date = this.data.publishedAt.value;
      // console.log("444444");
      this.template.querySelector(
        ".search-result__image",
      ).src = this.data.urlToImage;
      this.template.querySelector(
        ".search-result__date",
      ).textContent = changeDate(date);
      this.template.querySelector(
        ".title__search-result-article",
      ).textContent = this.data.title;
      this.template.querySelector(
        ".subtitle__article",
      ).textContent = this.data.description;
      this.template.querySelector(
        ".search-result__source",
      ).textContent = this.data.source.name;
      this.template.querySelector(".search-result__info-box").setAttribute("onclick", `window.open('${this.data.url}')`);
      this.renderIcon(isLoggedIn);
    }
  }

  // получить данные для отпрвки на сервер
  getDataToSaveArticle(event) {
    const card = event.closest(".search-result__card");
    // console.log(this.newsCardList.renderTopic().toString());

    return {
      keyword: this.newsCardList.renderTopic().toString(),
      image: card.querySelector(".search-result__image").src,
      date: card.querySelector(".search-result__date").textContent,
      title: card.querySelector(".title__search-result-article").textContent,
      text: card.querySelector(".subtitle__article").textContent,
      source: card.querySelector(".search-result__source").textContent,
      link: card.querySelector(".search-result__info-box").getAttribute("onclick").slice(13, -2),
    };
  }

  //  запрос к api на сохранение карточки
  saveArticle(icon) {
    const card = icon.closest(".search-result__card");
    // console.log(card, "save");
    const cardData = this.getDataToSaveArticle(card);
    // console.log(cardData);
    this.mainApi.createArticle(cardData)
      .then((res) => {
        card.setAttribute("id", `${res.data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // запрос к api на удаление карточки
  deleteArticle(articleId) {
    this.mainApi.removeArticle(articleId).then(() => {
      console.log("удаление успешно");
    })
      .catch((err) => { console.log(err); });
  }
}
