import React from 'react'
import './NotFound.css'

function NotFound({ isNotFoundOpen }) {
    return (
        <div className={ isNotFoundOpen ? 'not-found' : 'not-found_hidden'}>
            <i className="not-found__icon" />
            <h2 className="not-found__title">Ничего не найдено</h2>
            <p className="not-found__text">К сожалению, по вашему запросу ничего не найдено.</p>
        </div>
    )
}

export default NotFound
