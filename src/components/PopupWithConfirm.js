import Popup from "./Popup.js";

// Hidden Delete Modal window
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
  open(handleFormSubmit) {
    // Call on method from parent (Popup)
    this._handleFormSubmit = handleFormSubmit;
    super.open();
  }
  close() {
    // Resets the form once the popup is closed
    super.close();
  }
}
