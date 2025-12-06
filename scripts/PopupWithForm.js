import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleProfileFormSubmit) {
    super(popupSelector);
    this._handleProfileFormSubmit = handleProfileFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._popup.querySelectorAll(".popup__input-form");
  }
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.id] = input.value;
    });
    return formValues;
  }
  setEventListeners(closeButtonSelector) {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleProfileFormSubmit(this._getInputValues());
    });
    super.setEventListeners(closeButtonSelector);
  }
  close() {
    super.close();
    this._form.reset();
  }
}
