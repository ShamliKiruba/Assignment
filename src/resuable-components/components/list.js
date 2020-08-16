import React from 'react';
import { getImage, getDate } from '../../utils/global/helper';
import '../stylesheet/list.scss';

const List = (props) => {
    const { data } = props;

    return (
        <div className="list">
            <h1 className="title">{data.title}</h1>
            <div className="desc">{data.description}</div>
            <div className="list_content">
                {data.item.map((obj, index) => {
                    return (
                        <div className="item" key={obj.updated} onClick={() => props.handleItemClick(index)}>
                            <div className="row">
                                {/* <label>Based on your Interest</label> */}
                                <h2>{obj.title}</h2>
                                <div>
                                    <div className="brief name">{obj.creator} in {obj.category[0]}</div>
                                    <div className="brief time">{getDate(obj.updated)}</div>
                                </div>
                            </div>
                            <div className="preview_img">
                                <img src={getImage(obj.encoded)} alt="img"/>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    );
};

export default List;