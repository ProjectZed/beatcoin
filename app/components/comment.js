import React from 'react';
import {likeComment} from '../server';
import {unixTimeToString} from '../util';

export default class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.data;
        this.handleLikeClick = this.handleLikeClick.bind(this);
    }

    handleLikeClick(clickEvent) {
        clickEvent.preventDefault();
        if (clickEvent.button === 0) {
          likeComment(2, this.state._id, (comment) => {
            this.setState(comment);
          });
        }
    }

    render() {
        return (
            <div className="container col-md-12 list-group-item">
                <div className="row">
                    <div className="col-md-3 col-img">
                        <div className="comments-image img-circle" style={{
                            backgroundImage: "url(" + this.state.author.profilePicture + ')'
                        }}></div>
                    </div>
                    <div className="col-md-6 col-name-message">
                        <div className="comments-name">
                            {this.state.author.name}
                        </div>
                        <div className="comments-message">
                            {this.state.text}
                        </div>
                    </div>
                    <div className="col-md-3 col-actions-date">
                        <div className="comments-date pull-right">{unixTimeToString(this.state.postDate)}</div>
                        <div className="pull-right">
                            <span onClick={this.handleLikeClick} className="comments-like glyphicon glyphicon-thumbs-up"></span>
                            <span className="comments-reply">Reply</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
