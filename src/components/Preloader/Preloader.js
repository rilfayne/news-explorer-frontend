import React from 'react'
import './Preloader.css'

function Preloader() {
    return (
        <div className="preloader">
            <i className="preloader__circle" />
            <p className="preloader__text">Идет поиск новостей...</p>
        </div>
    );
}

export default Preloader
