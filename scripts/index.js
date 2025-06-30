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

initialCards.forEach((card) => {
  addCard(card.name, card.link);
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
  handleProfileFormSubmit(evt);
});
formElementCard.addEventListener("submit", function (evt) {
  handleCardFormSubmit(evt);
});

function addCard(titleValue, imgUrlValue) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDelete = cardElement.querySelector(".card__delete");
  const cardLike = cardElement.querySelector(".card__like");
  const cardImg = cardElement.querySelector(".card__img");
  cardImg.src = imgUrlValue;
  cardImg.alt = titleValue;
  cardElement.querySelector(".card__title").textContent = titleValue;
  cardLike.addEventListener("click", function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle("material-symbols-outlined-fill");
  });
  cardDelete.addEventListener("click", handlerCardDelete);
  cardImg.addEventListener("click", function () {
    handlerCardImg(cardImg.src, cardImg.alt);
  });
  cardsContainer.prepend(cardElement);
}

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
}
function closePopup(popup) {
  popup.classList.remove("popup_show");
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
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const buttonNewMargin = (inputList, buttonElement) => {
  const lastInput = inputList[inputList.length - 1];
  if (lastInput.classList.contains("form__input_type_error")) {
    buttonElement.classList.add("popup__save_new-margin");
  } else {
    buttonElement.classList.remove("popup__save_new-margin");
  }
};
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__save_inactive");
    buttonNewMargin(inputList, buttonElement);
  } else {
    buttonElement.classList.remove("popup__save_inactive");
    buttonNewMargin(inputList, buttonElement);
  }
};
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".popup__input-form")
  );
  const buttonElement = formElement.querySelector(".popup__save");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();

const overlayClosePopup = () => {
  const popups = Array.from(document.querySelectorAll(".popup"));
  popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup__overlay")) {
        closePopup(popup);
      }
    });
  });
};
overlayClosePopup();

const esqKeyClosePopup = () => {
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      const popupOpen = document.querySelector(".popup_show");
      if (popupOpen) {
        closePopup(popupOpen);
      }
    }
  });
};
esqKeyClosePopup();
