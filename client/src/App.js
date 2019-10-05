import React from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.scss';


import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';

class PageStart extends React.Component {

  state = {
    response: '',
    post: '',
    responseToPost: ''
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.data }))
      .catch(err => console.log(err))
  }

  callApi = async () => {
    // don't get how this works but this is a call for /api/repos
    const response = await fetch('./repos')
    const body = await response.json()
    if (response.status !== 200) throw Error(body.message)

    console.log('body', body)
    console.log(JSON.stringify(body));
    return body
  }

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('./api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post })
    })
    const body = await response.text();

    this.setState({ responseToPost: body })
  }

  renderNames = () => {
    this.state.response.map(item => <p>{ item.name }</p>)
  }
  
  render() {
    return (
      <>
          <Header />
          <Main contents={this.state.response} />
          <Footer />
      </>
    )
  }
}

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
            <Route path="/api/repos/:repositoryId" component={Zaglushka} />
            <Route path="/api/repos/:repositoryId/tree/:commitHash?/:path([^/]*)?" component={Zaglushka} />
            <Route path="/api/repos/:repositoryId/blob/:commitHash/:pathToFile([^/]*)" component={Zaglushka} />
            <Redirect to={"/api/repos"} />
        </Switch>
      </>
    );
  }
 
}

export default App;
