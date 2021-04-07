import PopupWithForm from '../PopupWithForm/PopupWithForm'
import React from 'react'
import './SignupSuccessPopup.css'

function SignupSuccessPopup({ isOpen, onClose, onLogin }) {
    return (
        <PopupWithForm
            name="success"
            title="Пользователь успешно зарегистрирован!"
            isOpen={ isOpen }
            onClose={ onClose }
            // onSubmit={ handleSubmit }
        >
            <>
                <a className="popup__link_login" href="*" onClick={ onLogin }>Войти</a>
            </>
        </PopupWithForm>
    )
}

export default SignupSuccessPopup
