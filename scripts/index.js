import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { FormValidator } from "./FormValidator.js";
import { formValidators, initialCards, validationConfig } from "./utils.js";

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
// Informacion del usuario
const userInfo = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__job",
});

fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    authorization: "8e66e974-63b5-4fbf-a2ed-12a950290f95",
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Algo ha fallado: ${res.status}`);
  })
  .then((result) => {
    userInfo.setUserInfo({
      name: result.name,
      job: result.about,
      profileImage: result.avatar,
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Popup con la imagen
const popupWithImage = new PopupWithImage(".popup_view-img");
popupWithImage.setEventListeners(".popup__close_img");

// Handler de Card
const handleCardClick = (cardName, cardImage) => {
  popupWithImage.open(cardName, cardImage);
};

// Contenedor de las tarjetas
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleCardClick);
      const cardElement = card.generateCard();
      cardsSection.addItem(cardElement);
    },
  },
  ".cards-container"
);

cardsSection.renderItems();

console.log("Hola");
// Popup de perfil

const popupEditProfile = new PopupWithForm(".popup_profile", (formData) => {
  userInfo.setUserInfo({
    name: formData["name-input"],
    job: formData["job-input"],
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

// Popup para añadir el card

const popupAddCard = new PopupWithForm(".popup_add-card", (formData) => {
  const data = {
    name: formData["title-input"],
    link: formData["url-input"],
  };

  const newCard = new Card(data, "#card-template", handleCardClick);
  const cardElement = newCard.generateCard();

  cardsSection.addItem(cardElement);
});

popupAddCard.setEventListeners(".popup__close");

document.querySelector(".profile__button-add").addEventListener("click", () => {
  formValidators["popup__form"].resetValidation();
  popupAddCard.close();
  popupAddCard.open();
});
