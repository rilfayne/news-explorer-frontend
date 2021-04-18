import React, {useCallback} from 'react'
import './Main.css'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import { Route, Switch } from 'react-router-dom'
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Main({ onLogin, loggedIn, isMenuOpened, onMenuClick, onMenuClose, isSomePopupOpen, onSearch, errorInputSearch, onLogout, savedNews }) {
    const currentUser = React.useContext(CurrentUserContext)

    const getKeywordsListSortedByPopularity = useCallback((savedNews) => {
        const keywordsWithRangeNumber = savedNews
            .map((article) => article.keyword)
            .reduce((acc, keyword) => {
                if (!acc[keyword]) {
                    acc[keyword] = 1
                } else {
                    acc[keyword] += 1
                }
                return acc
            }, {})
        const filteredKeywordsArray = Object.keys(keywordsWithRangeNumber)
        return filteredKeywordsArray.sort((a, b) => {
            return keywordsWithRangeNumber[b] - keywordsWithRangeNumber[a]
        })
    }, [])

    const savedNewsWords = () => {
        if (savedNews.length === 1) {
            return 'сохранённая статья'
        } else if (savedNews.length > 1 && savedNews.length < 5) {
            return 'сохранённые статьи'
        } else if (savedNews.length === 0 || savedNews.length >=5) {
            return 'сохранённых статей'
        }
    }

    const moreKeywords = () => {
        const moreTopic = keywordsList.length - 2
        if (moreTopic <=1) {
            return ''
        } else if (moreTopic > 1 && moreTopic < 5) {
            return '-м другим'
        } else if (moreTopic > 4) {
            return '-ю другим'
        }
    }

    const keywordsList = getKeywordsListSortedByPopularity(savedNews)
    const firstKeyword = keywordsList[0]
    const secondKeyword = keywordsList[1]
    const thirdKeyword = keywordsList[2]

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
                    onLogout={ onLogout }
                />
                <div className={`main__container ${ isMenuOpened && 'main__container_menu-opened' }`}>
                    <h1 className="main__title">Что творится в мире?</h1>
                    <p className="main__subtitle">
                        Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.
                    </p>
                    <SearchForm
                        onSearch={ onSearch }
                        errorInputSearch={ errorInputSearch }
                    />
                </div>
            </main>
        </Route>
        <Route path="/saved-news">
            <main className="main main_saved-news">
                <SavedNewsHeader
                    isMenuOpened={ isMenuOpened }
                    onMenuClick={ onMenuClick }
                    onMenuClose={ onMenuClose }
                    onLogout={ onLogout }
                />
                <div className="main__container main__container_saved-news">
                    <h2 className="main__subtitle_saved-news"> Сохранённые статьи</h2>
                    <h1 className="main__title main__title_saved-news">
                        { currentUser.name }, у вас { savedNews.length } { savedNewsWords() }
                    </h1>
                    <div>
                        <p className="main__description_saved-news">
                            { keywordsList.length === 1
                            ? 'По ключевому слову:'
                            : keywordsList.length === 0
                                ? ''
                                : 'По ключевым словам:' }
                            <span className="main__description_bold-capitalize"> { firstKeyword }
                                { keywordsList.length > 1
                                    ? ', '+ secondKeyword + ' '
                                    : '' }
                            </span>
                            { keywordsList.length > 2 ? 'и ' : '' }
                            <span className="main__description_bold">
                                { keywordsList.length > 3
                                    ? ` ${ keywordsList.length - 2 }${ moreKeywords() }`
                                    : `${ thirdKeyword || '' }` }
                            </span>
                        </p>
                    </div>
                </div>
            </main>
        </Route>
    </Switch>
}

export default Main
