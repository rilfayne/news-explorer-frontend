import React from 'react'
import './NewsCard.css'
import { Route, Switch } from 'react-router-dom'
import mainApi from '../../utils/MainApi'
import { setSavedCardsToStorage } from '../../utils/Storage'

function NewsCard({ article, isLoggedIn, keyword, savedCards, onDeleteCard, isSavedNewsPage, isRegistrationPopupOpen }) {
    const [isCardSaved, setIsCardSaved] = React.useState(false)

    function getDate(value) {
        const date = new Date(value)
        const month = [
            "января",
            "февраля",
            "марта",
            "апреля",
            "мая",
            "июня",
            "июля",
            "августа",
            "сентября",
            "октября",
            "ноября",
            "декабря",
        ]

        return `${ date.getDate() } ${ month[date.getMonth()] }, ${ date.getFullYear() }`
    }

    function handleSaveNews() {
        if (isCardSaved === true) {
            onDeleteCard(article)
            setIsCardSaved(false)
        } else {
            mainApi.saveNewCard(
                keyword,
                article.title,
                article.description,
                article.publishedAt,
                article.source.name,
                article.url,
                article.urlToImage
            )
                .then((res) => {
                    setIsCardSaved(true)
                    savedCards.push(res)
                    setSavedCardsToStorage(savedCards)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    function handleDeleteCard() {
        onDeleteCard(article)
    }

    function handleClickToRegistration() {
        isRegistrationPopupOpen(true)
    }

    React.useEffect(() => {
        if(savedCards){
            const isSavedArticle = savedCards.find((c) => c.link === article.url)
            isSavedArticle ? setIsCardSaved(true) : setIsCardSaved(false)
        }
    }, [savedCards, article.url])

    return (
        <li className="card">
            <img
                className="card__image"
                src={ isSavedNewsPage
                    ? article.image
                    : article.urlToImage }
                alt="Новость"
            />
            <Switch>
                <Route path="/" exact>
                    { isLoggedIn ?
                        <button
                            className={ `card__button ${ isCardSaved 
                                ? 'card__save_active' 
                                : 'card__save' }` }
                            type="button"
                            aria-label="Сохранить"
                            onClick={ handleSaveNews }
                        />
                        :
                        <button
                            className="card__button card__save"
                            type="button"
                            aria-label="Сохранить"
                            onClick={ handleClickToRegistration }
                        >
                            <span className="card__tooltip">
                                Войдите, чтобы сохранять статьи
                            </span>
                        </button>
                    }
                </Route>
                <Route path="/saved-news">
                    <span className="card__theme">{ article.keyword }</span>
                    <button
                        className="card__button card__delete"
                        type="button"
                        aria-label="Удалить"
                        onClick={ handleDeleteCard }
                    >
                        <span className="card__tooltip card__tooltip_saved-news">
                            Убрать из сохранённых
                        </span>
                    </button>
                </Route>
            </Switch>
            <div className="card__description">
                <div className="card__container">
                    <h4 className="card__date">
                        { getDate(isSavedNewsPage
                            ? article.date
                            : article.publishedAt) }
                    </h4>
                    <h3 className="card__title">{ article.title }</h3>
                    <p className="card__subtitle">
                        { isSavedNewsPage
                            ? article.text
                            : article.description }
                    </p>
                </div>
                <h5 className="card__author">
                    { isSavedNewsPage
                        ? article.source
                        : article.source.name }
                </h5>
            </div>
        </li>
    )
}

export default NewsCard
