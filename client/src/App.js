import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.scss';

import PageStart from './pages/PageStart/PageStart.tsx';
import PageCurrentRepo from './pages/PageCurrentRepo/PageCurrentRepo.tsx';
import PageFile from './pages/PageFile/PageFile.tsx';


class App extends React.Component {

  render() {
    return (
      <>
        <Switch>
            <Route path="/api/repos" exact component={PageStart} />
            <Route path="/api/repos/:repositoryId" exact component={PageCurrentRepo} />
            <Route path="/api/repos/:repositoryId/tree/:commitHash?/:path([^/]*)?" component={PageCurrentRepo} />
            <Route path="/api/repos/:repositoryId/blob/:commitHash/:pathToFile([^/]*)" component={PageFile} />
            <Redirect to={"/api/repos"} />
        </Switch>
      </>
    );
  }
 
}

export default App;
