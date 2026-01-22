export class Card {
  constructor(data, cardTemplate, handleCardClick) {
    this._data = data;
    this._text = data.name;
    this._image = data.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setCardData();
    this._setEventListeners();
    return this._element;
  }
  _setCardData() {
    this._element.querySelector(".card__img").src = this._image;
    this._element.querySelector(".card__img").alt = this._text;
    this._element.querySelector(".card__title").textContent = this._text;
  }
  _setEventListeners() {
    this._element
      .querySelector(".card__delete")
      .addEventListener("click", (evt) => {
        this._handleDeleteClick(evt);
      });
    this._element
      .querySelector(".card__like")
      .addEventListener("click", (evt) => {
        this._handleLikeClick(evt);
      });

    this._element.querySelector(".card__img").addEventListener("click", () => {
      this._handleCardClick(this._text, this._image);
    });
  }
  _handleLikeClick(evt) {
    const eventTarget = evt.target.closest("span");
    eventTarget.classList.toggle("material-symbols-outlined-fill");
  }
  _handleDeleteClick(evt) {
    const cardToDelete = evt.target.closest(".card");
    cardToDelete.remove();
  }
}
