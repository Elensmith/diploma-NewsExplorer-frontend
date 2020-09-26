import BaseComponent from "./BaseComponent";
import errorMessages from "../constants/errorMessages";

const {
  INCORRECT_EMAIL,
  INCORRECT_EMAIL_LENGTH,
  REQUIRED_FIELD,
  SERVER_ERR_409,
  SERVER_ERR_401,
  SERVER_ERR_400,
} = errorMessages;

// Класс, отвечающий за логику работы формы
export default class Form extends BaseComponent {
  constructor(form, api, popup) {
    super();
    this.form = form;
    this.api = api;
    this.popup = popup;
    this.buttonSubmit = this.form.querySelector(".button__popup");
    this._validateForm = this._validateForm.bind(this);
    this._validateInputs = this._validateInputs.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this._cleanErrors = this._cleanErrors.bind(this);
    this._cleanInputs = this._cleanInputs.bind(this);
    this.getValues = this.getValues.bind(this);
    this.form.addEventListener("submit", (event) => this.submitForm(event));
    this.reset = this.reset.bind(this);
    this._setServerError = this._setServerError.bind(this);
    // this.form.querySelectorAll("input").forEach((input) => {
    //   this._validateInputElement(input);
    //   this._validateForm();
    // });
  }

  getValues() {
    const values = {};
    Array.from(this.form.elements).forEach((element) => {
      if (element.nodeName === "INPUT") {
        values[element.name] = element.value;
      }
    });
    return values;
  }

  // вспомогательный метод, возвращает данные формы
  getInfo() {
    const inputs = [];
    Array.from(this.form.elements).forEach((imput) => {
      if (imput.nodeName === "INPUT") {
        inputs.push(imput);
        // imput.addEventListener("input", () => this._validateInputElement());
        this._addListener(this.input, "input", this._validateInputs());
      }
    });
    //   // this.form.addEventListener("input", ()
    //   const inputs = this.form.querySelectorAll("input");
    //   // this.form.addEventListener("input", () => {
    //   inputs.forEach((input) => {
    //     valuesInput[input.name] = input.value;
    //     // input._validateInputElement();
    //     this._validateInputElement();
    //   });
    //   // });
    //   // this._validateForm();
    return inputs;
  }

  setEventListeners() {
    this._addListener(this.form, "input", this._validateForm);
  }

  submitForm(e) {
    e.preventDefault();
    if (e.target.getAttribute("id") === "form-registration") {
      this.api
        .signup(this.getValues())
        .then(() => {
          this.popup.close();
          this.reset();
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else if (e.target.getAttribute("id") === "form-enter") {
      this.api
        .signin(this.getValues())
        .then(() => {
          this.popup.close();
          this.reset();
        })
        .catch((err) => {
          this._setServerError(err);
        });
    }
  }
  // const inputs = this.form.querySelectorAll("input");
  // inputs.forEach((input) => {
  //   this._addListener(input, "input", this._validateForm);
  //   return inputs;
  // });

  //  добавляет форме ошибку, пришедшую с сервера
  _setServerError(err) {
    const error = this.buttonSubmit.previousElementSibling;
    if (err === 400) {
      error.textContent = SERVER_ERR_400;
    } else if (err === 401) {
      error.textContent = SERVER_ERR_401;
    } else if (err === 409) {
      error.textContent = SERVER_ERR_409;
    }
  }

  // валидирует переданный в качестве аргумента инпут
  // сделать на один инпут!
  _validateInputs() {
    let valid = true;

    this.form.querySelectorAll("input").forEach((input) => {
      const error = input.nextElementSibling;

      if (input.name === "email" && !input.validity.valid) {
        error.textContent = INCORRECT_EMAIL;
        valid = false;
      } else if (input.name === "password" && !input.validity.valid) {
        error.textContent = INCORRECT_EMAIL_LENGTH;
        valid = false;
      } else if (input.name === "name" && !input.validity.valid) {
        error.textContent = REQUIRED_FIELD;
        valid = false;
      } else if (input.validity.valid) {
        error.textContent = "";
      }
    });
    return valid;
  }

  // валидирует всю форму
  _validateForm() {
    if (this._validateInputs()) {
      this.buttonSubmit.disabled = false;
    } else {
      this.buttonSubmit.disabled = true;
    }
  }

  // вспомогательный метод, очищает поля формы
  _cleanErrors() {
    this.form.querySelectorAll("input").forEach((errorField) => {
      const error = errorField.nextElementSibling;
      error.textContent = "";
    });
    // this.form.querySelectorAll(".popup__form_error").forEach((field) => {
    //   field.textContent = "";
    // this.buttonSave.disabled = true;
    // });
  }

  _cleanInputs() {
    this.form.querySelectorAll("input").forEach((input) => {
      const inputField = input;
      inputField.value = "";
    });
    this.buttonSubmit.disabled = true;
  }

  reset() {
    this._cleanErrors();
    this._cleanInputs();
  }
}
