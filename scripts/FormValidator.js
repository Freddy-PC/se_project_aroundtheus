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
    setEventListeners(formElement, formOptions);
  }

  _setEventListeners() {
    this._inputElements = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(".modal__save-button");
    /* Loop through input fields and listen for event = input */
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        // Check for submit, input fields, and config (formOptions)
        checkInputValidity(this._form, inputElement, formOptions);
        // Pass in input fields, save-button, and config to be used in functions
        toggleButtonState(inputElements, submitButton, formOptions);
      });
    });
  }
  /* Start here again, !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    parameter may conflict with code */

  checkInputValidity(formElement, inputElement, formOptions) {
    // if input element is not valid
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, formOptions);
    } else {
      hideInputError(formElement, inputElement, formOptions);
    }
  }

  _showInputError(inputElement) {
    // Finds input element from id if not valid
    const errorMessageEl = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    /* Add input error class to input element 
         Used parameter within config (formOptions) */
    inputElement.classList.add(formOptions.inputErrorClass);
    // Browser changes error message text
    errorMessageEl.textContent = inputElement.validationMessage;
    // Makes the message visible
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(formElement, inputElement, formOptions) {
    const errorMessageEl = formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(formOptions.inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(formOptions.errorClass);
  }

  /* --------------------------------- Divider -------------------------------- */

  _toggleButtonState(inputElements, submitButton, formOptions) {
    /* If one invalid input = disable button*/
    if (hasInvalidInput(this._inputElements)) {
      disableButton(this._submitButton, formOptions);
    } else {
      enableButton(this._submitButton, formOptions);
    }
  }

  /*
  _hasInvalidInput(inputList) {
    return !inputList.every((inputElement) => inputElement.validity.valid);
  }
  
  disableButton(submitButton, formOptions) {
    submitButton.classList.add(formOptions.inactiveButtonClass);
    return (submitButton.disabled = true);
  }
  
  enableButton(submitButton, formOptions) {
    submitButton.classList.remove(formOptions.inactiveButtonClass);
    return (submitButton.disabled = false);
  }
  */
}

// Called in index.js
export default FormValidator;
