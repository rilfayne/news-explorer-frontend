import React from 'react'
import './SearchForm.css'

function SearchForm() {
    return (
        <form className="search__form">
            <input className="search__input" placeholder="Введите тему новости" type="text" required />
            <button className="search__button" type="submit">Искать</button>
        </form>
    )
}

export default SearchForm
