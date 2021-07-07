import React from 'react';

import RedactorLine from '../RedactorLine/RedactorLine';

interface RedactorBodyProps {
    contents: string;
}

export default class RedactorBody extends React.Component<RedactorBodyProps> {
    
    handleFileContent(contents: string) {
        let list: Array<string> = contents.split('\n');
        return (
            list.map((item, index) => <RedactorLine key={index+1} data={item} number={index+1} />)
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