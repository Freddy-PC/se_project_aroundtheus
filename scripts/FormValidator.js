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
  }

  _setEventListeners() {
    this._inputElements = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        // Check for submit, input fields, and settings (constructor)
        /* NOT private...delete parameters later to test if still works...
           Should work since 'this' values are called 
           when needed.. dont need to be in parameters? */
        this.checkInputValidity(inputElement);
        // Pass in input fields, save-button, and config to be used in functions
        this._toggleButtonState();
      });
    });
  }
  /* --------------------------------- Part 1 --------------------------------- */
  checkInputValidity(inputElement) {
    // if input element is not valid
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    // Does it matter that errorMessage has this??? Test later...
    this._errorMessageEl = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    this._errorMessageEl.textContent = inputElement.validationMessage; //differ
    this._errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    this._errorMessageEl = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    this._errorMessageEl.textContent = "";
    this._errorMessageEl.classList.remove(this._errorClass);
  }

  /* --------------------------------- Part 2 --------------------------------- */
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _hasInvalidInput() {
    // Don't need to have inputElement in parameter?
    // Functions well but why??
    return !this._inputElements.every(
      (inputElement) => inputElement.validity.valid
    );
  }

  _disableButton() {
    // submitButton is within _setEventListeners
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
    // Add so add-modal button is inactive from begininning???
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }
}

// Called in index.js
export default FormValidator;
