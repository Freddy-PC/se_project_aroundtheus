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
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
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

    return cardElement;
  }

  _setEventListeners() {
    /* They don't have handlers, which would be after 'click'
       what should I do? */
    /* Make handlers for each later?
     */
    this._cardLikeBtn = this._element.querySelector(".card__like-button");

    this._cardLikeBtn.addEventListener("click", toggleCardLike);
    this._cardDeleteBtn.addEventListener("click", toggleCardDelete);
    this._imageEl.addEventListener("click", toggleImage);
  }

  _toggleCardLike = () => {
    this._cardLikeBtn.classList.toggle("card__like-button_active");
  };

  _toggleCardDelete = () => {
    this._cardElement.remove();
  };

  _toggleImage = () => {
    viewCardEl.src = data.link;
    viewCardEl.alt = data.name;
    viewCardCaption.textContent = data.name;
    openModal(viewCardModal);
  };
}

export default Card;
