import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { closeModal, openModal } from "./utils.js";

const initialCards = [
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
/* Edit button */
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-modal");
const profileEditExitButton = editProfileModal.querySelector(
  ".modal__exit-button"
);
/* Input fields in Edit button */
const profileEditForm = document.querySelector("#edit-profile-form");
const profileTitleInput = profileEditForm.querySelector(
  ".modal__input_type_name"
);
const profileDescriptionInput = profileEditForm.querySelector(
  ".modal__input_type_descripion"
);
const profileTitleEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");
/* Add button */
const cardAddModal = document.querySelector("#add-modal");
const cardAddButton = document.querySelector(".profile__add-button");
const cardAddCloseBtn = cardAddModal.querySelector(".modal__exit-button");
const cardAddForm = document.querySelector("#add-card-form");
/* Image Select */
// To card.js
export const viewCardModal = document.querySelector("#image-modal");
export const viewCardEl = viewCardModal.querySelector(".modal__image");
const viewCardExitButton = viewCardModal.querySelector(".modal__exit-button");
export const viewCardCaption = viewCardModal.querySelector(".modal__caption");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  cardListEl.querySelector("#card-template").content.firstElementChild;

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

/* -------------------------- Open and Close Modal -------------------------- */

editProfileButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;

  openModal(editProfileModal);
});

profileEditExitButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

cardAddButton.addEventListener("click", function (evt) {
  // Delete if add button submit is disabled
  /* When clicking ".profile__add-button" 
  the disableButton function (in validation.js)
  is added to the save-button from the start */
  /* disableButton(document.querySelector("#add-modal .modal__save-button"), {
    inactiveButtonClass: "modal__button_disabled",
  });
  */
  openModal(cardAddModal);
});

cardAddCloseBtn.addEventListener("click", () => {
  closeModal(cardAddModal);
});

viewCardExitButton.addEventListener("click", () => {
  closeModal(viewCardModal);
});

/* --------------- Exit Clicking Overlay/outside Modal Window --------------- */

/* When the outside of a modal window is clicked it closes */
const modalWindows = Array.from(document.querySelectorAll(".modal"));
modalWindows.forEach((modalElement) => {
  modalElement.addEventListener("click", (evt) => {
    closeModal(evt.target);
  });
});

/* --------------------------- Edit Profile Button -------------------------- */

profileEditForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const titleValue = event.target.title.value;
  const descriptionValue = event.target.description.value;
  //Input fields will equal its past input
  profileTitleEl.textContent = titleValue;
  profileDescriptionEl.textContent = descriptionValue;

  // Closes editProfileModal (after input fields have a value & save button is pressed)
  closeModal(editProfileModal);
});

/* -------------------------------- Add Card -------------------------------- */

cardAddForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // Grabs input name's value from "title" and "link" in modal
  const name = event.target.title.value;
  const link = event.target.link.value;
  renderCard({
    name,
    link,
  });
  closeModal(cardAddModal);
  // Delete if add button submit is disabled
  /* Adds disablebutton to card from start..instead of in cardAddButton
  addFormValidator._disableButton();
  */
  cardAddForm.reset();
});

//Renders new cards
function renderCard(cardData) {
  // Passed cardTemplate = element (not a selector)
  const card = new Card(cardData, cardTemplate);
  cardListEl.prepend(card.getView());
}

// Initialcards are in order when reversed from prepend
initialCards.reverse().forEach(renderCard);

/* Moved to CARD.JS
// Creates card
function createCard(data) {
  // Clone template
  const cardEl = cardTemplate.cloneNode(true);
  // Find .card__image
  const imageEl = cardEl.querySelector(".card__image");
  // Find .card__title
  const cardTitle = cardEl.querySelector(".card__title");
  // Replace image src
  imageEl.src = data.link;
  // Replace image alt
  imageEl.alt = data.name;
  // Replace title
  cardTitle.textContent = data.name;
  // Add event-listener for like button
  //Why does card__like-button_active with no period work???
  const cardLikeBtn = cardEl.querySelector(".card__like-button");
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_active");
  });
  // Add event-listener for delete button
  const cardDeleteBtn = cardEl.querySelector(".card__delete-button");
  cardDeleteBtn.addEventListener("click", () => {
    cardEl.remove();
  });
  // Opens Image when clicked
  imageEl.addEventListener("click", () => {
    viewCardEl.src = data.link;
    viewCardEl.alt = data.name;
    viewCardCaption.textContent = data.name;
    openModal(viewCardModal);
  });
  // Give finished element
  return cardEl;
}
*/

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
