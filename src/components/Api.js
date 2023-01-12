export default class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }

  // Refers to GET (fetch default) "https://around.nomoreparties.co/v1/group-12/cards"
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Jacques Cousteau",
        about: "Sailor, researcher",
      }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => {
        console.log(err);
      });
  }
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => {
        console.log(err);
      });
  }
  // ...
}
