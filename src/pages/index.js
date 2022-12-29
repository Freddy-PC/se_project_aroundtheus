import "../pages/index.css";
import {
  initialCards,
  selectors,
  profileTitleInput,
  profileDescriptionInput,
  editProfileButton,
  addCardButton,
  settings,
  profileEditForm,
  cardAddForm,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForms from "../components/PopupWithForms";
import FormValidator from "../components/FormValidator.js";

/* -------------------------------------------------------------------------- */
/*                         Create instances of classes                        */
/* -------------------------------------------------------------------------- */

// Hidden Image Modal Window
const viewCardModal = new PopupWithImage(selectors.viewModal);

// Render Card with Section, st
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data); // Make card and image-modal
      cardSection.addItem(cardElement); // Add initialCards
    },
  },
  selectors.cardList
);

/* ------------------------------- Edit-Button ------------------------------ */
// Object value equals edit input-field
const userInfo = new UserInfo({
  userName: selectors.userName,
  userJob: selectors.userJob,
});

// Manage initial profile data, st
function fillProfileForm() {
  const { name, job } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
}

// Change edit-modal data when submit
const editProfileModal = new PopupWithForms({
  popupSelector: selectors.editModal,
  handleFormSubmit: (input) => {
    userInfo.setUserInfo({
      profileName: input.title,
      profileJob: input.description,
      // Changes input field "name='title'" dispalyed on main HTML
    });
    editProfileModal.close();
  },
});

/* ------------------------------- Add-Button ------------------------------- */

// Uses inputs, creates card and adds to cardSection
function renderCard(data) {
  const newcarData = createCard(data); // Makes Card
  cardSection.prependItem(newcarData); // Adds card to beginning
}
// Creates card and image-modal
const createCard = (objectData) => {
  const card = new Card(
    {
      data: objectData,
      toggleImageClick: (imgData) => {
        viewCardModal.open(imgData);
      },
    },
    selectors.cardTemplate
  );
  return card.getView();
};

// Change add-modal data when submit, st
const addCardModal = new PopupWithForms({
  popupSelector: selectors.addModal,
  handleFormSubmit: (input) => {
    const newCardData = { name: input.title, link: input.link }; // made of new inputs
    renderCard(newCardData); // Uses inputs in process of making new card
    addCardModal.close(); // Allows to close
  },
});

/* ------------------------------- Validation ------------------------------- */

// Validate for edit button (used ID)
const editFormValidator = new FormValidator(settings, profileEditForm);
// Validate for add button
const addFormValidator = new FormValidator(settings, cardAddForm);

/* -------------------------------------------------------------------------- */
/*                           Initiate all instances                           */
/* -------------------------------------------------------------------------- */

cardSection.renderItems(initialCards);
viewCardModal.setEventListeners(); // Card modal
editProfileModal.setEventListeners(); // Edit-button modal
addCardModal.setEventListeners(); // Add-button modal

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                 All of rest                                */
/* -------------------------------------------------------------------------- */

// When you click edit-icon...
editProfileButton.addEventListener("click", () => {
  fillProfileForm(); // Values equal to past values
  editProfileModal.open(); // Open modal
  editFormValidator.resetValidation(); // Reset validation
});
// Click add-icon...
addCardButton.addEventListener("click", () => {
  addCardModal.open();
  addFormValidator.resetValidation();
});
