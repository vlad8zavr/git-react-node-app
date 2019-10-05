
import React from 'react';
import './Header.scss';

import HeaderLogo from './HeaderLogo/HeaderLogo';

export default function Header() {
    return (
        <header className="header">
            <HeaderLogo />
            <div className="header__menu header__menu_collapsed">
                <div className="header__pre-name">Repository</div>
                <div className="header__name">Arc</div>
            </div>
            {/* /.header__menu */}
        </header>
    );
}