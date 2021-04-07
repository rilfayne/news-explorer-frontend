import PopupWithForm from '../PopupWithForm/PopupWithForm'
import React from 'react'

function LoginPopup({ isOpen, onClose, onRegistration }) {
    return (
        <PopupWithForm
            name="login"
            title="Вход"
            isOpen={ isOpen }
            onClose={ onClose }
            // onSubmit={ handleSubmit }
            >
            <>
                <label className="popup__form-field">Email
                    <input
                        // onChange={ handleInputChange }
                        // value={ link }
                        className="popup__input"
                        type="email"
                        name="email"
                        placeholder="Введите почту"
                    />
                    {/*{ dirty && errors.link.required && <span className="popup__input-error">Заполните это поле</span> }*/}
                    {/*{ errors.link.isLink && <span className="popup__input-error">Неправильный формат email</span> }*/}
                </label>
                <label className="popup__form-field">Пароль
                    <input
                        // onChange={ handleInputChange }
                        // value={ link }
                        className="popup__input"
                        type="password"
                        name="password"
                        placeholder="Введите пароль"
                    />
                    {/*{ dirty && errors.link.required && <span className="popup__input-error">Заполните это поле</span> }*/}
                    {/*{ errors.link.isLink && <span className="popup__input-error">Неправильный формат email</span> }*/}
                </label>
                <button className="popup__button popup__button_type_login" type="submit" /*disabled={ isSubmitDisabled }*/>
                    Войти
                </button>
                <p className="popup__subtitle">или
                    <a className="popup__link" href="*" onClick={ onRegistration }>Зарегистрироваться</a>
                </p>
            </>
        </PopupWithForm>
    )
}

export default LoginPopup
