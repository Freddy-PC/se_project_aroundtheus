export default class Popup {
  constructor(popupSelector) {
    // this._popupElement = modal
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this); // (.bind(this)) needed to not losee lose context 'this'
  }
  _handleEscClose(evt) {
    /* Closes popup when 'Esc' key pressed */
    if (evt.key === "Escape") {
      this.close();
    }
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
    //When the Escape key is pressed closeModal
  }
  setEventListeners() {
    /* Close Modal when you click: on shaded area of form
       or close icon of Modal */
    // Mousedown = Onlt when you click on areas that can close
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("modal_opened") ||
        evt.target.classList.contains("modal__exit-button")
      ) {
        this.close();
      }
    });
  }
}
