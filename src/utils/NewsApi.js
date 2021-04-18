class NewsApi {
    constructor() {
        this.url = 'https://nomoreparties.co/news/v2'
        this.apiKey = '42a9a80b3a57484388649d0da1ba7133'
    }

    getArticles(keyword) {
        const dateFrom = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        const dateTo = new Date(Date.now()).toISOString()
        return fetch(`${this.url}/everything?q=${keyword}&from=${dateFrom}&to=${dateTo}&pageSize=100&apiKey=${this.apiKey}`,
            { method: 'GET' },
        )
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }
}

const newsApi = new NewsApi()

export default newsApi
