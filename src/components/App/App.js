import React from 'react'
import '../../vendor/normalize.css'
import '../../fonts/fonts.css'
import './App.css'
import Main from '../Main/Main'
import About from '../About/About'
import Footer from '../Footer/Footer'
import LoginPopup from '../LoginPopup/LoginPopup'
import RegistrationPopup from '../RegistrationPopup/RegistrationPopup'
import SignupSuccessPopup from '../SignupSuccessPopup/SignupSuccessPopup'
import NewsCardList from '../NewsCardList/NewsCardList'
import { Route, Switch, useHistory } from 'react-router-dom'
import SavedNews from '../SavedNews/SavedNews'
import Preloader from '../Preloader/Preloader'
import newsApi from '../../utils/NewsApi'
import NotFound from '../NotFound/NotFound'
import mainApi from '../../utils/MainApi'
import {
    setToken,
    getToken,
    removeToken,
    getUserDataFromStorage,
    getSavedCardsFromStorage,
    setUserDataToStorage,
    setSavedCardsToStorage,
    removeSavedCardsFromStorage,
    removeUserDataFromStorage
} from '../../utils/Storage'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

function App() {
    const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false)
    const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = React.useState(false)
    const [isSignupSuccessPopupOpen, setIsSignupSuccessPopupOpen] = React.useState(false)
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [isCardListOpen, setIsCardListOpen] = React.useState(false)
    const [isMenuOpened, setIsMenuOpened] = React.useState(false)
    const [isSomePopupOpen, setIsSomePopupOpen] = React.useState(false)
    const [errorInputSearch, setErrorInputSearch] = React.useState(false)
    const [isPreloaderOpen, setIsPreloaderOpen] = React.useState(false)
    const [isNotFoundOpen, setIsNotFoundOpen] = React.useState(false)
    const [cards, setCards] = React.useState([])
    let [savedCards, setSavedCards] = React.useState([])
    const [isRegistrationServerError, setIsRegistrationServerError] = React.useState(false)
    const [currentUser, setCurrentUser] = React.useState({})
    const [keyword, setKeyword] = React.useState('')
    const history = useHistory()

    function closeAllPopups() {
        setIsLoginPopupOpen(false)
        setIsRegistrationPopupOpen(false)
        setIsSignupSuccessPopupOpen(false)
        setIsSomePopupOpen(false)
        setIsMenuOpened(false)
        setIsRegistrationServerError(false)
        document.removeEventListener('keyup', handleEscClose)
    }

    function handleEscClose(e) {
        if (e.key === 'Escape') {
            closeAllPopups()
        }
    }

    function handleLoginClick(e) {
        e.preventDefault()
        closeAllPopups()
        setIsLoginPopupOpen(true)
        setIsSomePopupOpen(true)
        document.addEventListener('keyup', handleEscClose)
    }

    function handleRegistrationClick(e) {
        e.preventDefault()
        closeAllPopups()
        setIsRegistrationPopupOpen(true)
        setIsSomePopupOpen(true)
        document.addEventListener('keyup', handleEscClose)
    }

    function handleMenuClick() {
        if (isMenuOpened === false) {
            setIsMenuOpened(true)
        } else {
            setIsMenuOpened(false)
        }
    }

    function handleMenuClose() {
        setIsMenuOpened(false)
    }

    function handleSubmitSearchForm(keyword) {
        if (keyword === '') {
            setErrorInputSearch(true)
        } else {
            setErrorInputSearch(false)
            setIsPreloaderOpen(true)
            setIsCardListOpen(true)
            newsApi.getArticles(keyword)
                .then((cards) => {
                    setIsNotFoundOpen(false)
                    setCards(cards.articles)
                    setKeyword(keyword)
                    if (cards.articles.length === 0) {
                        setIsNotFoundOpen(true)
                        setIsPreloaderOpen(false)
                        setIsCardListOpen(false)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    setIsNotFoundOpen(true)
                })
                .finally(() => {
                    setIsPreloaderOpen(false)
                })
        }
    }

    function handleDeleteNews(news) {
        const savedCard = savedCards.find((c) => c.link === news.url)
        handleDeleteSavedNews(savedCard)
    }

    function handleDeleteSavedNews(card) {
        mainApi.deleteCard(card._id)
            .then((res) => {
                const resultCards = savedCards.filter(card => card._id !== res._id)
                setSavedCards(resultCards)
                setSavedCardsToStorage(resultCards)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleRegister = (user) => {
        const { email, password, name } = user
        mainApi.register(email, password, name)
            .then((res) => {
                if (res === undefined) {
                    setIsRegistrationServerError(true)
                } else {
                    closeAllPopups()
                    setIsSignupSuccessPopupOpen(true)
                    setIsRegistrationServerError(false)
                }
            })
            .catch((err) => {
                console.log('Ошибка', err)
                setIsRegistrationServerError(true)
            })
    }

    const handleLogin = (user) => {
        const { email, password } = user
        if (!email || !password) {
            return
        }
        mainApi.login(email, password)
            .then((res) => {
                if (res.token) {
                    setToken(res.token)
                }
                return res.token
            })
            .then(() => {
                tokenCheck()
            })
            .catch((err) => {
                console.log('Ошибка', err)
            })
    }

    const tokenCheck = React.useCallback(() => {
        const jwt = getToken()
        if (!jwt) {
            history.push('/')
            setIsLoggedIn(false)
        } else {
            Promise.all([mainApi.getUserInfo(), mainApi.getCards()])
                .then((values) => {
                    const [userData, cards] = values
                    setCurrentUser(userData)
                    setSavedCards(cards)
                    setUserDataToStorage(userData)
                    setSavedCardsToStorage(cards)
                })
                .then(() => {
                    setIsLoggedIn(true)
                    history.push('/')
                    setIsLoginPopupOpen(false)
                })
                .catch((err) => {
                    history.push('/')
                    setIsLoginPopupOpen(true)
                    console.log(err)
                })
        }
    }, [history])

    React.useEffect(() => {
        const jwt = getToken()
        const userDataFromStorage = getUserDataFromStorage()
        const savedCardsFromStorage = getSavedCardsFromStorage()
        if (!jwt) {
            setIsLoggedIn(false)
            if (history.location.state) {
                setIsLoginPopupOpen(true)
                history.replace('/', undefined)
            }
        } else {
            setSavedCards(savedCardsFromStorage)
            setIsLoggedIn(true)
            setCurrentUser(userDataFromStorage)
        }
    }, [history])

    const logOut = () => {
        history.push('/')
        removeToken()
        removeSavedCardsFromStorage()
        removeUserDataFromStorage()
        setIsLoggedIn(false)
        setCurrentUser({})
        setSavedCards([])
    }

    return (
        <div className="page">
            <CurrentUserContext.Provider value={ currentUser }>
                <Switch>
                    <Route path="/" exact>
                        <Main
                            onLogin={ handleLoginClick }
                            loggedIn={ isLoggedIn }
                            isMenuOpened={ isMenuOpened }
                            onMenuClick={ handleMenuClick }
                            onMenuClose={ handleMenuClose }
                            isSomePopupOpen={ isSomePopupOpen }
                            onSearch={ handleSubmitSearchForm }
                            errorInputSearch={ errorInputSearch }
                            onLogout={ logOut }
                            savedNews={ savedCards }
                        />
                        <Preloader isPreloaderOpen={ isPreloaderOpen }/>
                        <NotFound isNotFoundOpen={ isNotFoundOpen }/>
                        <NewsCardList
                            isOpen={ isCardListOpen }
                            cards={ cards }
                            isLoggedIn={ isLoggedIn }
                            keyword={ keyword }
                            savedCards={ savedCards }
                            onDeleteCard={ handleDeleteNews }
                            isRegistrationPopupOpen={ setIsRegistrationPopupOpen }
                        />
                        <About/>
                        <Footer/>
                        <LoginPopup
                            isOpen={ isLoginPopupOpen }
                            onClose={ closeAllPopups }
                            onRegistration={ handleRegistrationClick }
                            onSubmit={ handleLogin }
                        />
                        <RegistrationPopup
                            isOpen={ isRegistrationPopupOpen }
                            onClose={ closeAllPopups }
                            onLogin={ handleLoginClick }
                            onSubmit={ handleRegister }
                            isServerError={ isRegistrationServerError }
                        />
                        <SignupSuccessPopup
                            isOpen={ isSignupSuccessPopupOpen }
                            onClose={ closeAllPopups }
                            onLogin={ handleLoginClick }
                        />
                    </Route>
                    <ProtectedRoute
                        path="/saved-news"
                        loggedIn={ isLoggedIn }
                    >
                        <Main
                            isMenuOpened={ isMenuOpened }
                            onMenuClick={ handleMenuClick }
                            onMenuClose={ handleMenuClose }
                            savedNews={ savedCards }
                            onLogout={ logOut }
                        />
                        <SavedNews
                            isOpen={ true }
                            savedCards={ savedCards }
                            isLoggedIn={ isLoggedIn }
                            keyword={ keyword }
                            onDeleteCard={ handleDeleteSavedNews }
                        />
                        <Footer/>
                    </ProtectedRoute>
                </Switch>
            </CurrentUserContext.Provider>
        </div>
    )
}

export default App
