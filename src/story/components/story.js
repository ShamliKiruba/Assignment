import React, { Component } from 'react';
import { filterStory } from '../../utils/global/service';
import { getDate } from '../../utils/global/helper';
import '../stylesheet/story.scss';

class Story extends Component {
    constructor(props) {
        super(props);
        const { feed, id } = this.props.match.params;
        const data = filterStory(feed, Number(id));
        const bookmarkList = JSON.parse(sessionStorage.getItem('bookmarks')) || [];
        this.state = {
            data: data,
            follow: false,
            feed, 
            id,
            bookmarked: this.checkIfBookmarked(bookmarkList, data) >= 0 ? true : false,
        };
        this.toggleFollow = this.toggleFollow.bind(this);
    }

    componentDidMount() {
        const content = document.createElement("div");
        content.setAttribute("id", "content");
        content.innerHTML = this.state.data.encoded;
        content.querySelectorAll('figure')[0].style.display = 'block';
        document.getElementById('story').append(content);
    }

    checkIfBookmarked(bookmarks, data) {
        let alreadyAdded = -1;
        for(let i=0; i< bookmarks.length;i++) {
            if(bookmarks[i].title === data.title) {
                alreadyAdded = i;
            }
        }
        return alreadyAdded;
    }

    addToBookMarks() {
        const bookmarks = JSON.parse(sessionStorage.getItem('bookmarks')) || [];
        const data = this.state.data;
        data.feed = this.state.feed;
        data.id = this.state.id;
        const index = this.checkIfBookmarked(bookmarks, data)
        if(index >= 0) {
            bookmarks.splice(index, 1);
            this.setState({
                bookmarked: false,
            });
        } else {
            bookmarks.push(this.state.data);
            this.setState({
                bookmarked: true,
            });
        }
        sessionStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        return;
    }

    toggleFollow() {
        this.setState({ follow: !this.state.follow });
    }

    render() {
        return (
            <div className="story" id="story">
                <h1 className="title">{this.state.data.title}</h1>
                <div className="detail">   
                    <div className="author_details">
                        <div className="photo">
                            <img src="https://miro.medium.com/fit/c/96/96/1*w12_5tQWwj3V1nS8wOc3Hg.jpeg" alt="Author image"/>
                        </div>
                        <div className="data">
                            <div className="clm_1">
                                <div className="name">{this.state.data.creator}</div>
                                <div className="follow" onClick={this.toggleFollow}>
                                    {this.state.follow ? 'Unfollow' : 'Follow'} 
                                </div>
                            </div>
                            <span className="time">{getDate(this.state.data.updated)}</span>
                        </div>
                    </div>
                    <div className="social_icons">
                        <img src="img/fb.svg"></img>
                        <img src="img/twitter.png"></img>
                        <img src="img/email.png"></img>
                        <span onClick={() => this.addToBookMarks()} title={this.state.bookmarked ? "Remove Bookmark" : "Add Bookmark"}>
                            {!this.state.bookmarked ? (
                                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="bookmark" className="svg-inline--fa fa-bookmark fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M336 0H48C21.49 0 0 21.49 0 48v464l192-112 192 112V48c0-26.51-21.49-48-48-48zm0 428.43l-144-84-144 84V54a6 6 0 0 1 6-6h276c3.314 0 6 2.683 6 5.996V428.43z" alt="bookmark"></path></svg>
                            ) : (
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bookmark" className="svg-inline--fa fa-bookmark fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"></path></svg>
                            )}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Story;