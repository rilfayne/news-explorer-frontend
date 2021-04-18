import { getToken } from './Storage'

class MainApi {
    constructor() {
        this.url = 'https://api.rilfayne-news.nomoredomains.icu'
        this.headers = { "Content-Type": "application/json" }
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    register(email, password, name) {
        return fetch(`${this.url}/signup`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                'email': email,
                'password': password,
                'name': name
            }),
        })
            .then((res) => {
                this._getResponseData(res)
            })
            .then((res) => {
                return res
            })
    }

    login(email, password) {
        return fetch(`${this.url}/signin`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                'email': email,
                'password': password
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.json())
            })
            .then((data) => {
                return data
            })
    }

    getUserInfo() {
        const token = getToken()
        return fetch(`${this.url}/users/me`, {
            method: "GET",
            headers: {
                ...this.headers,
                authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => data)
    }

    saveNewCard(keyword, title, text, date, source, link, image) {
        const token = getToken()
        return fetch(`${this.url}/articles`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                keyword, title, text, date, source, link, image
            })
        })
            .then(res => this._getResponseData(res))
    }

    deleteCard(cardId) {
        const token = getToken()
        return fetch(`${this.url}/articles/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => this._getResponseData(res))
    }

    getCards() {
        const token = getToken()
        return fetch(`${this.url}/articles`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => this._getResponseData(res))
    }
}

const mainApi = new MainApi()

export default mainApi
