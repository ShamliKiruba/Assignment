import React from 'react';
import List from '../../resuable-components/components/list';
import '../stylesheet/bookmarks.scss';
import { changeRoute } from '../../utils/global/helper';

const Bookmarks = (props) => {
    const data = {
        title: 'Bookmarks',
        description: '',
        item: JSON.parse(sessionStorage.getItem('bookmarks')),
    };
    debugger;

    const openStory = (index) => {
        changeRoute(props.history, `feed/${data.item[index].feed}/story/${data.item[index].id}`);
    }
    
    return (
        <div className="bookmark">
            {(data.item !== null && data.item.length !== 0) ? (
                <List
                    data={data}
                    handleItemClick={openStory}
                />
            ) : (<h3 className="no_bookmarks">No bookmarks added!</h3>)}
        </div>
    )
};

export default Bookmarks;