import React from 'react';
import './RepoList.scss';

import ListItem from '../ListItem/ListItem';


export default class RepoList extends React.Component {

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

    handleRepContents = (contents) => {
        let list = [];
        for (let key in contents) {
            list.push({name: contents[key].name, isdir: contents[key].isdir})
        }
        return (
            list.map((item, index) => <ListItem key={index} data={item.name} />)
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