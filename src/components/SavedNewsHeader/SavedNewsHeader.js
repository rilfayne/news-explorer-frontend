import React from 'react'
import './SavedNewsHeader.css'
import Navigation from '../Navigation/Navigation'
import { Link, Route, Switch } from 'react-router-dom'

function SavedNewsHeader({ onMenuClick, isMenuOpened, onMenuClose }) {
    return <Switch>
        <Route path="*">
            <header className={ `header header_saved-news ${ isMenuOpened && 'header_menu-opened' }` }>
                <div className="header__container">
                    <Link
                        to="/"
                        className={ `header__logo header__logo_saved-news ${ isMenuOpened && 'header__logo_saved-news_menu-opened' }` }
                        onClick={ onMenuClose }
                    >
                        NewsExplorer
                    </Link>
                    <button type="button" className={ `header__button_saved-news ${ isMenuOpened && 'header__button_menu-opened' }` } onClick={ onMenuClick } />
                </div>
                <Navigation isMenuOpened={ isMenuOpened } onMenuClose={ onMenuClose }/>
            </header>
            <div className={ `header-overlay ${ isMenuOpened && 'header-overlay_menu-opened' }` }/>
        </Route>
    </Switch>
}

export default SavedNewsHeader
