/* At end of submitting project si the order of my functions optimal? 
   What functions should go first/be at the top? */

// // Will hide error if input is valid
function hideInputError(formElement, inputElement, formOptions) {
  const errorMessageEl = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formOptions.inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(formOptions.errorClass);
}

// Will show error if input is invalid
function showInputError(formElement, inputElement, formOptions) {
  // Finds input element from id if not valid
  const errorMessageEl = formElement.querySelector(`#${inputElement.id}-error`);
  /* Add input error class to input element 
     Used parameter within config (formOptions) */
  inputElement.classList.add(formOptions.inputErrorClass);
  // Browser changes error message text
  errorMessageEl.textContent = inputElement.validationMessage;
  // Makes the message visible
  errorMessageEl.classList.add(formOptions.errorClass);
}

// Checks if input fields are valid
function checkInputValidity(formElement, inputElement, formOptions) {
  // if input element is not valid
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, formOptions);
  } else {
    hideInputError(formElement, inputElement, formOptions);
  }
}

// Listen for input field validation
function setEventListeners(formElement, formOptions) {
  /* Grab input fields */
  const inputElements = [
    ...formElement.querySelectorAll(formOptions.inputSelector),
  ];
  /* Loop through input fields and listen for event = input */
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      // Check for submit, input fields, and config (formOptions)
      checkInputValidity(formElement, inputElement, formOptions);
    });
  });
}

// enabling validation by calling enableValidation()
function enableValidation(formOptions) {
  const formElements = [...document.querySelectorAll(formOptions.formSelector)];
  /* Loop through form elements and listen for event = submit */
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      /* Won't refresh page after validation */
      evt.preventDefault();
    });
    /* Call just the form elements (formElement) 
       and config (formOptions)   */
    setEventListeners(formElement, formOptions);
    // do after inputting other functions!!!
    // look for inputs inside of form

    /* loop through all inputs to see if all are valid */

    /* if input is not valid*/

    /* get validation message*/

    /* add error class to input*/

    /* display error message*/

    /* disable button*/

    /* if all inputs are valid then enable button */

    /* reset error messages*/
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  // the following need new coding
  inactiveButtonClass: "modal__button_disabled",
  // border
  inputErrorClass: "modal__input_type_error",
  // error text
  errorClass: "modal__error_visible",
};

enableValidation(config);
