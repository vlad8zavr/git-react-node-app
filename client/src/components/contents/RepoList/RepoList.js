import React from 'react';
import './RepoList.scss';

import ListItem from '../ListItem/ListItem';


export default class RepoList extends React.Component {

    handleRepContents = (contents) => {
        // console.log('[RepoList]');
        // //console.log(contents);
        // console.log('----------------------');
        let list = [];
        for (let key in contents) {
            list.push({name: contents[key].name, isdir: contents[key].isdir})
        }
        return (
            list.map((item, index) => <ListItem key={index} data={item.name} isdir={item.isdir} />)
        )
    }

    render() {
        return (
            <div className="repo-list">
                { this.handleRepContents(this.props.contents) }
            </div>
        );
    }
}