import "../pages/index.css";
import {
  initialCards,
  selectors,
  profileTitleInput,
  profileDescriptionInput,
  editProfileButton,
  addCardButton,
} from "../components/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForms from "../components/PopupWithForms";

// import { closeModal, openModal } from "./utils.js";

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
      const cardElement = new Card(
        {
          data,
          toggleImageClick: (imgData) => {
            // Display image when clicked
            // Card.js
            viewCardModal.open(imgData); // Opens image
          },
        },
        selectors.cardTemplate
      ); // Initialize card from Card.js
      cardSection.addItem(cardElement.getView()); // Add element from Section.js
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
function infoProfileForm() {
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

// Make new card...like section
// const card = new Card(
//   {
//     data,
//     toggleImageClick: (imgData) => {
//       viewCardModal.open(imgData);
//     },
//   },
//   selectors.cardTemplate
// );
// selectors.cardList.prepend(card.getView());

// Change add-modal data when submit, st
const addCardModal = new PopupWithForms({
  popupSelector: selectors.addModal,
  handleFormSubmit: (input) => {
    const newCardData = { title: input.title, link: input.link }; // made of new inputs
    renderCard(newCardData); // Uses inputs in process of making new card

    /// Start here...what steps to take next??? WHat should card do??
    // Look at old index.js
    addCardModal.close();
  },
});

/* -------------------------------------------------------------------------- */
/*                           Initiate all instances                           */
/* -------------------------------------------------------------------------- */

cardSection.renderItems(initialCards);
viewCardModal.setEventListeners(); // Card modal
editProfileModal.setEventListeners(); // Edit-button modal
addCardModal.setEventListeners(); // Add-button modal

// ...what call addCardButtonModal

/* -------------------------------------------------------------------------- */
/*                                 All of rest                                */
/* -------------------------------------------------------------------------- */

// When you click edit-icon...
editProfileButton.addEventListener("click", () => {
  infoProfileForm();
  editProfileModal.open();
});
// Click add-icon...
addCardButton.addEventListener("click", () => {
  addCardModal.open();
});
