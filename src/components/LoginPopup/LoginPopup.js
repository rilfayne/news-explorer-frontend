import PopupWithForm from '../PopupWithForm/PopupWithForm'
import React from 'react'
import isEmail from 'validator/es/lib/isEmail'

function LoginPopup({ isOpen, onClose, onRegistration, onSubmit }) {
    const [ formValues, setFormValues ] = React.useState({
        email: "",
        password: ""
    })

    const [dirty, setDirty] = React.useState({
        email: false,
        password: false,
    })

    // Стартовое состояние ошибок
    const [errors, setErrors] = React.useState({
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minLength: true
        }
    })

    // Очистка ошибок
    React.useEffect(() => {
        setDirty({
            email: false,
            password: false
        })
        setErrors({
            email: {
                required: true,
            },
            password: {
                required: true
            }
        })
    }, [isOpen])

    // Условия валидации
    const validators = {
        email: {
            required: (value) => {
                return value === ""
            },
            email: (value) => {
                return isEmail(value) === false && value !== ""
            }
        },
        password: {
            required: (value) => {
                return value === ""
            },
            minLength: (value) => {
                return value.length < 8 && value !== ""
            }
        }
    }

    // Валидация
    React.useEffect(
        function validateInputs() {
            const { email, password } = formValues

            const emailValidationResult = Object.keys(validators.email)
                .map((errorKey) => {
                    const errorResult = validators.email[errorKey](email)

                    return { [errorKey]: errorResult }
                })
                .reduce((acc, el) => ({ ...acc, ...el }), {})

            const passwordValidationResult = Object.keys(validators.password)
                .map((errorKey) => {
                    const errorResult = validators.password[errorKey](password)

                    return { [errorKey]: errorResult }
                })
                .reduce((acc, el) => ({ ...acc, ...el }), {})

            setErrors({
                email: emailValidationResult,
                password: passwordValidationResult,
            })
        },
        //eslint-disable-next-line
        [formValues, setErrors]
    )

    const handleInputChange = React.useCallback(
        (e) => {
            const { name, value } = e.target
            setFormValues((prevState) => ({ ...prevState, [name]: value }))
            setDirty((prevState) => ({...prevState, [name]: true}))
        },
        [setFormValues]
    )

    const handleSubmit = (evt) => {
        evt.preventDefault()
        onSubmit({
            email: formValues.email,
            password: formValues.password,
        })
        formValues.email = ''
        formValues.password = ''
    }

    const { email, password } = formValues
    const isEmailInvalid = Object.values(errors.email).some(Boolean)
    const isPasswordInvalid = Object.values(errors.password).some(Boolean)
    const isSubmitDisabled = isEmailInvalid || isPasswordInvalid

    return (
        <PopupWithForm
            name="login"
            title="Вход"
            isOpen={ isOpen }
            onClose={ onClose }
            onSubmit={ handleSubmit }
            >
            <>
                <label className="popup__form-field">Email
                    <input
                        onChange={ handleInputChange }
                        value={ email }
                        className="popup__input"
                        type="email"
                        name="email"
                        placeholder="Введите почту"
                    />
                    { dirty.email && errors.email.required && <span className="popup__input-error">Заполните это поле</span> }
                    { errors.email.email && <span className="popup__input-error">Неправильный формат email</span> }
                </label>
                <label className="popup__form-field">Пароль
                    <input
                        onChange={ handleInputChange }
                        value={ password }
                        className="popup__input"
                        type="password"
                        name="password"
                        placeholder="Введите пароль"
                    />
                    { dirty.password && errors.password.required && <span className="popup__input-error">Заполните это поле</span> }
                    { errors.password.minLength && <span className="popup__input-error">Символов должно быть минимум 8</span> }
                </label>
                <button className="popup__button popup__button_type_login" type="submit" disabled={ isSubmitDisabled }>
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
