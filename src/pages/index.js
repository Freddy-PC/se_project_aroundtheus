import "../pages/index.css";
import {
  initialCards, // Delete after submit (and constants)
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
import Api from "../components/Api.js";

/* -------------------------------------------------------------------------- */
/*                         Create instances of classes                        */
/* -------------------------------------------------------------------------- */

/* -------------------------------- Card API -------------------------------- */

// Hidden Image Modal Window
const viewCardModal = new PopupWithImage(selectors.viewModal);

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  authToken: "eb433773-4d2e-4e42-9076-4dd771b1e5ef",
});

let cardSection;
let userId;
// Initiating Render Card with Section (cards from Server), st
api.getInitialCards().then((initialCardData) => {
  cardSection = new Section(
    {
      items: initialCardData,
      renderer: (data) => {
        const cardElement = createCard(data); // Make card and image-modal
        cardSection.addItem(cardElement); // Add initialCards
      },
    },
    selectors.cardList
  );
  cardSection.renderItems(); // Call on method to build/render cards
});

// Creates card and image-modal
const createCard = (objectData) => {
  const card = new Card(
    {
      data: objectData,
      toggleImageClick: (imgData) => {
        viewCardModal.open(imgData);
      },
      toggleCardDelete: () => {
        const cardId = card.getId(); // Sets id of card
        // Removes card from server
        api.removeCard(cardId).then((res) => {
          card.deleteCard(res); // Remove card for user
        });
      },
      toggleCardLike: () => {
        const cardId = card.getId(); // Sets id of card
        if (card.isLiked()) {
          // Card liked by others =
          api.removeCardLike(cardId).then((res) => {
            card.updateLikes(res.likes);
            // If clicked when liked..remove active-heart
            // Returns arra with all likes
          });
        } else {
          api.addCardLike(cardId).then((res) => {
            card.updateLikes(res.likes);
          });
        }
      },
    },
    selectors.cardTemplate,
    userId // refer to user
  );
  return card.getView();
};

/* -------------------------------- User API -------------------------------- */

// Set initial data for user (from server)
// Userdata = array of user info
api.loadUserInfo().then((userData) => {
  userInfo.setUserInfo({
    profileName: userData.name,
    profileJob: userData.about,
  });

  userId = userData._id; // Set the userId equal to user
});

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
    // Edit profile field to server
    api.editUserInfo(input).then(() => {
      userInfo.setUserInfo({
        profileName: input.title,
        profileJob: input.description,
        // Changes input field "name='title'" dispalyed on main HTML
      });
      editProfileModal.close();
    });
  },
});

/* ------------------------------- Add-Button ------------------------------- */

// Uses inputs, creates card and adds to cardSection
function renderCard(data) {
  const newCardData = createCard(data); // Makes Card
  cardSection.prependItem(newCardData); // Adds card to beginning
}

// Change add-modal data when submit, st
const addCardModal = new PopupWithForms({
  popupSelector: selectors.addModal,
  handleFormSubmit: (input) => {
    api.addCard(input).then((input) => {
      // Adds card to server!!
      const newCardData = { name: input.name, link: input.link }; // new inputs
      renderCard(newCardData); // Uses inputs in process of making new card
      addCardModal.close(); // Allows to close
    });
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
