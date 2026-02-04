export class Card {
  constructor(data, cardTemplate, handleCardClick, handleDeleteClick, cardApi) {
    this._data = data;
    this._text = data.name;
    this._image = data.link;
    this._id = data._id;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardApi = cardApi;
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

    const likeIcon = this._element.querySelector(".card__like span");

    if (this._data.isLiked === true) {
      likeIcon.classList.add("material-symbols-outlined-fill");
    } else {
      likeIcon.classList.remove("material-symbols-outlined-fill");
    }
  }
  _setEventListeners() {
    this._element
      .querySelector(".card__delete")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
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
    const likeIcon = this._element.querySelector(".card__like span");
    const isCurrentlyLiked = this._data.isLiked;

    if (isCurrentlyLiked) {
      this._cardApi
        .unLikeCard(this.getId())
        .then((updatedCard) => {
          this._data.isLiked = updatedCard.isLiked;
          likeIcon.classList.remove("material-symbols-outlined-fill");
        })
        .catch((err) => console.error(err));
    } else {
      this._cardApi
        .likeCard(this.getId())
        .then((updatedCard) => {
          this._data.isLiked = updatedCard.isLiked;
          likeIcon.classList.add("material-symbols-outlined-fill");
        })
        .catch((err) => console.error(err));
    }
  }

  getId() {
    return this._id;
  }
  removeCard() {
    this._element.remove();
    this._element = null;
  }
}
