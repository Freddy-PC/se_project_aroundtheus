class Card {
  constructor(
    { data, toggleImageClick, toggleCardDelete, toggleCardLike },
    cardSelector,
    userId
  ) {
    // Data passed in renderCard
    // console.log(data);
    this._name = data.name;
    this._link = data.link;
    this._id = data._id; // Refers id of a card (different each time)
    this._likes = data.likes; // "Likes" on array card
    this._userId = userId; // All cards have userId bc displayed (me)
    this._ownerId = data.owner._id; // Owner of cards
    this._toggleImageClick = toggleImageClick;
    this._toggleCardDelete = toggleCardDelete;
    this._toggleCardLike = toggleCardLike;

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

    //Replace image alt and src (this from line 71)
    this._imageEl.src = this._link;
    this._imageEl.alt = this._name;

    // Replace title textcontent
    const titleElement = this._cardElement.querySelector(".card__title");
    titleElement.textContent = this._name;
    // Set like tally
    this._cardTally = this._cardElement.querySelector(".card__like-tally");
    this._likeCard(); // Shows card likes from server

    // if the owner of the card isn't me...
    if (this._ownerId !== this._userId) {
      this._cardDeleteBtn.remove();
    }
    // Return 'this'
    return this._cardElement;
  }

  // Returns likes from arraysss
  isLiked() {
    return this._likes.some((like) => this._userId === like._id);
  }
  // === if types differ false is returned
  // like._id = returns EVERY user that liked
  // this._userId = me

  // Change likes
  updateLikes(likes) {
    this._likes = likes;
    this._likeCard();
  }

  // Changes like button #
  _likeCard() {
    if (this.isLiked()) {
      this._cardLikeBtn.classList.add("card__like-button_active");
      // liked by user = active
    } else {
      this._cardLikeBtn.classList.remove("card__like-button_active");
      // not-liked by user = inactive
    }
    this._cardTally.textContent = this._likes.length;
    //console.log(this._likes);
  }

  // Public...
  deleteCard = () => {
    this._cardElement.remove();
  };

  // Handlers are called after they exist
  _setEventListeners() {
    // When like-button is clicked...
    this._cardLikeBtn = this._cardElement.querySelector(".card__like-button");
    this._cardLikeBtn.addEventListener("click", () => this._toggleCardLike()); /////
    // When delete-button is clicked... (delete for user and server)
    this._cardDeleteBtn = this._cardElement.querySelector(
      ".card__delete-button"
      //"modal__delete-card-button"
    );
    this._cardDeleteBtn.addEventListener("click", () =>
      this._toggleCardDelete(this._id)
    );
    // When image is clicked...(name and link are used)
    this._imageEl = this._cardElement.querySelector(".card__image");
    this._imageEl.addEventListener("click", () =>
      this._toggleImageClick({ name: this._name, link: this._link })
    );
  }
}

export default Card;
