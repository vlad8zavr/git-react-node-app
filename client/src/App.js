import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.scss';

import PageStart from './pages/PageStart/PageStart';
import PageCurrentRepo from './pages/PageCurrentRepo/PageCurrentRepo';

const Zaglushka = () => {
  return (
    <h1>Zaglushka</h1>
  )
}

class App extends React.Component {

  render() {
    return (
      <>
        <Switch>
            <Route path="/api/repos" exact component={PageStart} />
            <Route path="/api/repos/:repositoryId" exact component={PageCurrentRepo} />
            <Route path="/api/repos/:repositoryId/tree/:commitHash?/:path([^/]*)?" component={PageCurrentRepo} />
            <Route path="/api/repos/:repositoryId/blob/:commitHash/:pathToFile([^/]*)" component={Zaglushka} />
            <Redirect to={"/api/repos"} />
        </Switch>
      </>
    );
  }
 
}

export default App;
