import React from 'react';

import SongTile from './song-tile';
import SongInfo from './song-info';
import CommentThread from './comment-thread';

export default class PlaylistView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      onSongChanged: this.onSongChanged,
      setPlaylist: props.setPlaylist,
      songList: props.songList,
      currentIndex: 0,
      currentSong: 1
    };
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.currentIndex != nextProps.currentSongIndex) {
      this.setState({
        currentIndex: nextProps.currentSongIndex,
        currentSong: this.state.songList[nextProps.currentSongIndex]._id
      });
    }
    if (this.state.songList != nextProps.songList) {
      this.setState({songList: nextProps.songList});
    }
  }

  handlePrevClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      var nextIndex = this.state.currentIndex - 1;
      if (nextIndex < 0) {
        nextIndex = this.state.songList.length - 1;
      }
      this.setState({currentIndex: nextIndex, currentSong: this.state.songList[nextIndex]._id});
      this.props.onSongChanged(nextIndex);
    }
  }

  handleNextClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      var nextIndex = this.state.currentIndex + 1;
      if (nextIndex >= this.state.songList.length) {
        nextIndex = 0;
      }
      this.setState({currentIndex: nextIndex, currentSong: this.state.songList[nextIndex]._id});
      this.props.onSongChanged(nextIndex);
    }
  }

  songTileData() {}

  render() {
    var prevTile = <SongTile data={null}/>;
    if (this.state.currentSong >= 2) {
      prevTile = <SongTile data={this.state.songList[this.state.currentSong - 2]}/>;
    }
    return (
      <div id="playlist-component">
        <div className="container playlist-container">
          <div className="row border-between">
            <div className="col-md-9 songs-container">
              <div className="container col-md-12">
                <div className="row border-between">
                  <div onClick={this.handlePrevClick}>
                    {prevTile}
                  </div>
                  <SongTile isMiddle="true" data={this.state.songList[this.state.currentSong - 1]}/>
                  <div onClick={this.handleNextClick}>
                    <SongTile data={this.state.songList[this.state.currentSong]}/>
                  </div>
                </div>
                <div className="row border-top"></div>
                <SongInfo data={this.state.songList[this.state.currentSong - 1]}/>
              </div>
            </div>
            <div className="col-md-3 comments-container">
              <h3>Comments</h3>
              <CommentThread type={1} contentId={this.state.currentSong}></CommentThread>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
