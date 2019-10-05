import React from 'react';

import RedactorLine from '../RedactorLine/RedactorLine';

export default class RedactorBody extends React.Component {
    
    handleFileContent(contents) {
        console.log(typeof contents);
        console.log(contents.split('\n'));

        let list = contents.split('\n');
        console.log('list', list);
        return (
        list.map((item, index) => {
            console.log('index', index);
            console.log('item', item);
            console.log('---------------');
            return <RedactorLine key={index} data={item} number={index} />
        })
        )
    }

    render() {
        return (
            <div class="redactor__body">
                { this.handleFileContent(this.props.contents) }
            </div>
        )
    }
}