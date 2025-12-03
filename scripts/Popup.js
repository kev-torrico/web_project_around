export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popup.classList.add("popup_show");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("popup_show");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners(closeButtonSelector) {
    //Se añade un evento tipo click al boton para cerrarlo
    const closeButton = this._popup.querySelector(closeButtonSelector);
    closeButton.addEventListener("click", () => this.close);

    //Se añade un evento mousedown al overlay al hacer click en el
    this._popup.addEventListener("mousedown", (evt) => {
      const overlay = this._popup.querySelector(".popup__overlay");

      if (evt.target === overlay) {
        this.close();
      }
    });
  }
}
