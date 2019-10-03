
import React from 'react';
import './MainMenu.scss';

export default function MainMenu() {
    return (
        <div className="main-menu">
            <div className="main-menu__item main-menu__item_active">files</div>
            <div className="main-menu__item">branches</div>
        </div>
    );
}