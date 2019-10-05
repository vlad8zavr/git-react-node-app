import React from 'react';
import { withRouter } from 'react-router-dom';
import './Redactor.scss';

import RedactorHead from './RedactorHead/RedactorHead';
import RedactorBody from './RedactorBody/RedactorBody';

class Redactor extends React.Component {

    countFileBytes(data) {
        
    }

    render() {
        console.log('[REDACTOR]');
        let filename = this.props.location.pathname.split('/').pop();
        return (
            <div className="redactor">
                {/* <div>{ this.props.contents }</div> */}
                <RedactorHead name={filename} />
                <RedactorBody contents={this.props.contents} />
            </div>
        )
    }
}

export default withRouter(Redactor);