import React from 'react';

export default function RedactorLine({ data, number }) {
    console.log('[RedactorLine]');
    console.log(data);
    console.log('-----------------------');
    return (
        <div className="redactor__line">
            <div className="redactor__line-order">
                <div className="redactor__line-order-num">{number}</div>
            </div>
            <pre>
                <div className="redactor__line-text">{data}</div>
            </pre>
        </div>
    )
}