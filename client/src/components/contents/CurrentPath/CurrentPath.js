
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './CurrentPath.scss';


function CurrentPathItem({ line, path, index }) {

    let modpath;
    let thispath;

    if (index === 0) thispath = '/api/repos';
    else if (index === 1) thispath = `/api/repos/${line}`;
    else if (index > 1) {

        modpath = path.split('/api/repos/')[1].split('/');
        if (index + 2 < modpath.length) modpath[1] = 'tree';
        if (index + 2 < modpath.length) {
            for (let i = 0, length = modpath.length - index - 2; i < length; i++) modpath.pop();
        }

        thispath = `/api/repos/${modpath.join('/')}`;
    }

    return (
        <Link className="Nav__item Current-path-Nav" to={thispath}>
            <span className="current-path__item" data-path={thispath}>
                {line}
            </span>
        </Link>
        
    )
}

function PathLine({ path, match }) {

    if (path === '/api/repos') {
        return ( 
            <CurrentPathItem key={0} line={path} path={path} index={0} /> 
        )
    }
    else {
        let pathArray = path.split('/api/repos/')[1].split('/');

        if (pathArray.length === 1) {
            return (
                <>
                    <CurrentPathItem key={0} line="/api/repos" path="/api/repos" index={0} />
                    <CurrentPathItem key={1} line={pathArray[0]} path={path} index={1} />
                </>
            )
        }
        else if (pathArray.length > 1) {
            let moddedPathArray = pathArray.filter((item, index) => index !== 1);
            moddedPathArray = moddedPathArray.filter((item, index) => index !== 1);

            return (
                <>
                    <CurrentPathItem key={0} line="/api/repos" path="/api/repos" index={0} />
                    { moddedPathArray.map((item, index) => <CurrentPathItem key={index+1} line={item} path={path} index={index+1} />) }
                </>
            )
        }
    }
}

function CurrentPath(props) {
    return (
        <div className="current-path">
            <div className="current-path__content">
                <PathLine path={props.location.pathname} match={props.match.path} />
            </div>
        </div>
    );
}

export default withRouter(CurrentPath)