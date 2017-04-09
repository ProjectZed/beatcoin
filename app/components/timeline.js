import React from 'react';
import {getLoggedInUserId, getUploadedSongs} from '../server';

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      uploadedSongs: []
    };
  }

  refresh() {
    getLoggedInUserId((userId) => {
      this.setState({userId: userId});

      getUploadedSongs(userId, (uploadedSongs) => {
        this.setState({uploadedSongs: uploadedSongs});
      });
    })
  }

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

  getUploadedSongElements() {
    var elements = [];
    for (var key in this.state.uploadedSongs) {
      var song = this.state.uploadedSongs[key];
      elements.push(this.convertSongToElement(song));
    }
    return elements;
  }

  render() {
    if (this.state.uploadedSongs == 0) {
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
