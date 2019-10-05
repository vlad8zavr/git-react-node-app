
import React from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Main from '../../components/Main/Main';


export default class PageStart extends React.Component {

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
        const response = await fetch(`${this.props.location.pathname}`)
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message)
    
        console.log('body', body)
        //console.log(JSON.stringify(body));
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
  