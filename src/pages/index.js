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

// Objects value to input fields
const userInfo = new UserInfo({
  userName: selectors.userName,
  userJob: selectors.userJob,
});

// Manage changing profile data, st
function infoProfileForm() {
  const { name, job } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
}

// Manage form data submit
const editProfileForm = new PopupWithForms({
  popupSelector: selectors.editModal,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({
      profileName: data.name,
      profileJob: data.job,
    });
  },
});
// How to make submit button work for edit?? ?????????????????????????????????????????????????????????
// Paremeters from setUserInfo or _getInputValues() in PopupWithForms?????

/* -------------------------------------------------------------------------- */
/*                           Initiate all instances                           */
/* -------------------------------------------------------------------------- */

cardSection.renderItems(initialCards);
viewCardModal.setEventListeners(); // Card modal
editProfileForm.setEventListeners(); // Edit-button modal

// ...what call addCardButtonModal

/* -------------------------------------------------------------------------- */
/*                                 All of rest                                */
/* -------------------------------------------------------------------------- */

// When you click edit-icon...
editProfileButton.addEventListener("click", () => {
  infoProfileForm();
  editProfileForm.open();
});
