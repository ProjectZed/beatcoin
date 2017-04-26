import React from 'react';

export default class SongTile extends React.Component {

  render() {
    if (this.props.data == null) {
      return (
        <div className={"col-md-4"}></div>
      );
    } else {
      return (
        <div className={"col-md-4 song-container" + (this.props.isMiddle == "true"
          ? ""
          : " shaded")}>
          <div className="song-image" style={{
            backgroundImage: "url(" + this.props.data.cover + ')'
          }}></div>
          <h3 className="song-title">{this.props.data.title}</h3>
          <h4 className="song-artist">{this.props.data.uploader.name}</h4>
        </div>
      )
    }
  }
}
