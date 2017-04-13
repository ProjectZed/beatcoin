import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Router, Route, browserHistory} from 'react-router'

// Each major browser view user interface must be imported.
import Profile from './components/profile.js';
import MyProfile from './components/my-profile.js';
import ContactUs from './components/contact-us.js';
import PlaylistView from './components/playlist-view.js';
import Redeem from './components/redeem.js';
import UserHome from './components/user-home.js';
import Navbar from './components/navbar.js';
import Footer from './components/footer.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songList: [
                {
                    "title" : "Welcome to Beatcoin",
                    "genre" : "None",
                    "uploader" : {
                        "_id": 2,
                        "name": "Fang Jhang",
                        "beatcoins": 200,
                        "balance": 500,
                        "profilePicture": "img/users/fang_jhang.jpg",
                        "info": {
                            "birthday": "1689/03/31",
                            "gender": "Female",
                            "location": "UMass Amherst",
                            "contactAgent": "Sara Ramaker (310-288-8000)",
                            "education": "High School",
                            "displayed": [true, true, true, true, true]
                        },
                        "uploads": [
                            1, 2, 3
                        ],
                        "favorites": [
                            1, 2, 3
                        ],
                        "token": "TOKEN-GOES-HERE",
                        "playlists": {
                            "1": {
                                "name": "My Jazz",
                                "genre": "Jazz",
                                "owner": 1,
                                "cover": "img/user-home/Jazz.jpg",
                                "songs": [1]
                            }
                        },
                        "likes": [2],
                        "comments": [1, 2]
                    },
                    "price" : 0,
                    "plays" : 0,
                    "audio" : "audio/silence.mp3",
                    "cover" : "img/beatcoinholder.png",
                    "lyrics" : "Welcome to beatcoin",
                    "uploadDate" : 1453690800000,
                    "likes" : [0],
                    "comments" : []
                }
            ],
            currentSongIndex: 0
        }
        this.setPlaylist = this.setPlaylist.bind(this);
        this.onSongChanged = this.onSongChanged.bind(this);
    }

    onSongChanged(songIndex) {
        this.setState({currentSongIndex: songIndex});
    }

    setPlaylist(songList) {
        this.setState({songList: songList});
    }

    render() {
        const {children} = this.props;
        const child = React.cloneElement(children, {
            onSongChanged: this.onSongChanged,
            setPlaylist: this.setPlaylist,
            songList: this.state.songList,
            currentSongIndex: this.state.currentSongIndex
        });
        return (
            <div>
                <Navbar/>
                <div>{child}</div>
                <Footer songList={this.state.songList} currentSongIndex={this.state.currentSongIndex} songChangeCallback={this.onSongChanged}/>
            </div>
        )
    }
}
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={UserHome}/>
            <Route path="/redeem" component={Redeem}/>
            <Route path="/my-profile" component={MyProfile}/>
            <Route path="/contact-us" component={ContactUs}/>
            <Route path="/playlist-view" component={PlaylistView}/>
            <Route path="/profile/:id" component={Profile}/>
        </Route>
    </Router>
), document.getElementById('beatcoin-main'));
