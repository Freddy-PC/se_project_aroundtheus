import Popup from "./Popup.js";

// Hidden Modal window
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._modalImage = this._popupElement.querySelector(".modal__image");
    this._modalText = this._popupElement.querySelector(".modal__caption");
  }

  open(data) {
    // Add an image with: img 'src', img 'caption', and text
    this._modalImage.src = data.link;
    this._modalImage.alt = `Image ${data.link}`;
    this._modalText.textContent = data.name;
    // Call on method from parent (Popup)
    super.open();
  }
}
