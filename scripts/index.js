const editButton = document.querySelector(".profile__button-edit");
const popupProfile = document.querySelector(".popup_profile");
const popupProfileCloseButton = popupProfile.querySelector(".popup__close");

const addCardButton = document.querySelector(".profile__button-add");
const popupCardAdd = document.querySelector(".popup_add-card");
const popupCardAddCloseButton = popupCardAdd.querySelector(".popup__close");

const formElementProfile = popupProfile.querySelector(".popup__input-form");
const formElementCard = popupCardAdd.querySelector(".popup__input-form");

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
