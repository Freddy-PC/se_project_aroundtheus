import Popup from "./Popup.js";

// Uesed in Hidden Delete Modal window
// Can be used for any confirmation
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._deleteSubmitButton = this._popupElement.querySelector(
      ".modal__delete-card-button"
    );
    this._deleteSubmitButtonText = this._deleteSubmitButton.textContent;
  }

  setSubmit(action) {
    this._handleSubmitCallback = action;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
  }

  // Updates yes-button text when saving
  renderSavingText(isConfirming) {
    if (isConfirming) {
      this._deleteSubmitButton.textContent = "Deleting...";
    } else {
      this._deleteSubmitButton.textContent = this._deleteSubmitButtonText;
    }
  }
}
