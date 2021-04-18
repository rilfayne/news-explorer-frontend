import React from 'react'
import './SavedNews.css'
import NewsCard from '../NewsCard/NewsCard'

function SavedNews({ isOpen, savedCards, isLoggedIn, keyword, onDeleteCard }) {
    return (
        <section className={ `news-card-list ${ isOpen && 'news-card-list_opened' }` }>
            <ul className="news-card-list__container">
                {savedCards.map((article, key) =>
                    <NewsCard
                        article={ article }
                        key={ key }
                        isLoggedIn={ isLoggedIn }
                        keyword={ keyword }
                        savedCards={ savedCards }
                        onDeleteCard={ onDeleteCard }
                        isSavedNewsPage={ true }
                    />
                )}
            </ul>
        </section>
    )
}

export default SavedNews
