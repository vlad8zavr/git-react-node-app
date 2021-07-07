
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './CurrentPath.scss';

interface Location {
    pathname: string;
}

interface Match {
    path: string;
}

interface CurrentPathItemProps {
    line: string;
    path: string;
    index: number;
}

interface PathLineProps {
    path: string;
    match: string;
}

interface CurrentPathProps {
    location: Location;
    match: Match;
}

function CurrentPathItem(props: CurrentPathItemProps) {

    let modpath: Array<string>;
    let thispath: string;

    if (props.index === 0) thispath = '/api/repos';
    else if (props.index === 1) thispath = `/api/repos/${props.line}`;
    else if (props.index > 1) {

        modpath = props.path.split('/api/repos/')[1].split('/');
        if (props.index + 2 < modpath.length) modpath[1] = 'tree';
        if (props.index + 2 < modpath.length) {
            for (let i = 0, length: number = modpath.length - props.index - 2; i < length; i++) modpath.pop();
        }

        thispath = `/api/repos/${modpath.join('/')}`;
    }
    else thispath = `/api/repos`;

    return (
        <Link className="Nav__item Current-path-Nav" to={thispath}>
            <span className="current-path__item" data-path={thispath}>
                {props.line}
            </span>
        </Link>
        
    )
}

function PathLine(props: PathLineProps): JSX.Element {

    if (props.path === '/api/repos') {
        return ( 
            <CurrentPathItem key={0} line={props.path} path={props.path} index={0} /> 
        )
    }
    else {
        let pathArray: Array<string> = props.path.split('/api/repos/')[1].split('/');

        if (pathArray.length === 1) {
            return (
                <>
                    <CurrentPathItem key={0} line="/api/repos" path="/api/repos" index={0} />
                    <CurrentPathItem key={1} line={pathArray[0]} path={props.path} index={1} />
                </>
            )
        }
        else if (pathArray.length > 1) {
            let moddedPathArray = pathArray.filter((item, index) => index !== 1);
            moddedPathArray = moddedPathArray.filter((item, index) => index !== 1);

            return (
                <>
                    <CurrentPathItem key={0} line="/api/repos" path="/api/repos" index={0} />
                    { moddedPathArray.map((item, index) => <CurrentPathItem key={index+1} line={item} path={props.path} index={index+1} />) }
                </>
            )
        }
        else {
            return ( 
                <CurrentPathItem key={0} line={props.path} path={props.path} index={0} /> 
            )
        }
    }
}

function CurrentPath(props: CurrentPathProps) {
    return (
        <div className="current-path">
            <div className="current-path__content">
                <PathLine path={props.location.pathname} match={props.match.path} />
            </div>
        </div>
    );
}

export default withRouter(CurrentPath)