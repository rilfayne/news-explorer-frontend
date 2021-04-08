import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import './Header.css'
import Navigation from '../Navigation/Navigation'

function Header({ onLogin, loggedIn, isMenuOpened, onMenuClick, onMenuClose, isSomePopupOpen }) {
    return <Switch>
        <Route path="*">
            <header className={ `header ${ isMenuOpened && 'header_menu-opened' }` }>
                <div className="header__container">
                    <Link to="/" className="header__logo" onClick={ onMenuClose }>NewsExplorer</Link>
                    <button
                        type="button"
                        className={ `${isSomePopupOpen ? 'header__button_disable' : 'header__button'} ${ isMenuOpened && 'header__button_menu-opened' }` }
                        onClick={ onMenuClick }
                    />
                </div>
                <Navigation
                onLogin={ onLogin }
                loggedIn={ loggedIn }
                isMenuOpened={ isMenuOpened }
                onMenuClose={ onMenuClose }
                />
            </header>
            <div className={ `header-overlay ${ isMenuOpened && 'header-overlay_menu-opened' }` }/>
        </Route>
    </Switch>
}

export default Header
