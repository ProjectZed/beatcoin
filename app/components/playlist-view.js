import React from 'react';

import SongTile from './song-tile';
import SongInfo from './song-info';
import CommentThread from './comment-thread';
import Navbar from './navbar';
import Footer from './footer';
import {getPlaylist} from '../server';

export default class PlaylistView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playlistId: props.route.playlist,
            playlist: {
                songs: []
            },
            currentSong: 2
        };
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
    }

    componentDidMount() {
        getPlaylist(1, this.state.playlistId, (playlist) => {
            this.setState({playlist: playlist});
        })
    }

    handlePrevClick(clickEvent) {
        clickEvent.preventDefault();
        if (clickEvent.button === 0) {
            var newState = this.state.currentSong - 1;
            if (newState <= 0) {
                newState = 1;
            }
            this.setState({currentSong: newState});
        }
    }

    handleNextClick(clickEvent) {
        clickEvent.preventDefault();
        if (clickEvent.button === 0) {
            var newState = this.state.currentSong + 1;
            if (newState > this.state.playlist.length) {
                newState = this.state.playlist.length;
            }
            this.setState({currentSong: newState});
        }
    }

    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className="container playlist-container">
                    <div className="row border-between">
                        <div className="col-md-9 songs-container">
                            <div className="container col-md-12">
                                <div className="row border-between">
                                    <div onClick={this.handlePrevClick}>
                                        <SongTile data={this.state.playlist.songs[this.state.currentSong - 2]}/>
                                    </div>
                                    <SongTile isMiddle="true" data={this.state.playlist.songs[this.state.currentSong - 1]}/>
                                    <div onClick={this.handleNextClick}>
                                        <SongTile data={this.state.playlist.songs[this.state.currentSong]}/>
                                    </div>
                                </div>
                                <div className="row border-top"></div>
                                <SongInfo data={this.state.playlist.songs[this.state.currentSong - 1]}/>
                            </div>
                        </div>
                        <div className="col-md-3 comments-container">
                            <h3>Comments</h3>
                            <CommentThread playing={this.state.currentSong}></CommentThread>
                        </div>
                    </div>
                </div>
                <Footer data={{
                    songTime: '13:37',
                    songTitle: 'Sherlock',
                    songArtist: 'Blasphemy Frumblesnatch'
                }}></Footer>
            </div>
        )
    }
}
