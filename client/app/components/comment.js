import React from 'react';
import {likeComment} from '../server';
import {dislikeComment} from '../server';
import {unixTimeToString} from '../util';

export default class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: props.comment,
      loggedUser: props.userId,
      index: props.index
    }
    this.handleLikeClick = this.handleLikeClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({comment: nextProps.comment, index: nextProps.index});
  }

  handleLikeClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      if (this.didUserLike()) {
        dislikeComment(this.state.loggedUser, this.state.index, (comment) => {
          this.setState({comment: comment});
        });
      } else {
        likeComment(this.state.loggedUser, this.state.index, (comment) => {
          this.setState({comment: comment});
        });
      }
    }
  }

  didUserLike() {
    return this.state.comment.likes.indexOf(this.state.loggedUser) !== -1;
  }

  render() {
    var comment = this.state.comment;
    return (
      <div className="container col-md-12 list-group-item">
        <div className="row">
          <div className="col-md-3 col-img">
            <div className="comments-image img-circle" style={{
              backgroundImage: "url(" + comment.author.profilePicture + ')'
            }}></div>
          </div>
          <div className="col-md-6 col-name-message">
            <div className="comments-name">
              {comment.author.name}
            </div>
            <div className="comments-message">
              {comment.text}
            </div>
          </div>
          <div className="col-md-3 col-actions-date">
            <div className="comments-date pull-right">{unixTimeToString(comment.postDate)}</div>
            <div className="pull-right">
              <span onClick={this.handleLikeClick} className="comments-like glyphicon glyphicon-thumbs-up">{comment.likes.length}</span>
              <span className="comments-reply">Reply</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
