const TOKEN_KEY = 'jwt'

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}

export const setUserDataToStorage = (data) => {
    localStorage.setItem('user', JSON.stringify(data))
}

export const getUserDataFromStorage = () => JSON.parse(localStorage.getItem('user'))

export const removeUserDataFromStorage = () => {
    localStorage.removeItem('user')
}

export const setSavedCardsToStorage = (cards) => {
    localStorage.setItem('savedCards', JSON.stringify(cards))
}

export const getSavedCardsFromStorage = () => JSON.parse(localStorage.getItem('savedCards'))

export const removeSavedCardsFromStorage = () => {
    localStorage.removeItem('savedCards')
}
