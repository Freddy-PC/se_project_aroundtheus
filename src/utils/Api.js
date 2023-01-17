export default class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
    this._headers = {
      authorization: this._authToken,
      "Content-Type": "application/json",
    };
  }

  _processServerResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  // Load cards from server
  // Refers to GET (fetch default) "https://around.nomoreparties.co/v1/group-12/cards"
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._processServerResponse);
    // .catch() handled in index.js
  }
  // Load user Info from server
  loadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._processServerResponse);
  }

  // Edits profile data on server
  editUserInfo(input) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: input.title,
        about: input.description,
      }),
      // name and about: are named properties from server
    }).then(this._processServerResponse);
  }

  // Add card to server
  addCard(input) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: input.title, // New card name
        link: input.link, // New card image
      }),
    }).then(this._processServerResponse);
  }

  // Remove card from server
  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._processServerResponse);
  }

  // Remove like
  removeCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._processServerResponse);
  }

  // Add like
  addCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._processServerResponse);
  }

  updateProfilePic(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.link, // change avatar link
      }),
      // name and about: are named properties from server
    }).then(this._processServerResponse);
  }
}
