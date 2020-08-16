import React, { Component } from 'react';
import '../stylesheet/home.scss';
import Tabs from './tabs'
import List from '../../resuable-components/components/list';
import { getData } from '../../utils/global/service';
import { changeRoute } from '../../utils/global/helper';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {},
            currentFeed: 'backchannel'
        };
        this.getFeed = this.getFeed.bind(this);
        this.openStory = this.openStory.bind(this);
    }

    componentDidMount() {
        this.getFeed();
    }

    getFeed(feed = 'backchannel') {
        getData(feed).then(list => {
            this.setState({
                list,
                currentFeed: feed,
            });
        });
    }

    openStory(index) {
        changeRoute(this.props.history, `feed/${this.state.currentFeed}/story/${index}`);
    }

    render() {
        return (
            <div className="home">
                <Tabs 
                    {...this.state}
                    getFeed={this.getFeed}
                />
                {
                    (Object.keys(this.state.list).length) > 0 ? (
                        <List 
                            data={this.state.list}
                            handleItemClick={this.openStory}
                        />
                    ) : ''
                }
            </div>
        );
    }
}

export default Home;