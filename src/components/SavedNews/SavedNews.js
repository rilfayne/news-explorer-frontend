import React from 'react'
import './SavedNews.css'
import NewsCard from '../NewsCard/NewsCard'

function SavedNews({ isOpen }) {
    return (
        <section className={ `news-card-list ${ isOpen && 'news-card-list_opened' }` }>
            <ul className="news-card-list__container">
                <NewsCard/>
                <NewsCard/>
                <NewsCard/>
                <NewsCard/>
                <NewsCard/>
            </ul>
        </section>
    )
}

export default SavedNews
