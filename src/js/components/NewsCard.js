import BaseComponent from "./BaseComponent";

//  Класс карточки новости
export default class NewsCard extends BaseComponent {
  constructor(data, template) {
    super();
    this.data = data;
    this.template = template;
    this.setDataCard = this.setDataCard.bind(this);
    this._changeDateFormat = this._changeDateFormat.bind(this);
  }

  // отвечает за отрисовку иконки карточки. У этой иконки три состояния: иконка незалогиненного
  // пользователя, активная иконка залогиненного, неактивная иконка залогиненного.
  renderIcon() {}

  createCard() {
    const template = document.getElementById("card-template").content;
    const templateCopy = document.importNode(template, true);
  }

  setDataCard() {
    console.log(this.data.author);
    this.template.querySelector(
      "search-result__image"
    ).src = this.data.urlToImage;
    this.template.querySelector(
      "search-result__date"
    ).textContent = NewsCard._changeDateFormat(this.data.date);
    this.template.querySelector(
      "title__search-result-article"
    ).textContent = this.data.title;
    this.template.querySelector(
      "subtitle__article"
    ).textContent = this.data.description;
    this.template.querySelector(
      "search-result__source"
    ).textContent = this.data.source.name;
  }

  _changeDateFormat(date) {
    this.date = date;
    const newDate = new Intl.DateTimeFormat("ru", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const [
      { value: day },
      ,
      { value: month },
      ,
      { value: year },
      ,
    ] = newDate.formatToParts(date);

    return `${day} ${month}, ${year}`;
  }
}
