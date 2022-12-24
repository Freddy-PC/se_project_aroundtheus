import Popup from ".Popup.js";

class PopupWithImage extends Popup {
  open({ link, name }) {
    // Add an image to the popup
    // Add img 'src' and img 'caption'
    this._popupElement.querySelector(".modal__caption").textContent = name;
    const image = this._popupElement.querySelector(".modal__image");
    /* Has same functionality as _template in Card class...
       should I delete functionlity from Card class??? */
    image.src = link;
    image.alt = name; // Name was differnt in live code...
    // Call on method from parent (Popup)
    super.open();
  }
}

export default PopupWithImage;
