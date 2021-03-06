import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './ListItem.scss';

const DirSign = () => {
    return (
        <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.125 2.5H10.625L8.125 0H1.875C0.820312 0 0 0.859375 0 1.875V13.125C0 14.1797 0.820312 15 1.875 15H18.125C19.1406 15 20 14.1797 20 13.125V4.375C20 3.35938 19.1406 2.5 18.125 2.5Z" fill="black"/>
        </svg>
    )
}

const FileSign = () => {
    return (
        <svg width="15" height="21" viewBox="0 0 15 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5.26562C15 5.07031 14.8438 4.75781 14.6875 4.60156L10.8984 0.8125C10.7031 0.617188 10.4688 0.5 10.2344 0.5H10V5.5H15V5.26562ZM9.6875 6.75C9.14062 6.75 8.75 6.35938 8.75 5.8125V0.5H0.9375C0.390625 0.5 0 0.929688 0 1.4375V19.5625C0 20.1094 0.390625 20.5 0.9375 20.5H14.0625C14.5703 20.5 15 20.1094 15 19.5625V6.75H9.6875ZM4.80469 16.1641C4.76562 16.2031 4.6875 16.2422 4.64844 16.2422C4.60938 16.2422 4.53125 16.2031 4.49219 16.1641L1.95312 13.7812C1.91406 13.7812 1.91406 13.7031 1.91406 13.625C1.91406 13.5859 1.91406 13.5078 1.95312 13.5078L4.49219 11.125C4.53125 11.0859 4.60938 11.0469 4.64844 11.0469C4.6875 11.0469 4.76562 11.0859 4.80469 11.125L5.54688 11.9453C5.58594 11.9844 5.625 12.0234 5.625 12.1016C5.625 12.1406 5.58594 12.2188 5.54688 12.2578L3.94531 13.625L5.54688 15.0312C5.58594 15.0703 5.625 15.1484 5.625 15.1875C5.625 15.2656 5.58594 15.3047 5.54688 15.3438L4.80469 16.1641ZM6.79688 18.1172L5.74219 17.8438C5.625 17.8047 5.58594 17.7266 5.58594 17.6094V17.5703L7.96875 9.28906C8.00781 9.21094 8.08594 9.13281 8.16406 9.13281C8.20312 9.13281 8.24219 9.13281 8.24219 9.17188L9.29688 9.44531C9.41406 9.48438 9.45312 9.5625 9.45312 9.67969V9.71875L7.07031 18C7.03125 18.0781 6.95312 18.1562 6.875 18.1562C6.83594 18.1562 6.79688 18.1562 6.79688 18.1172ZM13.0859 13.7812L10.5469 16.1641C10.5078 16.2031 10.4297 16.2422 10.3906 16.2422C10.3516 16.2422 10.2734 16.2031 10.2344 16.1641L9.49219 15.3438C9.45312 15.3047 9.41406 15.2656 9.41406 15.1875C9.41406 15.1484 9.45312 15.0703 9.49219 15.0312L11.0938 13.625L9.49219 12.2578C9.45312 12.2188 9.41406 12.1406 9.41406 12.1016C9.41406 12.0234 9.45312 11.9844 9.49219 11.9453L10.2344 11.125C10.2734 11.0859 10.3516 11.0469 10.3906 11.0469C10.4297 11.0469 10.5078 11.0859 10.5469 11.125L13.0859 13.5078C13.125 13.5078 13.1641 13.5859 13.1641 13.625C13.1641 13.7031 13.125 13.7812 13.0859 13.7812Z" fill="black"/>
        </svg>
    )
}

function ListItem(props) {
    let {data, isdir} = props;
    
    let url;
    if (isdir && props.match.path === '/api/repos') {
        url = `/api/repos/${data}`;
    }
    else if (isdir && props.match.path === '/api/repos/:repositoryId') {
        url = `${props.location.pathname}/tree/master/${data}`;
    }
    else if (isdir && !!(props.match.path.indexOf('/api/repos/:repositoryId/tree/:commitHash?/:path') + 1)) {
        url = `${props.location.pathname}/${data}`;
    }
    else if (!isdir && props.match.path === '/api/repos/:repositoryId') {
        url = `${props.location.pathname}/blob/master/${data}`;
    }
    else if (!isdir && !!(props.match.path.indexOf('/api/repos/:repositoryId/tree/:commitHash?/:path') + 1)) {
        url = `${props.location.pathname.replace("tree", "blob")}/${data}`
    }
    else url = '/api/repos';

    return (
        <Link className="Nav__item" to={url}>
            <div className="repo-list__item list-item">
                <div className="list-item__icon">
                    { (isdir) ? <DirSign /> : <FileSign /> }                    
                </div>
                <div className="list-item__text">{ data }</div>
            </div>
        </Link>
    )
}

export default withRouter(ListItem)