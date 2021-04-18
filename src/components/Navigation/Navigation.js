import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import './Navigation.css'
import logout from '../../images/logout.svg'
import exit from '../../images/logout2.svg'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Navigation({ onLogin, loggedIn, isMenuOpened, onMenuClose, onLogout }) {
    const currentUser = React.useContext(CurrentUserContext)

    return <Switch>
        <Route path="/" exact>
            { loggedIn ?
                <div className={ `navigation ${ isMenuOpened && 'navigation_opened' }` }>
                    <Link to="/" className="navigation__main-page" onClick={ onMenuClose }>Главная</Link>
                    <Link to="/saved-news" className="navigation__saved-news" onClick={ onMenuClose }>Сохранённые статьи</Link>
                    <Link to="/" className="navigation__logout" onClick={ onLogout }>
                        <p className="navigation__logout-name">{ currentUser.name }</p>
                        <img className="navigation__logout-image" src={ logout } alt="Выход" />
                    </Link>
                </div>
                :
                <div className={ `navigation ${ isMenuOpened && 'navigation_opened' }` }>
                    <Link to="/" className="navigation__main-page" onClick={ onMenuClose }> Главная</Link>
                    <p
                        className="navigation__auth"
                        onClick={ onLogin }
                    >Авторизоваться</p>
                </div>
            }
        </Route>
        <Route path="/saved-news">
            <div className={ `navigation navigation_saved-news ${ isMenuOpened && 'navigation_opened' }` }>
                <Link
                    to="/"
                    className="navigation__main-page navigation__main-page_saved-news"
                    onClick={ onMenuClose }
                >Главная
                </Link>
                <Link to="/saved-news" className="navigation__saved-news navigation__saved-news_saved-news" onClick={ onMenuClose }>Сохранённые статьи</Link>
                <button className="navigation__logout navigation__logout_saved-news" onClick={ onLogout }>
                    <p className="navigation__logout-name">{ currentUser.name }</p>
                    <img className="navigation__logout-image" src={ isMenuOpened ? logout : exit } alt="Выход" />
                </button>
            </div>
        </Route>
    </Switch>
}

export default Navigation
