import BaseComponent from "./BaseComponent";
// Класс, отвечающий за логику работы шапки сайта. Его конструктор принимает объект опций. В
// опциях передайте цвет шапки, так как на разных страницах он может быть разный
export default class Header extends BaseComponent {
  constructor(page) {
    super();
    this.page = page;
    this.buttonAuth = this.page.getElementById("open-popupEnter");
    this.buttonSaved = this.page.querySelector(".header__button_saved");
    this.buttonWithName = this.page.querySelector(
      ".header__button_name",
    );
    this.userName = this.page.querySelector(
      ".button__selected_with-name",
    );
  }

  render(isLoggedIn, name) {
    if (isLoggedIn) {
      if (this.buttonWithName && this.buttonSaved && this.buttonAuth) {
        this.buttonWithName.classList.remove("header__button_off");
        this.buttonSaved.classList.remove("header__button_off");
        this.buttonAuth.classList.add("header__button_off");
        this.userName.textContent = name;
      } else {
        this.userName.textContent = name;
      }
    } else {
      // this.buttonSaved.classList.add("header__button_off");
      // this.buttonAuth.classList.remove("header__button_off");
      // this.buttonWithName.classList.add("header__button_off");
      // console.log(isLoggedIn);
    }
  }

  logOut() {
    localStorage.removeItem("token");
    window.location.reload();
  }
}
