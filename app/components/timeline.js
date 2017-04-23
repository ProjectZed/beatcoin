import React from 'react';
import {getUploadedSongs} from '../server';
import TimelineSong from './timeline-song';

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.id,
      uploadedSongs: []
    };
  }

  refresh() {
    getUploadedSongs(this.state.userId, (uploadedSongs) => {
      this.setState({uploadedSongs: uploadedSongs});
    });
  }

  componentDidMount() {
    this.refresh();
  }

  makeSongElement(song, i) {
    return <TimelineSong songIndex={i} uploadedSongs={this.state.uploadedSongs} songInfo={song} setPlaylist={this.props.setPlaylist} onSongChanged={this.props.onSongChanged} />;
  }

  getUploadedSongElements() {
    var elements = [];
    for (var i = 0; i < this.state.uploadedSongs.length; i++) {
      var song = this.state.uploadedSongs[i];
      elements.push( this.makeSongElement(song, i) );
    }
    return elements;
  }

  render() {
    //If the user hasn't uploaded any songs
    if(this.state.uploadedSongs == 0) {
      return (
        <div className="col-md-4">
          <h4 className="timeline-title">Timeline</h4>
          <div className="panel box">
            <div className="panel-body">
              No Songs Uploaded
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="col-md-4">
          <h4 className="timeline-title">Timeline</h4>

          {React.Children.map(this.getUploadedSongElements(), function(song) {
            return (
              <div>{song}</div>
            );
          })}
        </div>
      );
    }
  }
}
