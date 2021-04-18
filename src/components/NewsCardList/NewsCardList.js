import React from 'react'
import './NewsCardList.css'
import NewsCard from '../NewsCard/NewsCard'

function NewsCardList({ isOpen, cards, isLoggedIn, keyword, savedCards, onDeleteCard, isRegistrationPopupOpen }) {
    const [articles, setArticles] = React.useState(cards)
    const [showMoreButton, setShowMoreButton] = React.useState(false)
    const [cardsToRender, setCardsToRender] = React.useState(3)

    React.useEffect(() => {
        setArticles(cards.slice(0, 3))
        if (cards.length <= 3) {
            setShowMoreButton(false)
        } else {
            setShowMoreButton(true)
        }
    },[isOpen, cards])

    function handleClick() {
        setArticles(cards.slice(0, articles.length + 3))
        setCardsToRender(cardsToRender + 3)
        if (cardsToRender >= cards.length) {
            setShowMoreButton(false)
        }
    }

    return (
        <section className={ `news-card-list ${ isOpen && 'news-card-list_opened' }` }>
            <h2 className="news-card-list__title">Результаты поиска</h2>
            <ul className="news-card-list__container">
                {articles.map((article,key) =>
                    <NewsCard
                        article={ article }
                        key={ key }
                        isLoggedIn={ isLoggedIn }
                        keyword={ keyword }
                        savedCards={ savedCards }
                        onDeleteCard={ onDeleteCard }
                        isSavedNewsPage={ false }
                        isRegistrationPopupOpen={ isRegistrationPopupOpen }
                    />
                )}
            </ul>
            <button
                className={ `${ showMoreButton 
                    ? 'news-card-list__button' 
                    : 'news-card-list__button_hidden'}` }
                onClick={ handleClick }
            >Показать ещё</button>
        </section>
    )
}

export default NewsCardList
