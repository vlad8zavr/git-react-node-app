import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './Redactor.scss';


import RedactorHead from './RedactorHead/RedactorHead';
import RedactorBody from './RedactorBody/RedactorBody';

interface Location {
    pathname: string;
}

interface RedactorProps {
    location: Location;
    contents: string;
}

// These props are provided by the router
interface PathProps {
    
}

class Redactor extends React.Component<RedactorProps & RouteComponentProps<PathProps>> {

    countFileBytes(data: number) {
        return 100;
    }

    render() {
        let filename = this.props.location.pathname.split('/').pop();
        return (
            <div className="redactor">
                <RedactorHead name={filename} />
                <RedactorBody contents={this.props.contents} />
            </div>
        )
    }
}

export default withRouter(Redactor);