import React from 'react';
import Comment from './comment';
import {getSongComments} from '../server';

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

    render() {
        return (
            <div>
                {this.state.comments.map((comment, i) => {
                    return (
                        <Comment key={i} data={comment}></Comment>
                    )
                })}
            </div>
        )
    }
}
