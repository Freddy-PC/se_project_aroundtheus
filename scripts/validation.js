/* At end of submitting project si the order of my functions optimal? 
   What functions should go first/be at the top? */

// Listen for input field validation

function setEventListeners(formElement, formOptions) {
  /* Grab input fields */
  const inputElements = [
    ...formElement.querySelectorAll(formOptions.inputSelector),
  ];
  /* Loop through input fields and 
     listen for event = input   
     */
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      console.log(inputElement.validationMessage);
    });
  });
}

// enabling validation by calling enableValidation()

function enableValidation(formOptions) {
  const formElements = [...document.querySelectorAll(formOptions.formSelector)];
  /* Loop through form elements and 
     listen for event = submit   */
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      /* Won't refresh page after validation */
      evt.preventDefault();
    });
    /* Call just the form elements (formElement) 
       and config (formOptions)   */
    setEventListeners(formElement, formOptions);
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
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
