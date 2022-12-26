class Popup {
  constructor(popupSelector) {
    // this._popupElement = modal
    this._popupElement = document.querySelector(`.${popupSelector}`);
    this._handleEscClose = this._handleEscClose.bind(this); //Why?
  }
  _handleEscClose(evt) {
    // Closes popup when 'Esc' key pressed
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    // Adds click event listener to close icon of popup (modal)
    // Close Modal window when user clicks on shaded area of form
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
  open() {
    // Method called = adding class and eventListener
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    // Method called = removing class and eventListener
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    /* When the Escape key is pressed closeModal */
  }
}

export default Popup;
