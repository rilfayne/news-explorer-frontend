import React from 'react'
import './About.css'
import author from '../../images/author.jpg'

function About() {
    return (
        <div className="about">
            <img className="about__image" src={ author } alt="Автор" />
            <div className="about__container">
                <h2 className="about__title">Об авторе</h2>
                <p className="about__subtitle">Привет! Меня зовут Оля, я&nbsp;начинающий фронтенд разработчик. Сейчас я&nbsp;заканчиваю курс по&nbsp;web-разработке от&nbsp;Яндекс.Практикума, и&nbsp;это&nbsp;&mdash; моя выпускная работа. </p>
            </div>
        </div>
    )
}

export default About
