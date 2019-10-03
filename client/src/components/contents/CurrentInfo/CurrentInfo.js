
import React from 'react';
import './CurrentInfo.scss';

export default function CurrentInfo() {
    return (
        <div className="current-info">
            <div className="current-info__heading">
                <div className="current-info__name">arcadia</div>
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