
import React from 'react';
import './Footer.scss';

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer__side">
                <div className="footer__address">Trade secrets of Yandex LLC. 16, Lev Tolstoy Str., Moscow, Russia, 119021</div>
            </div>
            <div className="footer__side footer__side_align-items_right">
                <div className="footer__ui">UI: 0.1.15</div>
                <div className="footer__license">© 2007-2019 <a className="footer__href" href="https://yandex.ru">Yandex</a></div>
            </div>
        </div>
    );
}