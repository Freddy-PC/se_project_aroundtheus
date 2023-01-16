export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];
// FormValidation
export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
// Calling new classes
export const selectors = {
  cardList: ".cards__list",
  cardTemplate: ".card__template",
  viewModal: "#image-modal", // "." in Popup.js
  userName: ".profile__title",
  userJob: ".profile__description",
  profileImage: ".profile__image",
  addModal: "#add-modal",
  editModal: "#edit-modal",
  cardTemplate: "#card-template",
  profileImageModal: "#profile-modal",
};

/* Input fields in Edit button */
export const cardAddForm = document.querySelector("#add-card-form");
export const profileEditForm = document.querySelector("#edit-profile-form");

export const profileTitleInput = profileEditForm.querySelector(
  ".modal__input_type_name"
);
export const profileDescriptionInput = profileEditForm.querySelector(
  ".modal__input_type_descripion"
);
/*Input field on profile image */
export const changeImageForm = document.querySelector("#change-image-form");
// Buttons
export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);
export const addCardButton = document.querySelector(".profile__add-button");
export const changeProfileImageButton = document.querySelector(
  ".profile__image-button"
);
