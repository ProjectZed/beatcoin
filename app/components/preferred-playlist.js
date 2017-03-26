import React from 'react';

export default class PreferredPlaylist extends React.Component {
  render() {
    return (

      <div className="row">
        <div className="col-md-12">
          <div className="relative">
            <a href="#">
              <img className = "img-big" src={this.props.pic} alt=""/>
              <p className="playlist-text">User Preferred Playlist</p>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
