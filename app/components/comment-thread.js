import React from 'react';

export default class CommentThread extends React.Component {
    render() {
        return (
            <div>
                {React.Children.map(this.props.children, function(child) {
                    return (
                        <div className="container col-md-12 list-group-item">
                            <div className="row">
                                <div className="col-md-3 col-img">
                                    <div className={"comments-image img-circle " + child.props.picture}></div>
                                </div>
                                <div className="col-md-6 col-name-message">
                                    <div className="comments-name">
                                        {child.props.name}
                                    </div>
                                    <div className="comments-message">
                                        {child.props.message}
                                    </div>
                                </div>
                                <div className="col-md-3 col-actions-date">
                                    <div className="comments-date pull-right">{child.props.date}</div>
                                    <div className="pull-right">
                                        <span className="comments-like glyphicon glyphicon-thumbs-up"></span>
                                        <span className="comments-reply">Reply</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
