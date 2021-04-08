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
import { Route, Switch } from 'react-router-dom'
import SavedNews from '../SavedNews/SavedNews'

function App() {
    const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false)
    const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = React.useState(false)
    const [isSignupSuccessPopupOpen, setIsSignupSuccessPopupOpen] = React.useState(false)
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [isCardListOpen, setIsCardListOpen] = React.useState(true)
    const [isMenuOpened, setIsMenuOpened] = React.useState(false)
    const [isSomePopupOpen, setIsSomePopupOpen] = React.useState(false)

    function closeAllPopups() {
        setIsLoginPopupOpen(false)
        setIsRegistrationPopupOpen(false)
        setIsSignupSuccessPopupOpen(false)
        setIsSomePopupOpen(false)
        setIsMenuOpened(false)
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

    return (
        <div className="page">
            <Switch>
                <Route path="/" exact>
                    <Main
                        onLogin={ handleLoginClick }
                        loggedIn={ isLoggedIn }
                        isMenuOpened={ isMenuOpened }
                        onMenuClick={ handleMenuClick }
                        onMenuClose={ handleMenuClose }
                        isSomePopupOpen={ isSomePopupOpen }
                    />
                    <NewsCardList
                        isOpen={ isCardListOpen }
                    />
                    <About />
                    <Footer />
                    <LoginPopup
                        isOpen={ isLoginPopupOpen }
                        onClose={ closeAllPopups }
                        onRegistration={ handleRegistrationClick }
                    />
                    <RegistrationPopup
                        isOpen={ isRegistrationPopupOpen }
                        onClose={ closeAllPopups }
                        onLogin={ handleLoginClick }
                    />
                    <SignupSuccessPopup
                        isOpen={ isSignupSuccessPopupOpen }
                        onClose={ closeAllPopups }
                        onLogin={ handleLoginClick }
                    />
                </Route>
                <Route path="/saved-news">
                    <Main
                        isMenuOpened={ isMenuOpened }
                        onMenuClick={ handleMenuClick }
                        onMenuClose={ handleMenuClose }
                    />
                    <SavedNews isOpen={ true }/>
                    <Footer />
                </Route>
            </Switch>
        </div>
    )
}

export default App
