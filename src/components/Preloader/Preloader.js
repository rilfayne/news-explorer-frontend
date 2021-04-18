import React from 'react'
import './Preloader.css'

function Preloader({ isPreloaderOpen }) {
    return (
        <div className={ isPreloaderOpen ? 'preloader' : 'preloader_hidden'}>
            <i className="preloader__circle" />
            <p className="preloader__text">Идет поиск новостей...</p>
        </div>
    )
}

export default Preloader
