import { openModal } from "./utils.js";
import { viewCardEl, viewCardCaption, viewCardModal } from "./index.js";

class Card {
  constructor(data, cardSelector) {
    // Data passed in renderCard
    // In charge of only 'card'
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    return this._cardSelector.cloneNode(true);
  }

  // Public function
  getView() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();

    // Replace image src
    this._cardElement.querySelector(".card__image").src = this._link;
    // Replace image alt
    this._cardElement.querySelector(".card__image").alt = this._name;
    // Replace title
    this._cardElement.querySelector(".card__title").textContent = this._name;
    // Return 'this'
    return this._cardElement;
  }

  _toggleCardLike = () => {
    this._cardLikeBtn.classList.toggle("card__like-button_active");
  };

  _toggleCardDelete = () => {
    this._cardElement.remove();
  };

  _toggleImage = () => {
    // Image modal with stuff appears
    viewCardEl.src = this._link;
    viewCardEl.alt = this._name;
    viewCardCaption.textContent = this._name;
    openModal(viewCardModal);
  };

  // Handlers are called after they exist
  _setEventListeners() {
    // When like-button is clicked...
    this._cardLikeBtn = this._cardElement.querySelector(".card__like-button");
    this._cardLikeBtn.addEventListener("click", this._toggleCardLike);
    // When delete-button is clicked...
    this._cardDeleteBtn = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardDeleteBtn.addEventListener("click", this._toggleCardDelete);
    // When image is clicked...
    this._imageEl = this._cardElement.querySelector(".card__image");
    this._imageEl.addEventListener("click", this._toggleImage);
  }
}

export default Card;
