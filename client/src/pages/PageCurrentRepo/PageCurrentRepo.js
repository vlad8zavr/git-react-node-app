
import React from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Main from '../../components/Main/Main';

export default class PageCurrentRepo extends React.Component {

    state = {
        response: '',
        currentUrl: ''
    }

    componentDidUpdate() {
        console.log('[componentDidUpdate]');
        // console.log(this.props.location.pathname);
        // console.log('---------------------------------');

        if (this.state.currentUrl !== this.props.location.pathname) {
            console.log('about to change state');
            this.setState({ currentUrl: this.props.location.pathname })

            this.callApi()
            .then(res => this.setState({ response: res.data }))
            .catch(err => console.log(err))

        }
    }

    componentDidMount() {
        console.log('[componentDIdMount]');
        // console.log(this.props.location.pathname);
        
        if (this.state.currentUrl !== this.props.location.pathname) {
            console.log('about to change state');
            this.setState({ currentUrl: this.props.location.pathname })

            this.callApi()
                .then(res => this.setState({ response: res.data }))
                .catch(err => console.log(err))
        }
        console.log('---------------------------------');

    }

    callApi = async () => {
        // don't get how this works but this is a call for /api/repos
        const response = await fetch(`${this.props.location.pathname}`)
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message)
    
        console.log('body', body)
        //console.log(JSON.stringify(body));
        return body
    }

    render() {
        console.log('[PageCurrentRepo]');
        // console.log(this.props);
        // console.log(this.props.location.pathname);
        return (
            <>
            <Header />
            <Main contents={this.state.response} />
            <Footer />
        </>
        )
    }
}