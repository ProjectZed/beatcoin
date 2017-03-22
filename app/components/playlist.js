import React from 'react';

export default class Playlist extends React.Component {
  render() {
    return (
      <div className="col-md-3">
        <div className="relative">
          <a href="#">
            <img className = "img" src={this.props.pic} alt="" />
            <p className="absolute-text">{this.props.listname}</p>
          </a>
        </div>
      </div>
    )
  }
}
