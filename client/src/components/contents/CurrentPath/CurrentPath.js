
import React from 'react';
import { withRouter } from 'react-router-dom';
import './CurrentPath.scss';

function PreviousPath({ line }) {
    return (
        <>
            <span className="current-path__previous">{line}</span>
            <span className="current-path__divider">/</span>
        </>
    )
}

function PathLine({ path }) {
    console.log('[PathLine]');
    console.log('path', path);
    console.log('---------------------------');

    if (path === '/api/repos') {
        return ( 
            <div className="current-path__text">{ path }</div> 
        )
    }
    else {
        let pathArray = path.split('/api/repos/')[1].split('/');

        console.log('NOT /api/repos');

        if (pathArray.length === 1) {
            return (
                <div className="current-path__text">
                    <PreviousPath line="/api/repos" />
                    { pathArray[0] }
                </div>
            )
        }
        else if (pathArray.length > 1) {
            console.log('pathArray.length > 1', pathArray.length > 1);
            let moddedPathArray = pathArray.filter((item, index) => index !== 1);
            moddedPathArray = moddedPathArray.filter((item, index) => index !== 1);

            console.log('moddedPathArray', moddedPathArray);

            // {/* <div className="current-path__text">Other Path</div> */}

            return (
                <div className="current-path__text">
                    <PreviousPath line="/api/repos" />
                    { moddedPathArray.map((item, index) => {
                        if (index !== (moddedPathArray.length - 1))
                            return <PreviousPath key={index} line={item} />
                      }) 
                    }
                    { moddedPathArray[moddedPathArray.length - 1] }
                </div>
            )
        }
    }
}

function CurrentPath(props) {
    console.log('[CurrentPath]');
    if (props.location.pathname !== '/api/repos') console.log(props.location.pathname.split('/api/repos/')[1].split('/'));

    return (
        <div className="current-path">
            <div className="current-path__content">
                <PathLine path={props.location.pathname} />
            </div>
        </div>
    );
}

export default withRouter(CurrentPath)