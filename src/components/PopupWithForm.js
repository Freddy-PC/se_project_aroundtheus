import Popup from "./Popup.js";

/* Selects fields in add-icon 
   and edit-icon */
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;

    this._submitButton = this._popupElement.querySelector(
      ".modal__save-button"
    );
    this._submitButtonText = this._submitButton.textContent;

    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    // inputList accesses all input fields
    /* handleFormSubmit = callback that PopupWithForm 
           calls when the forms submit event fires */
  }
  _getInputValues() {
    const formValues = {};

    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
    /* Collects data from all the input fields 
       and returns that data as an object */
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      // Call function in function
    });
    /*  Add the submit event handler to the form 
        and the click event listener to the close icon*/
  }
  close() {
    // Resets the form once the popup is closed
    super.close();
    this._popupForm.reset();
  }

  // Updates save-button text when saving
  renderSaving(isSaving) {
    if (isSaving) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
