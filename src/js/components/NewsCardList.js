import BaseComponent from "./BaseComponent";

export default class NewsCardList extends BaseComponent {
  constructor(container, api, getTopicSearch, newsCard, page, isLoggedIn) {
    super();
    this.container = container;
    this.cards = this.container.querySelector(".search-result__cards");
    this.api = api;
    this.newsCard = newsCard;
    this.page = page;
    this.isLoggedIn = isLoggedIn;
    this.getTopicSearch = getTopicSearch;
    this._showMore = this._showMore.bind(this);
    this._renderLoader = this._renderLoader.bind(this);
    this._renderNotFound = this._renderNotFound.bind(this);
    this._renderResults = this._renderResults.bind(this);
    this._renderError = this._renderError.bind(this);
    this.newsArray = [];
    this.temp = this.page.getElementById("card-template").content;
    this.card = this.temp.querySelector(".search-result__card");
  }

  // поиск по api, складывает все в массив this.newsArray
  searchingNews() {
    this.topic = this.renderTopic();

    this.api
      .getNews(this.topic)
      .then((res) => {
        setTimeout(() => {
          this._renderLoader();
        }, 1000);
        return res;
      })
      .then((res) => {
        this._renderLoader();
        this._openSearchResultBlock();
        this._renderShowMoreButton();
        res.forEach((element) => {
          this.newsArray.push(element);
        });
        this._renderResults();
      })
      .then(() => {
        if (this.newsArray.length === 0) {
          this._openSearchResultBlock();
          setTimeout(() => {
            this._renderNotFound();
          }, 1001);
        }
      })
      .catch((err) => {
        this._openSearchResultBlock();
        this._renderError();
        throw new Error(err);
      });
  }

  // отрисовывает карточки по 3 штуки;
  _renderResults() {
    const threeNews = 3;
    let newsChunks;
    if (this.newsArray.length > threeNews) {
      newsChunks = this.newsArray.splice(0, threeNews);
      newsChunks.forEach((element) => {
        this.addCard(element);
      });
      this._showMore();
    } else if (this.newsArray.length >= 1 && this.newsArray.length < 3) {
      this.newsArray.forEach((element) => {
        this.addCard(element);
      });
    }
  }

  // открыть блок с результатом поиска
  _openSearchResultBlock() {
    this.page
      .getElementById("search-result-block")
      .classList.toggle("search-result_on");
  }

  // отвечает за отрисовку лоудера
  _renderLoader() {
    this.page
      .getElementById("preloader-searching")
      .classList.toggle("preloader_on");
  }

  // принимает объект ошибки и показывает ошибку в интерфейсе
  _renderNotFound() {
    this.page
      .getElementById("preloader-not-found")
      .classList.toggle("preloader_on");
  }

  _renderShowMoreButton() {
    this.page
      .getElementById("search-result-show-more")
      .classList.toggle("button__search-result_on");
  }

  // получение слова из строки поиска новостей
  renderTopic() {
    this.topicValue = this.getTopicSearch.getValues();
    this.topic = Object.values(this.topicValue);
    return this.topic;
  }

  // функциональность кнопки «Показать ещё»
  _showMore() {
    const buttonShowMore = this.page.getElementById("search-result-show-more");
    this._addListener(buttonShowMore, "click", (event) => {
      event.stopImmediatePropagation();
      if (this.newsArray.length <= 3) {
        buttonShowMore.classList.remove("button__search-result_on");
      }
      this._renderResults();
    });
  }

  // принимает экземпляр карточки и добавляет её в список
  addCard(element) {
    this.newCard = this.newsCard(element, this.card);

    this.newCard.setDataCard(this.isLoggedIn);
    this.newCard.createCard();
    // this.newCard.renderIcon(this.isLoggedIn);
  }

  _renderError() {
    this.page.getElementById("search-result__error-text").textContent = "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
  }
}
