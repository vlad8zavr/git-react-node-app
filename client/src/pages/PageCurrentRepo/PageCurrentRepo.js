
import React from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Main from '../../components/Main/Main';

export default class PageCurrentRepo extends React.Component {

    state = {
        response: '',
        path: '',
        post: '',
        responseToPost: ''
    }

    componentDidMount() {
        this.callApi()
          .then(res => this.setState({ path: res.path, response: res.data }))
          .catch(err => console.log(err))
    }

    callApi = async () => {
        // don't get how this works but this is a call for /api/repos
        const response = await fetch(`./${this.props.match.params.repositoryId}`)
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message)
    
        console.log('body', body)
        //console.log(JSON.stringify(body));
        return body
      }

    render() {
        console.log('[PageCurrentRepo]');
        console.log(this.props);
        return (
            <>
            <Header />
            <Main contents={this.state.response} />
            <Footer />
        </>
        )
    }
}