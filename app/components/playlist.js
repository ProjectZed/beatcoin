import React from 'react';
import {getPlaylist} from '../server';

export default class Playlist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      genreInfo: this.props.genreInfo,
      setPlaylist: this.props.setPlaylist
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    getPlaylist(this.state.genreInfo.owner, this.state.genreInfo._id - 1, (songList) => {
      this.state.setPlaylist(songList.songs);
    });
  }

  render() {
    return (
      <div className="col-md-3">
        <div className="relative">
          <a href="#" onClick={(e) => this.onClick(e)}>
            <img className="img" src={this.state.genreInfo.cover} alt=""/>
            <p className="absolute-text">{this.state.genreInfo.name}</p>
          </a>
        </div>
      </div>
    )
  }
}
