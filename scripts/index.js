import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { FormValidator } from "./FormValidator.js";
import { formValidators, validationConfig } from "./Utils.js";
import { apiConfig } from "../config/config.js";

// Validacion de formularios
const formList = Array.from(
  document.querySelectorAll(validationConfig.formSelector)
);

formList.forEach((formElement) => {
  const validator = new FormValidator(validationConfig, formElement);
  const formName = formElement.getAttribute("name") || formElement.className;
  formValidators[formName] = validator;
  validator.enableValidation();
});

// ******   Usuarios   *******
// Instanciamos un usuario
export const userInfo = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__job",
  baseUrl: apiConfig.baseUrl,
  headers: {
    "Content-Type": apiConfig.headers.contentType,
    Authorization: apiConfig.headers.token,
  },
});

//Obtener informacion del usuario desde el servidor
userInfo.getUserInfo();

// Instanciamos un Popup con la imagen y añadimos escuchadores de eventos
const popupWithImage = new PopupWithImage(".popup_view-img");
popupWithImage.setEventListeners(".popup__close_img");

// Handler de Card
const handleCardClick = (cardName, cardImage) => {
  popupWithImage.open(cardName, cardImage);
};

// **** Secion de las tarjetas ****

// Contenedor de las tarjetas
export const cardsSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleCardClick);
      const cardElement = card.generateCard();
      cardsSection.addItem(cardElement);
    },
    baseUrl: apiConfig.baseUrl,
    headers: {
      "Content-Type": apiConfig.headers.contentType,
      Authorization: apiConfig.headers.token,
    },
  },
  ".cards-container"
);

// Obtencion de informacion acerca de las tarjetas.
cardsSection.getItems();

// Popup para añadir el card

const popupAddCard = new PopupWithForm(".popup_add-card", (formData) => {
  const data = {
    name: formData["title-input"],
    link: formData["url-input"],
  };

  const newCard = new Card(
    data,
    "#card-template",
    handleCardClick,
    apiConfig.baseUrl,
    {
      "Content-Type": apiConfig.headers.contentType,
      Authorization: apiConfig.headers.token,
    }
  );
  newCard.createCard();
  const cardElement = newCard.generateCard();
  cardsSection.addItem(cardElement);
});

popupAddCard.setEventListeners(".popup__close");

document.querySelector(".profile__button-add").addEventListener("click", () => {
  formValidators["popup__form"].resetValidation();
  popupAddCard.close();
  popupAddCard.open();
});

// **** Edicion de usuarios y popup del perfil****
// Popup de perfil
const popupEditProfile = new PopupWithForm(".popup_profile", (formData) => {
  userInfo.updateProfile({
    name: formData["name-input"],
    about: formData["job-input"],
  });
});
popupEditProfile.setEventListeners(".popup__close");

// Abrir el boton de edit del popup de perfil
document
  .querySelector(".profile__button-edit")
  .addEventListener("click", () => {
    const currentInfo = userInfo.getUserInfo();
    popupEditProfile.setInputValues({
      "name-input": currentInfo.name,
      "job-input": currentInfo.job,
    });
    popupEditProfile.open();
  });
