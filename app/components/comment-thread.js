import React from 'react';
import Comment from './comment';
import {getSongComments} from '../server';
import {postSongComment} from '../server';

export default class CommentThread extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: props.playing,
      comments: []
    };
  }

  componentDidMount() {
    getSongComments(this.state.current, (comments) => {
      this.setState({comments: comments});
    });
  }

  componentWillReceiveProps(nextProps) {
    getSongComments(nextProps.playing, (comments) => {
      this.setState({comments: comments, current: nextProps.playing});
    });
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleKeyUp(e) {
    if (e.key === "Enter") {
      var comment = this.state.value.trim();
      if (comment !== "") {
        // Post comment
        postSongComment(this.state.current, this.state.value, (comment) => {
          this.state.comments.push(comment);
          this.setState({comments: this.state.comments, value: ""});
        });
      }
    }
  }

  render() {
    return (
      <div>
        <input type="text" className="form-control" placeholder="Write a comment..." value={this.state.value} onChange={(e) => this.handleChange(e)} onKeyUp={(e) => this.handleKeyUp(e)}></input>
        {this.state.comments.map((comment) => {
          return (
            <Comment key={comment._id} index={comment._id} data={comment}></Comment>
          )
        })}
      </div>
    )
  }
}
