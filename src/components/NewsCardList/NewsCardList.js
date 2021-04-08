import React from 'react'
import './NewsCardList.css'
import NewsCard from '../NewsCard/NewsCard'

function NewsCardList({ isOpen }) {
    return (
        <section className={ `news-card-list ${ isOpen && 'news-card-list_opened' }` }>
            <h2 className="news-card-list__title">Результаты поиска</h2>
            <ul className="news-card-list__container">
                <NewsCard/>
                <NewsCard/>
                <NewsCard/>
            </ul>
            <button className="news-card-list__button">Показать ещё</button>
        </section>
    )
}

export default NewsCardList
