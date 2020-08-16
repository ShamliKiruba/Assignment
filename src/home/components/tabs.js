import React from 'react';
import '../stylesheet/home.scss';
import { TABS } from '../../utils/global/constants';

const Tabs = (props) => {
    return (
        <div className="tabs">
            {
                TABS.map(item => {
                    return (
                        <button className={props.currentFeed === item ? 'active' : ''} 
                        onClick={() => props.getFeed(item)}>{item}</button>
                    )
                })
            }
        </div>
    );
}

export default Tabs;