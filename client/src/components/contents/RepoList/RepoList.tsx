import React from 'react';
import './RepoList.scss';

import ListItem from '../ListItem/ListItem';

interface Contents {
    name: string;
    isdir: boolean;
}

interface RepoListProps {
    contents: Object;
}

// contents - array like object

export default class RepoList extends React.Component<RepoListProps> {

    handleRepContents = (contents: Object) => {

        // let list = [];
        // for (let key in contents) {
        //     console.log('key', typeof key)
        //     list.push({name: contents[key].name, isdir: contents[key].isdir})
        // }
        let list: Array<Contents> = Array.prototype.slice.call(contents);
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