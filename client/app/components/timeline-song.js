import React from 'react';

export default class TimelineSong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedSongs: props.uploadedSongs,
      songInfo: props.songInfo,
      songIndex: props.songIndex,
      setPlaylist: props.setPlaylist,
      onSongChanged: props.onSongChanged
    };
    this.onClick = this.onClick.bind(this);
  }

  refresh() {}

  componentDidMount() {
    this.refresh();
  }

  formatDate(timestamp) {
    var d = new Date(timestamp);

    return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
  }

  convertSongToElement(song) {
    //might be interesting to include plays/price/likes as well
    return (
      <div>
        <div className="row song-timestamp">
          <span className="glyphicon glyphicon-time"></span>
          {this.formatDate(song["uploadDate"])}
        </div>

        <div className="panel box">
          <div className="panel-body">
            <div className="col-md-3">
              <div className="comments-image uploaded-song-pic" style={{
                'backgroundImage': "url('" + song["cover"] + "')"
              }}></div>
            </div>

            <div className="col-md-9">
              <a href="#" onClick={(e) => this.onClick(e)}>
                {song["title"]}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onClick(e) {
    e.preventDefault();

    this.state.setPlaylist(this.state.uploadedSongs);
    this.state.onSongChanged(this.state.songIndex);

    // getPlaylist(this.state.genreInfo.owner, this.state.genreInfo._id - 1, (songList) => {
    //   this.state.setPlaylist(songList.songs);
    // });
  }

  render() {
    return (
      <div>
        {this.convertSongToElement(this.state.songInfo)}
      </div>
    )
  }
}
