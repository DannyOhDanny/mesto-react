class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ответа сервера! Код ошибки:${res.status} - ${res.statusText}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(res => this._handleServerResponse(res));
  }

  getCardsFromServer() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers
    }).then(res => this._handleServerResponse(res));
  }

  editProfileInfo({ name, position }) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: position
      })
    }).then(res => {
      return this._handleServerResponse(res);
    });
  }

  editAvatarPic(avatarUrlObj) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        //получаем объект данных с свойством .avatarlink
        avatar: avatarUrlObj.avatarlink
      })
    }).then(res => {
      return this._handleServerResponse(res);
    });
  }

  setNewCard(cardData) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name: cardData.picname, link: cardData.url })
    }).then(res => {
      return this._handleServerResponse(res);
    });
  }

  deleteUserCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => {
      return this._handleServerResponse(res);
    });
  }

  putUserLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(res => {
      return this._handleServerResponse(res);
    });
  }

  deleteUserLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => {
      return this._handleServerResponse(res);
    });
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-65/',
  headers: {
    authorization: 'bbcfaa98-6a77-40f9-8ffe-975506acb190',
    'Content-Type': 'application/json'
  }
});

export default api;
