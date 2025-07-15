export const popupCardAdd = document.querySelector(".popup_add-card");
export const popupImg = document.querySelector(".popup_view-img");

const editButton = document.querySelector(".profile__button-edit");
export const popupProfile = document.querySelector(".popup_profile");
const popupProfileCloseButton = popupProfile.querySelector(".popup__close");

const addCardButton = document.querySelector(".profile__button-add");
const popupCardAddCloseButton = popupCardAdd.querySelector(".popup__close");
const popupImgCloseButton = popupImg.querySelector(".popup__close_img");

export const formElementProfile = popupProfile.querySelector(".popup__form");
export const formElementCard = popupCardAdd.querySelector(".popup__form");

export const formValidators = {};

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

const handleEscKey = (evt) => {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_show");
    if (popupOpen) {
      closePopup(popupOpen);
    }
  }
};
export function openPopup(popup) {
  if (popup === popupProfile) {
    let nameInput = formElementProfile.querySelector(".popup__input-form_name");
    let jobInput = formElementProfile.querySelector(".popup__input-form_job");

    const profileName = document.querySelector(".profile__name");
    const profileJob = document.querySelector(".profile__job");

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }

  const form = popup.querySelector(".popup__form");
  if (form) {
    const formKey = form.getAttribute("name") || form.className;
    formValidators[formKey]?.resetValidation();
  }
  popup.classList.add("popup_show");
  document.addEventListener("keydown", handleEscKey);
}

export function closePopup(popup) {
  popup.classList.remove("popup_show");
  document.removeEventListener("keydown", handleEscKey);
}
