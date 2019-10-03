
import React from 'react';
import './Main.scss';

import CurrentPath from '../contents/CurrentPath/CurrentPath';
import CurrentInfo from '../contents/CurrentInfo/CurrentInfo';

import MainMenu from '../contents/MainMenu/MainMenu';

import ContentArea from '../contents/ContentArea/ContentArea';

export default function Main() {
    return (
        <main className="main">
            <CurrentPath />
            <CurrentInfo />
            <MainMenu />
            <ContentArea />
        </main>
    );
}