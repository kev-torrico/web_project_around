import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import {
  popupProfile,
  popupCardAdd,
  popupImg,
  formElementCard,
  formElementProfile,
  formValidators,
  closePopup,
  openPopup,
} from "./utils.js";

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

const formList = Array.from(
  document.querySelectorAll(validationConfig.formSelector)
);

formList.forEach((formElement) => {
  const validator = new FormValidator(validationConfig, formElement);
  const formName = formElement.getAttribute("name") || formElement.className;
  formValidators[formName] = validator;
  validator.enableValidation();
});

function handlerCardImg(cardImage, cardName) {
  const popupImgTag = popupImg.querySelector(".popup__img");
  const popupImgeTitle = popupImg.querySelector(".popup__title_img");
  popupImgTag.src = cardImage;
  popupImgTag.alt = cardName;
  popupImgeTitle.textContent = cardName;
  openPopup(popupImg);
}

initialCards.forEach((data) => {
  const card = new Card(data, "#card-template", handlerCardImg);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
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

  let newCard = new Card(newObjectCard, "#card-template");
  const cardElement = newCard.generateCard();
  cardsContainer.prepend(cardElement);
  initialCards.push(newObjectCard);

  titleInput.value = "";
  imgUrlInput.value = "";

  closePopup(popupCardAdd);
}
