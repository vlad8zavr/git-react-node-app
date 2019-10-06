import React from 'react';

import RedactorLine from '../RedactorLine/RedactorLine';

export default class RedactorBody extends React.Component {
    
    handleFileContent(contents) {
        let list = contents.split('\n');
        return (
            list.map((item, index) => <RedactorLine key={index} data={item} number={index} />)
        )
    }

    render() {
        return (
            <div className="redactor__body">
                { this.handleFileContent(this.props.contents) }
            </div>
        )
    }
}