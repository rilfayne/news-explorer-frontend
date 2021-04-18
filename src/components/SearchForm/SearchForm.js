import React from 'react'
import './SearchForm.css'

function SearchForm({ onSearch, errorInputSearch }) {
    const keyword = React.useRef()

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault()

        // Передаём значения управляемых компонентов во внешний обработчик
        onSearch(keyword.current.value)
    }

    return (
        <form className="search__form" onSubmit={ handleSubmit }>
            <input className="search__input" ref={ keyword } placeholder="Введите тему новости" type="text"/>
            <span className={ errorInputSearch ? 'search__input-error' : 'search__input-error_hidden' }>Нужно ввести ключевое слово</span>
            <button className="search__button" type="submit">Искать</button>
        </form>
    )
}

export default SearchForm
