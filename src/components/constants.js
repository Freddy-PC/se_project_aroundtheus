// Move to utils folder later //////////////

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

// export const cardListEl = document.querySelector(".cards__list");
// const cardTemplate = cardListEl.querySelector("#card-template").content.firstElementChild;
export const selectors = {
  cardList: ".cards__list",
  cardTemplate: ".card__template",
  viewModal: "#image-modal", // "." in Popup.js
  userName: ".profile__title",
  userJob: ".profile__description",
  addModal: "#add-Modal",
  editModal: "#edit-Modal",
};

/* Input fields in Edit button */
export const profileEditForm = document.querySelector("#edit-profile-form");
export const profileTitleInput = profileEditForm.querySelector(
  ".modal__input_type_name"
);
export const profileDescriptionInput = profileEditForm.querySelector(
  ".modal__input_type_descripion"
);
//
export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);
export const addCardButton = document.querySelector(".profile__add-button");
