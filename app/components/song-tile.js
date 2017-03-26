import React from 'react';

export default class SongTile extends React.Component {
    render() {
        return (
            <div className={"col-md-4 song-container" + (this.props.isPlaying == "true" ? "" : " shaded")}>
                <div className={"song-image " + (this.props.songCover)}></div>
                <h3 className="song-title">{this.props.songTitle}</h3>
                <h4 className="song-artist">{this.props.songArtist}</h4>
            </div>
        )
    }
}
