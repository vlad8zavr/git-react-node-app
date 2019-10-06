
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

        if (this.state.currentUrl !== this.props.location.pathname) {
            this.setState({ currentUrl: this.props.location.pathname })

            this.callApi()
            .then(res => this.setState({ response: res.data }))
            .catch(err => console.log(err))

        }
    }

    componentDidMount() {
        if (this.state.currentUrl !== this.props.location.pathname) {
            this.setState({ currentUrl: this.props.location.pathname })

            this.callApi()
                .then(res => this.setState({ response: res.data }))
                .catch(err => console.log(err))
        }
    }

    callApi = async () => {
        const response = await fetch(`${this.props.location.pathname}`)
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message)

        return body;
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