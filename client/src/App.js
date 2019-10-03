import React from 'react';
import logo from './logo.svg';
import './App.scss';


import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';


function Contents({ contents }) {

  let list = [];
  for (let key in contents) {
    list.push({name: contents[key].name, isdir: contents[key].isdir})
  }
  const verstka = list.map(item => <p>{item.name} : ${item.isdir.toString()}</p>)
  console.log('verstka', verstka)
  return verstka
}

class App extends React.Component {

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
    const response = await fetch('./api/repos')
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
        <Main />
        <Contents contents={this.state.response} />
        <Footer />
      </>
    );
  }
 
}

export default App;
