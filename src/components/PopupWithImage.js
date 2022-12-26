import Popup from ".Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._modalImage = this._popupElement.querySelector(".modal__image");
    this._modalText = this._popupElement.querySelector(".modal__caption");
  }

  open(data) {
    // Add an image to the popup, img 'src' + img 'caption', and text
    this._modalImage.src = data.link;
    this._modalImage.alt = `Image ${data.name}`;
    this._modalText.textContent = data.text;
    // Call on method from parent (Popup)
    super.open();
  }
}

export default PopupWithImage;

/* Has same functionality as _template in Card class...
       should I delete functionlity from Card class??? */
