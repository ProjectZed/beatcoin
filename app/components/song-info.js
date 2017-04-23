import React from 'react';

export default class SongInfo extends React.Component {

  render() {
    var description = "";
    if (this.props.data != null && this.props.data.description != null) {
      description = this.props.data.description;
    }
    var lyrics = "";
    if (this.props.data != null && this.props.data.lyrics != null) {
      lyrics = this.props.data.lyrics;
    }
    return (
      <div className="row border-between">
        <div className="col-md-6 description-container">
          <h3>Description</h3>
          <div className="description">{description}</div>
        </div>
        <div className="col-md-6 lyrics-container">
          <h3>Lyrics</h3>
          <div className="lyrics">{lyrics}</div>
        </div>
      </div>
    )
  }
}
