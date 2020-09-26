// Класс, отвечающий за логику работы шапки сайта. Его конструктор принимает объект опций. В
// опциях передайте цвет шапки, так как на разных страницах он может быть разный
export default class Header {
  constructor() {}

  // при вызове перерисовывает шапку в зависимости от переданного аргумента — объекта props
  render(props) {
    if (props.isLoggedIn) {
      this._articlesLink.style.display = "inline-block";
      this._buttonIcon.style.display = "block";
      this._buttonText.textContent = props.userName;
    } else {
      this._articlesLink.style.display = "none";
      this._buttonIcon.style.display = "none";
      this._buttonText.textContent = "Авторизоваться";
    }
  }
}
