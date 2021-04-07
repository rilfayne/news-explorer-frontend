import PopupWithForm from '../PopupWithForm/PopupWithForm'
import React from 'react'

function RegistrationPopup({ isOpen, onClose, onLogin }) {
    return (
        <PopupWithForm
            name="registration"
            title="Регистрация"
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
                <label className="popup__form-field">Имя
                    <input
                        // onChange={ handleInputChange }
                        // value={ link }
                        className="popup__input"
                        type="text"
                        name="name"
                        placeholder="Введите своё имя"
                    />
                    {/*{ dirty && errors.link.required && <span className="popup__input-error">Заполните это поле</span> }*/}
                    {/*{ errors.link.isLink && <span className="popup__input-error">Неправильный формат email</span> }*/}
                </label>
                <button className="popup__button popup__button_type_registration" type="submit" /*disabled={ isSubmitDisabled }*/>
                    Зарегистрироваться
                </button>
                <p className="popup__subtitle">или
                    <a className="popup__link" href="*" onClick={ onLogin }>Войти</a>
                </p>
            </>
        </PopupWithForm>
    )
}

export default RegistrationPopup
