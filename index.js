const editButton = document.querySelector(".profile__button-edit");
const popupProfile = document.querySelector(".popup_profile");
const popupProfileCloseButton = popupProfile.querySelector(".popup__close");

const addCardButton = document.querySelector(".profile__button-add");
const popupCardAdd = document.querySelector(".popup_add-card");
const popupCardAddCloseButton = popupCardAdd.querySelector(".popup__close");

let formElement = document.querySelector(".popup__input-form");

let cardLike = document.querySelectorAll(".card__like");

cardLike.forEach((like) => {
  like.addEventListener("click", function () {
    let likeButton = like.querySelector(".material-symbols-outlined");
    likeButton.classList.toggle("material-symbols-outlined-fill");
  });
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

formElement.addEventListener("submit", function (evt) {
  handleProfileFormSubmit(evt);
});

function openPopup(popup) {
  console.log("Abriendo popup", popup);
  popup.classList.add("popup_show");
}
function closePopup(popup) {
  console.log("Cerrando popup", popup);
  popup.classList.remove("popup_show");
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = formElement.querySelector(".popup__input-form_name");
  let jobInput = formElement.querySelector(".popup__input-form_job");

  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  let profileName = document.querySelector(".profile__name");
  let profileJob = document.querySelector(".profile__job");

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  nameInput.value = " ";
  jobInput.value = " ";
}
