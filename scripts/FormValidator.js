class FormValidator {
  constructor(settings, formElement) {
    // Private
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  }

  enableValidation() {
    // Grabs formElement
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    // Call on the method (setEventListeners) within the class
    this._setEventListeners();
    console.log(this);
  }

  _setEventListeners() {
    this._inputElements = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        // Check for submit, input fields, and settings (constructor)
        this._checkInputValidity(inputElement);
        // Pass in input fields, save-button, and config to be used in functions
        this._toggleButtonState();
      });
    });
  }

  checkInputValidity(inputElement) {
    // if input element is not valid
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    const errorMessageEl = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputElement.validationMessage; //differ
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageEl = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  /* --------------------------------- Divider -------------------------------- */
  // FIX HERE????
  // Where should inputElements be refered to???
  _toggleButtonState() {
    if (this._hasInvalidInput(inputElements)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _hasInvalidInput(inputElements) {
    return !inputElements.every((inputElement) => inputElement.validity.valid);
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }
}

// Called in index.js
export default FormValidator;
