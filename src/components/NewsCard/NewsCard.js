import React from 'react'
import './NewsCard.css'
import cardImage from '../../images/image_08.png'
import { Route, Switch } from 'react-router-dom'

function NewsCard() {
    return (
        <li className="card">
            <img className="card__image" src={ cardImage } alt="Новость"/>
            <Switch>
                <Route path="/" exact>
                    <button className="card__button card__save" type="button" aria-label="Сохранить">
                        <span className="card__tooltip">Войдите, чтобы сохранять статьи</span>
                    </button>
                </Route>
                <Route path="/saved-news">
                    <span className="card__theme">Природа</span>
                    <button className="card__button card__delete" type="button" aria-label="Удалить">
                        <span className="card__tooltip card__tooltip_saved-news">Убрать из сохранённых</span>
                    </button>
                </Route>
            </Switch>
            <div className="card__description">
                <h4 className="card__date">2 августа, 2019</h4>
                <h3 className="card__title">Национальное достояние - парки</h3>
                <p className="card__subtitle">В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.</p>
                <h5 className="card__author">Лента.ру</h5>
            </div>
        </li>
    )
}

export default NewsCard
