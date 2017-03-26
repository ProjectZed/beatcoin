import React from 'react';

import SongTile from './song-tile';
import SongInfo from './song-info';
import CommentThread from './comment-thread';
import Navbar from './navbar';
import Footer from './footer';

export default class PlaylistView extends React.Component {
    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className="container playlist-container">
                    <div className="row border-between">
                        <div className="col-md-9 songs-container">
                            <div className="container col-md-12">
                                <div className="row border-between">
                                    <SongTile isPlaying="false" songCover="previous-song" songTitle="Sherlock" songArtist="Bourgeoisie Clombyclomp"/>
                                    <SongTile isPlaying="true" songCover="current-song" songTitle="Sherlock" songArtist="Blasphemy Frumblesnatch"/>
                                    <SongTile isPlaying="false" songCover="next-song" songTitle="Sherlock" songArtist="Buttercup Crackerdong"/>
                                </div>
                                <div className="row border-top"></div>
                                <SongInfo songDescription="This is my first song released on Beatcoin! Hope you all enjoy it!" songLyrics="Turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle"/>
                            </div>
                        </div>
                        <div className="col-md-3 comments-container">
                            <h3>Comments</h3>
                            <CommentThread>
                                <Comment picture="profile-pic" name="Doggie Doggo" message="Bark Bark Bark Bark" date="Today"/>
                                <Comment picture="profile-pic" name="Doggie Doggo" message="Whoof Whoof Whoof Whoof" date="Yesterday"/>
                            </CommentThread>
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
