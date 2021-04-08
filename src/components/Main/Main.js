import React from 'react'
import './Main.css'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import { Route, Switch } from 'react-router-dom'
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader'

function Main({ onLogin, loggedIn, isMenuOpened, onMenuClick, onMenuClose, isSomePopupOpen }) {
    return <Switch>
        <Route path="/" exact>
            <main className="main">
                <Header
                    onLogin={ onLogin }
                    loggedIn={ loggedIn }
                    isMenuOpened={ isMenuOpened }
                    onMenuClick={ onMenuClick }
                    onMenuClose={ onMenuClose }
                    isSomePopupOpen={ isSomePopupOpen }
                />
                <div className={ `main__container ${ isMenuOpened && 'main__container_menu-opened' }` }>
                    <h1 className="main__title">Что творится в мире?</h1>
                    <p className="main__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
                    <SearchForm />
                </div>
            </main>
        </Route>
        <Route path="/saved-news">
            <main className="main main_saved-news">
                <SavedNewsHeader
                    isMenuOpened={ isMenuOpened }
                    onMenuClick={ onMenuClick }
                    onMenuClose={ onMenuClose }
                />
                <div className="main__container main__container_saved-news">
                    <h2 className="main__subtitle_saved-news"> Сохранённые статьи</h2>
                    <h1 className="main__title main__title_saved-news">Грета, у вас 5 сохранённых статей</h1>
                    <div>
                        <p className="main__description_saved-news">По ключевым словам:
                            <span className="main__description_bold"> Природа, Тайга </span>
                            и
                            <span className="main__description_bold"> 2-м другим</span>
                        </p>
                    </div>
                </div>
            </main>
        </Route>
    </Switch>
}

export default Main
