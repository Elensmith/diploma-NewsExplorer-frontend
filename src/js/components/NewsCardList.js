import BaseComponent from "./BaseComponent";
// Класс списка карточек новостей. Конструктор принимает массив карточек,
// которые должны быть в списке при первой отрисовке
export default class NewsCardList extends BaseComponent {
  constructor(cardsArray, container, api) {
    super();
    this.cardsArray = cardsArray;
    this.container = container;
    this.cards = this.container.querySelector(".search-result__cards");
    this.api = api;
    this.addCard = this.addCard.bind(this);
  }

  // принимает массив экземпляров карточек и отрисовывает их;
  renderResults() {
    this.cardsArray.forEach((element) => {
      this.addCard(element);
    });
  }

  // // отвечает за отрисовку лоудера
  // renderLoader() {}

  // // принимает объект ошибки и показывает ошибку в интерфейсе
  // renderError()

  // // отвечает за функциональность кнопки «Показать ещё»
  // showMore() {}

  // принимает экземпляр карточки и добавляет её в список
  addCard(card) {
    this.cards.append(card);
  }
}
