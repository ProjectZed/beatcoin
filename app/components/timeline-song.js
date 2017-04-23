import React from 'react';

export default class TimelineSong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songInfo: props.songInfo
    };
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

    // song.cover
    // console.log(song);

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
              {song["title"]}
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.convertSongToElement(this.state.songInfo)}
      </div>
    )
  }
}
