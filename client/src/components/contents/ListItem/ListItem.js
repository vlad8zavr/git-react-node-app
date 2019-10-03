import React from 'react';
import './ListItem.scss';

export default function ListItem({data}) {
    console.log('[ListItem]');
    console.log('data', data);
    return (
        <div className="repo-list__item list-item">
            <div className="list-item__icon list-item__icon_dir">
                <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.125 2.5H10.625L8.125 0H1.875C0.820312 0 0 0.859375 0 1.875V13.125C0 14.1797 0.820312 15 1.875 15H18.125C19.1406 15 20 14.1797 20 13.125V4.375C20 3.35938 19.1406 2.5 18.125 2.5Z" fill="black"/>
                </svg>                        
            </div>
            <div className="list-item__text">{ data }</div>
        </div>
    )
}