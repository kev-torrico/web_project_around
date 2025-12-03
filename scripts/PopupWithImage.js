import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = this._popup.querySelector(".popup__img");
    this._caption = this._popup.querySelector(".popup__title_img");
  }
  open(cardImage, cardName) {
    this._img.src = cardImage;
    this._img.alt = cardName;
    this._caption.textContent = cardName;
    super.open();
  }
}
