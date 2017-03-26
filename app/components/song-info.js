import React from 'react';

export default class SongInfo extends React.Component {
    render() {
        return (
            <div className="row border-between">
                <div className="col-md-6 description-container">
                    <h3>Description</h3>
                    <span className="description">{this.props.songDescription}</span>
                </div>
                <div className="col-md-6 lyrics-container">
                    <h3>Lyrics</h3>
                    <span className="lyrics">{this.props.songLyrics}</span>
                </div>
            </div>
        )
    }
}
