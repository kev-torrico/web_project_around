import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector(".popup__save");
    this._handleSubmit = null;
  }
  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners(closeButtonSelector) {
    this._submitButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      if (this._handleSubmit) {
        this._handleSubmit();
      }
      this.close();
    });
    super.setEventListeners(closeButtonSelector);
  }
}
