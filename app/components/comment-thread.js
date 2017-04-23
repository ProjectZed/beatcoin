import React from 'react';
import Comment from './comment';
import {getLoggedInUserId} from '../server';
import {getSongComments} from '../server';
import {postSongComment} from '../server';
import {getUserComments} from '../server';
import {postUserComment} from '../server';

const TYPE_SONG = 1;
const TYPE_USER = 2;

export default class CommentThread extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      contentId: props.contentId,
      comments: [],
      commentText: ""
    };
    this.commentCallback = this.commentCallback.bind(this);
  }

  commentCallback(comments) {
    this.setState({comments: comments});
  }

  componentDidMount() {
    if (this.state.type == TYPE_SONG) {
      getSongComments(this.state.contentId, this.commentCallback);
    } else if (this.state.type == TYPE_USER) {
      getUserComments(this.state.contentId, this.commentCallback);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type == TYPE_SONG) {
      getSongComments(nextProps.contentId, (comments) => {
        this.setState({comments: comments, contentId: nextProps.contentId, type: nextProps.type});
      });
    } else if (this.state.type == TYPE_USER) {
      getUserComments(nextProps.contentId, (comments) => {
        this.setState({comments: comments, contentId: nextProps.contentId, type: nextProps.type});
      });
    }
  }

  handleChange(e) {
    this.setState({commentText: e.target.value});
  }

  handleKeyUp(e) {
    if (e.key === "Enter") {
      var comment = this.state.commentText.trim();
      if (comment !== "") {
        if (this.state.type == TYPE_SONG) {
          // Post comment to song
          postSongComment(this.state.contentId, this.state.commentText, (comment) => {
            this.setState({comments: this.state.comments.concat(comment), commentText: ""});
          });
        } else if (this.state.type == TYPE_USER) {
          // Post comment to user
          getLoggedInUserId((userId) => {
            postUserComment(userId, this.state.contentId, this.state.commentText, (comment) => {
              this.setState({comments: this.state.comments.concat(comment), commentText: ""});
            });
          });
        }
      }
    }
  }

  render() {
    return (
      <div>
        <input type="text" className="form-control" placeholder="Write a comment..." value={this.state.commentText} onChange={(e) => this.handleChange(e)} onKeyUp={(e) => this.handleKeyUp(e)}></input>
        {this.state.comments.map((comment) => {
          return (
            <Comment key={comment._id} index={comment._id} data={comment}></Comment>
          )
        })}
      </div>
    )
  }
}
