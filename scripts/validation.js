// enabling validation by calling enableValidation()
// pass all the settings on call

function enableValidation(formOptions) {
  const formElements = [...document.querySelectorAll(formOptions.formSelector)];
  console.log(formElements);
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      /* Won't refresh page after validation */
      evt.preventDefault();
    });
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
