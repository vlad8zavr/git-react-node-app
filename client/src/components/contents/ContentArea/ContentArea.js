
import React from 'react';
import './ContentArea.scss';

// node + react
// https://ru.stackoverflow.com/questions/728238/node-js-Передача-данных-на-клиент
// https://medium.com/@maison.moa/create-a-simple-weather-app-using-node-js-express-and-react-54105094647a

/**

{"data":["js-canvas-3d-cube","linter-to-design-system","node-task","README.md","README.txt","rep.ad"]}
 
*/

function ContentAreaHead() {
    return (
        <div className="content-area__head">
            <div className="content-area__name">Name</div>
            <div className="content-area__commit">Last commit</div>
            <div className="content-area__message">Commit message</div>
            <div className="content-area__committer">Committer</div>
            <div className="content-area__date">Updated</div>
        </div>
    );
}


const ContentAreaItem = ({data}) => {
    console.log('[ContentAreaItem]');
    console.log('data', data);

    return (
        <div className="content-area__item">
            <div className="content-area__name">
                <div className="content-area__icon content-area__icon_dir">
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.875 1.5H6.375L4.875 0H1.125C0.492188 0 0 0.515625 0 1.125V7.875C0 8.50781 0.492188 9 1.125 9H10.875C11.4844 9 12 8.50781 12 7.875V2.625C12 2.01562 11.4844 1.5 10.875 1.5Z" fill="black"/>
                    </svg>
                </div>
                <div className="content-area__text">{data}</div>
            </div>
            <div className="content-area__commit content-area__commit_blue">d53dsv</div>
            <div className="content-area__message">[vcs] move http to arc</div>
            <div className="content-area__committer author_first-letter_red">noxoomo</div>
            <div className="content-area__date">4 s ago</div>
        </div>
    )
}

export default class ContentArea extends React.Component {

    state = {
        data: [
            "js-canvas-3d-cube", 
            "linter-to-design-system", 
            "node-task", 
            "README.md", 
            "README.txt", 
            "rep.ad"
        ]
    }

    render() {
        return (
            <div className="content-area">
                <ContentAreaHead />
                {this.state.data.map((item, index) => <ContentAreaItem key={index} data={item} />)}
            </div>
        );
    }
    
}