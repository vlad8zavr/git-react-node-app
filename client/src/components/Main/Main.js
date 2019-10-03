
import React from 'react';
import './Main.scss';

import CurrentPath from '../contents/CurrentPath/CurrentPath';
import CurrentInfo from '../contents/CurrentInfo/CurrentInfo';

import MainMenu from '../contents/MainMenu/MainMenu';

import ContentArea from '../contents/ContentArea/ContentArea';

import RepoList from '../contents/RepoList/RepoList';

export default function Main() {
    return (
        <main className="main">
            <CurrentPath />
            <CurrentInfo />
            <MainMenu />
            <RepoList />
            {/*<ContentArea />*/}
        </main>
    );
}