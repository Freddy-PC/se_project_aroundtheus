import Popup from ".Popup.js";

class PopupWithForms extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);

    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    /* handleFormSubmit = callback that PopupWithForm 
           calls when the forms submit event fires */
  }
  _getInputValues() {
    /* Collects data from all the input fields 
       and returns that data as an object */
  }
  setEventListeners() {
    /*  Add the submit event handler to the form 
        and the click event listener to the close icon*/
  }
  close() {
    // Resets the form once the popup is closed
    this._popupForm.reset();
    super.close(); // Can this be called first?
  }
}

export default PopupWithForms;
