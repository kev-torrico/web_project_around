import { enableValidation, resetValidation } from "./validate.js";

const editButton = document.querySelector(".profile__button-edit");
const popupProfile = document.querySelector(".popup_profile");
const popupProfileCloseButton = popupProfile.querySelector(".popup__close");

const addCardButton = document.querySelector(".profile__button-add");
const popupCardAdd = document.querySelector(".popup_add-card");
const popupCardAddCloseButton = popupCardAdd.querySelector(".popup__close");

const formElementProfile = popupProfile.querySelector(".popup__form");
const formElementCard = popupCardAdd.querySelector(".popup__form");

const popupImg = document.querySelector(".popup_view-img");
const popupImgCloseButton = popupImg.querySelector(".popup__close_img");

const cardsContainer = document.querySelector(".cards-container");
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input-form",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

enableValidation(validationConfig);

class Card {
  constructor(data, cardSelector) {
    this._text = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
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

initialCards.forEach((data) => {
  const card = new Card(data, "#card-template");
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
});

editButton.addEventListener("click", function () {
  openPopup(popupProfile);
});

popupProfileCloseButton.addEventListener("click", function () {
  closePopup(popupProfile);
});

addCardButton.addEventListener("click", function () {
  openPopup(popupCardAdd);
});

popupCardAddCloseButton.addEventListener("click", function () {
  closePopup(popupCardAdd);
});

popupImgCloseButton.addEventListener("click", function () {
  closePopup(popupImg);
});

formElementProfile.addEventListener("submit", function (evt) {
  console.log("Submit perfil ✅");
  handleProfileFormSubmit(evt);
});
formElementCard.addEventListener("submit", function (evt) {
  console.log("Submit tarjeta ✅");
  handleCardFormSubmit(evt);
});

const handleOverlayClick = (evt) => {
  if (evt.target.classList.contains("popup__overlay")) {
    closePopup(evt.currentTarget);
  }
};
const overlayClosePopup = () => {
  document.querySelectorAll(".popup").forEach((popup) => {
    popup.addEventListener("click", handleOverlayClick);
  });
};
overlayClosePopup();

const handleEscKey = (evt) => {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_show");
    if (popupOpen) {
      closePopup(popupOpen);
    }
  }
};

function openPopup(popup) {
  if (popup === popupProfile) {
    let nameInput = formElementProfile.querySelector(".popup__input-form_name");
    let jobInput = formElementProfile.querySelector(".popup__input-form_job");

    const profileName = document.querySelector(".profile__name");
    const profileJob = document.querySelector(".profile__job");

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
  popup.classList.add("popup_show");
  const form = popup.querySelector(".popup__form");
  document.addEventListener("keydown", handleEscKey);
  if (form) {
    resetValidation(form, validationConfig);
  }
}
function closePopup(popup) {
  popup.classList.remove("popup_show");
  document.removeEventListener("keydown", handleEscKey);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = formElementProfile.querySelector(".popup__input-form_name");
  let jobInput = formElementProfile.querySelector(".popup__input-form_job");

  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  const profileName = document.querySelector(".profile__name");
  const profileJob = document.querySelector(".profile__job");

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  closePopup(popupProfile);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  let titleInput = formElementCard.querySelector(".popup__input-form_title");
  let imgUrlInput = formElementCard.querySelector(".popup__input-form_imgUrl");

  let titleValue = titleInput.value;
  let imgUrlValue = imgUrlInput.value;

  let newObjectCard = { name: titleValue, link: imgUrlValue };

  addCard(titleValue, imgUrlValue);
  initialCards.push(newObjectCard);

  titleInput.value = "";
  imgUrlInput.value = "";

  closePopup(popupCardAdd);
}

function handlerCardDelete(evt) {
  const cardToDelete = evt.target.closest(".card");
  cardToDelete.remove();
}
function handlerCardImg(cardImage, cardName) {
  const popupImgTag = popupImg.querySelector(".popup__img");
  const popupImgeTitle = popupImg.querySelector(".popup__title_img");
  popupImgTag.src = cardImage;
  popupImgTag.alt = cardName;
  popupImgeTitle.textContent = cardName;
  openPopup(popupImg);
}
