import "../pages/index.css";

import { initialCards, selectors } from "./constants.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js";

import { closeModal, openModal } from "./utils.js";

// Create instances of classes

/* ------------------------ Render Card with Section ------------------------ */
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = new Card(item, selectors.cardTemplate); // Initialize card from Card.js
      cardSection.addItem(cardElement.getView()); // Add element from Section.js
    },
  },
  selectors.cardList
);

cardSection.renderItems(initialCards);

/* ------------------------------- Validation ------------------------------- */
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Validate for edit button (used ID)
const editFormValidator = new FormValidator(settings, profileEditForm);
// Validate for add button
const addFormValidator = new FormValidator(settings, cardAddForm);

// Call the method
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Initiate all instances

// All of rest
