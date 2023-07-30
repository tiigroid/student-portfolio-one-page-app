class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _request(url, options) {
    return fetch(url, options).then(res => res.ok ? res.json() : Promise.reject(res))
  }

  register(email, password) {
    return this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
        email
      })
    })
  }

  login(email, password) {
    return this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
        email
      })
    })
  }

  logout() {
    return this._request(`${this._baseUrl}/signout`, {
      credentials: 'include'
    })
  }

  getUserData() {
    return this._request(`${this._baseUrl}/users/me`, {
      credentials: 'include'
    })
  }

  patchUserData(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
  }

  patchUserAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      credentials: 'include',
    })
  }

  postCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    if(isLiked) {
      return this._deleteCardLike(cardId)
    } else {
      return this._putCardLike(cardId)
    }
  }

  _putCardLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
    })
  }

  _deleteCardLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
    })
  }
}

const api = new Api('https://tiigroid.hopto.org/dream/api');

export default api;
