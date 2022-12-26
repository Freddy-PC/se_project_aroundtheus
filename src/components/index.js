import "../pages/index.css";

import { initialCards, selectors } from "./constants.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";

// import { closeModal, openModal } from "./utils.js";

/* -------------------------------------------------------------------------- */
/*                         Create instances of classes                        */
/* -------------------------------------------------------------------------- */

// Hidden Modal Window
const viewCardModal = new PopupWithImage(selectors.viewModal);

// Render Card with Section (Started code here)
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = new Card(
        {
          data,
          toggleImageClick: (imgData) => {
            viewCardModal.open(imgData);
          },
        },
        selectors.cardTemplate
      ); // Initialize card from Card.js
      cardSection.addItem(cardElement.getView()); // Add element from Section.js
    },
  },
  selectors.cardList
);

// Manage profile data
const editProfileModal = new UserInfo(selectors.userName, selectors.userJob);

/* -------------------------------------------------------------------------- */
/*                           Initiate all instances                           */
/* -------------------------------------------------------------------------- */

cardSection.renderItems(initialCards);
viewCardModal.setEventListeners();
/* -------------------------------------------------------------------------- */
/*                                 All of rest                                */
/* -------------------------------------------------------------------------- */

// Evenlisteners for Profile and Edit Buttons
