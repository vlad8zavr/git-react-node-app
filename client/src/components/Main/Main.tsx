
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './Main.scss';

import CurrentPath from '../contents/CurrentPath/CurrentPath';
import CurrentInfo from '../contents/CurrentInfo/CurrentInfo';
import MainMenu from '../contents/MainMenu/MainMenu';
import RepoList from '../contents/RepoList/RepoList';
import Redactor from '../contents/Redactor/Redactor';

interface Match {
    path: string;
}

type MainProps = RouteComponentProps<Match> &  {
    contents: string | Object;
    match: Match;
}

function Main(props: MainProps) {
     
    let { contents } = props;
    let isFile = !!(props.match.path.indexOf('/api/repos/:repositoryId/blob/:commitHash/:pathToFile') + 1);

    return (
        
        <main className="main">
            <CurrentPath />
            <CurrentInfo />
            <MainMenu />
            { (isFile && typeof contents === 'string')
                ? <Redactor contents={contents} /> 
                : <RepoList contents={contents} />
            }
        </main>
    );
}

export default withRouter(Main);