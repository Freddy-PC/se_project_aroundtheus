import Popup from "./Popup.js";

// Selects fields in plus-icon (add-Button)
class PopupWithForms extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;

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
    this._popupForm.reset();
    super.close(); // Can this be called first? ////////////////////////////
  }
}

export default PopupWithForms;
