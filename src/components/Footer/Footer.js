import React from 'react'
import './Footer.css'
import github from '../../images/icon/github.svg'
import facebook from '../../images/icon/fb.svg'


function Footer() {
    return (
        <footer className="footer">
            <p className="footer__copyright">&copy; 2021. Оля Сальникова</p>
            <nav className="footer__links">
                <ul className="footer__list">
                    <li className="footer__list-item">
                        <a className="footer_link" href="*">Главная</a>
                    </li>
                    <li className="footer__list-item">
                        <a className="footer_link" href="https://praktikum.yandex.ru/">Яндекс.Практикум</a>
                    </li>
                    <li className="footer__list-item">
                        <a className="footer__github" href="https://github.com/rilfayne">
                            <img src={ github } alt="Логотип github"/>
                        </a>
                    </li>
                    <li className="footer__list-item">
                        <a className="footer__facebook" href="https://www.facebook.com/rilfayne/">
                            <img src={ facebook } alt="Логотип facebook"/>
                        </a>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}

export default Footer
