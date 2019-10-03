import React from 'react';
import logo from './logo.svg';
import './App.css';


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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        {/* NEW STARTS HERE */}
        { console.log('render', this.state.response) }
        <Contents contents={this.state.response} />
        {/* <p>{ this.state.response }</p> */}
        {/*
        <form onSubmit={ this.handleSubmit }>
          <p><strong>Post to Server:</strong></p>
          <input 
            type="text" 
            value={ this.state.post } 
            onChange={ e => this.setState({ post: e.target.value }) }
          />
          <button type="submit">Submit</button>
        </form>
        <p>{ this.state.responseToPost }</p>
        */}
        {/* NEW ENDS HERE */}
      </div>
    );
  }
 
}

export default App;
