class Card {
  constructor({ data, toggleImageClick, toggleCardDelete }, cardSelector) {
    // Data passed in renderCard
    // In charge of only 'card'
    this._name = data.name;
    this._link = data.link;
    this._id = data._id; // Refers to "_id" in cards "data"
    this._toggleImageClick = toggleImageClick;
    this._toggleCardDelete = toggleCardDelete;

    this._cardSelector = cardSelector;
  }

  // Return the Id of a card
  getId() {
    return this._id;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  // Public function, initiates card elements
  getView() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();

    //Replace image alt and src (this from line 58)
    this._imageEl.src = this._link;
    this._imageEl.alt = this._name;

    // Replace title textcontent
    const titleElement = this._cardElement.querySelector(".card__title");
    titleElement.textContent = this._name;

    // Return 'this'
    return this._cardElement;
  }

  _toggleCardLike = () => {
    this._cardLikeBtn.classList.toggle("card__like-button_active");
  };

  // Public...
  toggleCardDelete = () => {
    this._cardElement.remove();
  };

  // Handlers are called after they exist
  _setEventListeners() {
    // When like-button is clicked...
    this._cardLikeBtn = this._cardElement.querySelector(".card__like-button");
    this._cardLikeBtn.addEventListener("click", () => this._toggleCardLike());
    // When delete-button is clicked... (delete for user and server)
    this._cardDeleteBtn = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardDeleteBtn.addEventListener("click", () =>
      this._toggleCardDelete()
    );
    // When image is clicked...name and link are used!
    this._imageEl = this._cardElement.querySelector(".card__image");
    this._imageEl.addEventListener("click", () =>
      this._toggleImageClick({ name: this._name, link: this._link })
    );
  }
}

export default Card;
