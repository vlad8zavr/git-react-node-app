
import React from 'react';
import './Main.scss';

import CurrentPath from '../contents/CurrentPath/CurrentPath';
import CurrentInfo from '../contents/CurrentInfo/CurrentInfo';
import MainMenu from '../contents/MainMenu/MainMenu';
import RepoList from '../contents/RepoList/RepoList';

export default function Main({ contents }) {
    console.log('[MAIN]');
    console.log('------------------------');

    return (
        <main className="main">
            <CurrentPath />
            <CurrentInfo />
            <MainMenu />
            <RepoList contents={contents} />
        </main>
    );
}