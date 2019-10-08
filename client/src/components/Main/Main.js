
import React from 'react';
import { withRouter } from 'react-router-dom';
import './Main.scss';

import CurrentPath from '../contents/CurrentPath/CurrentPath.tsx';
import CurrentInfo from '../contents/CurrentInfo/CurrentInfo.tsx';
import MainMenu from '../contents/MainMenu/MainMenu';
import RepoList from '../contents/RepoList/RepoList.tsx';
import Redactor from '../contents/Redactor/Redactor';

function Main(props) {
     
    let { contents } = props;
    let isFile = !!(props.match.path.indexOf('/api/repos/:repositoryId/blob/:commitHash/:pathToFile') + 1);

    return (
        
        <main className="main">
            <CurrentPath />
            <CurrentInfo />
            <MainMenu />
            { (isFile)
                ? <Redactor contents={contents} /> 
                : <RepoList contents={contents} />
            }
        </main>
    );
}

export default withRouter(Main);