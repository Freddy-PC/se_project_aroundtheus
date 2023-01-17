import "../pages/index.css";
import {
  selectors,
  profileTitleInput,
  profileDescriptionInput,
  editProfileButton,
  addCardButton,
  changeProfileImageButton,
  settings,
  profileEditForm,
  cardAddForm,
  changeImageForm,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../utils/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

/* -------------------------------------------------------------------------- */
/*                         Create instances of classes                        */
/* -------------------------------------------------------------------------- */

/* -------------------------------- Card API -------------------------------- */

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

// Hidden Image Modal Window
const viewCardModal = new PopupWithImage(selectors.viewModal);
const deleteCardModal = new PopupWithConfirm(selectors.deleteCardModal);

// Creates card and image-modal
const createCard = (objectData) => {
  const card = new Card(
    {
      data: objectData,
      toggleImageClick: (imgData) => {
        viewCardModal.open(imgData);
      },
      toggleCardDelete: () => {
        const cardId = card.getId();
        deleteCardModal.open();
        deleteCardModal.setSubmit(() => {
          deleteCardModal.renderSavingText(true); // Upload process underway!
          api
            .removeCard(cardId)
            .then(() => {
              card.deleteCard(); // Remove card for user
              deleteCardModal.close();
            })
            .catch((err) => console.log(err)) // Locate errors
            .finally(() => {
              deleteCardModal.renderSavingText(false); // Reset process
            });
        });
      },
      toggleCardLike: () => {
        const cardId = card.getId(); // Sets id of card
        if (card.isLiked()) {
          // Card liked by others:
          api
            .removeCardLike(cardId)
            .then((res) => {
              card.updateLikes(res.likes);
              // If clicked when liked..remove active-heart
              // Returns array with all likes
            })
            .catch((err) => console.log(err));
        } else {
          api
            .addCardLike(cardId)
            .then((res) => {
              card.updateLikes(res.likes);
            })
            .catch((err) => console.log(err));
        }
      },
    },
    selectors.cardTemplate,
    userId // refer to user
  );
  return card.getView();
};

/* ------------------------- Change Edit-Button API ------------------------- */

// Manage profile field data in edit-button
const userInfo = new UserInfo({
  userName: selectors.userName,
  userJob: selectors.userJob,
  profileImage: selectors.profileImage,
});

// Object values equal input-field values from past, st
function fillProfileForm() {
  const { name, job } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
}

// Change edit-modal data when submit
const editProfileModal = new PopupWithForm({
  popupSelector: selectors.editModal,
  handleFormSubmit: (input) => {
    // Edit profile field to server
    editProfileModal.renderSaving(true);
    api
      .editUserInfo(input)
      .then(() => {
        userInfo.setUserInfo({
          profileName: input.title,
          profileJob: input.description,
          // Changes input field "name='title'" dispalyed on main HTML
        });
        editProfileModal.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        editProfileModal.renderSaving(false); // Reset process
      });
  },
});

/* ----------------------- Saved Edit-button data API ----------------------- */

// Loads updated input field data (from server)
// Userdata = array of user info
api
  .loadUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      profileName: userData.name,
      profileJob: userData.about,
    });
    userInfo.setProfileImage(userData); // Loads Image updated from server

    userId = userData._id; // Set the userId equal to user
  })
  .catch((err) => console.log(err));

/* ----------------------------- User Image API ----------------------------- */

const profileImage = new UserInfo({ profileImage: selectors.profileImage });

const changeProfileImageModal = new PopupWithForm({
  popupSelector: selectors.profileImageModal,
  handleFormSubmit: (input) => {
    // Update profile-image via server
    changeProfileImageModal.renderSaving(true);
    api
      .updateProfilePic(input)
      .then(() => {
        profileImage.setProfileImage({
          avatar: input.link,
        });
        changeProfileImageModal.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        changeProfileImageModal.renderSaving(false); // Reset process
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
const addCardModal = new PopupWithForm({
  popupSelector: selectors.addModal,
  handleFormSubmit: (input) => {
    addCardModal.renderSaving(true);
    api
      .addCard(input)
      .then((arrayInputs) => {
        // Adds card to server!!
        const newCardData = arrayInputs; // new inputs
        renderCard(newCardData); // Uses inputs in process of making new card
        addCardModal.close(); // Allows to close
      })
      .catch((err) => console.log(err))
      .finally(() => {
        addCardModal.renderSaving(false); // Reset process
      });
  },
});

/* ------------------------------- Validation ------------------------------- */

// Validate for edit button (used ID)
const editFormValidator = new FormValidator(settings, profileEditForm);
// Validate for add button
const addFormValidator = new FormValidator(settings, cardAddForm);
//Validate for edit-icon on profile image
const changeImageValidator = new FormValidator(settings, changeImageForm);

/* -------------------------------------------------------------------------- */
/*                           Initiate all instances                           */
/* -------------------------------------------------------------------------- */

viewCardModal.setEventListeners(); // Card modal
deleteCardModal.setEventListeners();

editProfileModal.setEventListeners(); // Edit-button modal
addCardModal.setEventListeners(); // Add-button modal
changeProfileImageModal.setEventListeners(); // Profile-image modal

editFormValidator.enableValidation(); // Validates edit fields in Edit-modal
addFormValidator.enableValidation();
changeImageValidator.enableValidation();

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
//Click edit-icon on profile image...
changeProfileImageButton.addEventListener("click", () => {
  changeProfileImageModal.open();
  changeImageValidator.resetValidation();
});
