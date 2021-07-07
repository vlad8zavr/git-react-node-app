
import React from 'react';
import { withRouter } from 'react-router-dom';
import './CurrentInfo.scss';

interface Location {
    pathname: string;
}

interface CurrentInfoProps {
    location: Location;
}

function CurrentInfo(props: CurrentInfoProps) {
    let lastName = (props.location.pathname === '/api/repos') 
        ? '/api/repos' 
        : props.location.pathname.split('/').pop();

    return (
        <div className="current-info">
            <div className="current-info__heading">
                <div className="current-info__name">{ lastName }</div>
                <div className="current-info__menu">trunk</div>
            </div>
            <div className="current-info__text">
                Last commit 
                <span className="current-info__commit">c4d248</span>
                <span className="current-info__divider">on</span> 
                <span className="current-info__date">20 Oct 2017, 12:24</span>
                <span className="current-info__divider current-info__divider_right">by</span>  
                <p className="current-info__author author_first-letter_red">robot-srch-releaser</p>
            </div>
        </div>
    );
}

export default withRouter(CurrentInfo);