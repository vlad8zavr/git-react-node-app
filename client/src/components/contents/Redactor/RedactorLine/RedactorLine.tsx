import React from 'react';

interface RedactorLineProps {
    data: string;
    number: number;
}

export default function RedactorLine(props: RedactorLineProps) {
    return (
        <div className="redactor__line">
            <div className="redactor__line-order">
                <div className="redactor__line-order-num">{props.number}</div>
            </div>
            <pre>
                <div className="redactor__line-text">{props.data}</div>
            </pre>
        </div>
    )
}