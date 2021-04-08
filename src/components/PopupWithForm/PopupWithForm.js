import React from 'react'
import './PopupWithForm.css'

function PopupWithForm( { name, title, isOpen, onClose, onSubmit, children }) {

    function handleOverlayClose(e) {
        if (e.target !== e.currentTarget) { return }
        onClose()
    }

    return (
        <section onClick={ handleOverlayClose } className={ `popup popup_${ name } ${ isOpen && 'popup_opened' }` } >
            <div className="popup__container">
                <button className="popup__close transition" type="button" aria-label="Закрыть" onClick={ onClose } />
                <h2 className="popup__title">{ title }</h2>
                <form className="popup__form popup__form_info" name={ name } method="get" action="#" onSubmit={ onSubmit } noValidate>
                    { children }
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm
