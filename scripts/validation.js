/* At end of submitting project si the order of my functions optimal? 
   What functions should go first/be at the top? */

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__button_disabled",
  // border
  inputErrorClass: "modal__input_type_error",
  // error text
  errorClass: "modal__error_visible",
};

enableValidation(config);

// Validation for config
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
    // Done after inputting other functions!!!
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

/* ---------------- Listen for Input (Input field and Button) --------------- */

function setEventListeners(formElement, formOptions) {
  /* Grab input fields */
  const inputElements = [
    ...formElement.querySelectorAll(formOptions.inputSelector),
  ];
  const submitButton = formElement.querySelector(".modal__save-button");
  /* Loop through input fields and listen for event = input */
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      // Check for submit, input fields, and config (formOptions)
      checkInputValidity(formElement, inputElement, formOptions);
      // Pass in input fields, save-button, and config to be used in functions
      toggleButtonState(inputElements, submitButton, formOptions);
    });
  });
}

/* ------------------------- Input Field validation ------------------------- */

// Checks if input fields are valid
function checkInputValidity(formElement, inputElement, formOptions) {
  // if input element is not valid
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, formOptions);
  } else {
    hideInputError(formElement, inputElement, formOptions);
  }
}
/* --------------------- Error message for input fields --------------------- */

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

// // Will hide error if input is valid
function hideInputError(formElement, inputElement, formOptions) {
  const errorMessageEl = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formOptions.inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(formOptions.errorClass);
}

/* ------------------------- Save Button Validation ------------------------- */

// Looks through input elements and get validity
function toggleButtonState(inputElements, submitButton, formOptions) {
  /* If one invalid input = disable button*/
  if (hasInvalidInput(inputElements)) {
    disableButton(submitButton, formOptions);
  } else {
    enableButton(submitButton, formOptions);
  }
}

// If all inputs (inputlist) are not valid = false
function hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

// Adds disabled class to button
function disableButton(submitButton, formOptions) {
  submitButton.classList.add(formOptions.inactiveButtonClass);
  // Add disabled property so browser knows its disbaled
  return (submitButton.disabled = true);
}

function enableButton(submitButton, formOptions) {
  submitButton.classList.remove(formOptions.inactiveButtonClass);
  return (submitButton.disabled = false);
}
