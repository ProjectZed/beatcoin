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
                    "_id": 0,
                    "title" : "Welcome to Beatcoin",
                    "genre" : "None",
                    "uploader" : {
                        "_id": 1,
                        "name": "Beatcoin Admin",
                        "beatcoins": 0,
                        // Amount of $ a User has to reward listeners
                        "balance": 0,
                        "profilePicture": "img/users/beatcoin.jpg",
                        "info": {
                            "birthday": "2017/01/24",
                            "gender": "N/A",
                            "location": "UMass Amherst",
                            "contactAgent": "N/A",
                            "education": "College",
                            "displayed": [false, false, false, false, false]
                        },
                        "uploads": [],
                        "favorites": [],
                        "token": "TOKEN-GOES-HERE",
                        "playlists": {
                            "1": {
                                "name": "Jazz",
                                "genre": "Jazz",
                                "owner": 1,
                                "cover": "img/user-home/Jazz.jpg",
                                "songs": [1]
                            },
                            "2": {
                                "name": "Folk",
                                "genre": "Folk",
                                "owner": 1,
                                "cover": "img/user-home/Folk.jpg",
                                "songs": [1]
                            },
                            "3": {
                                "name": "Rock",
                                "genre": "Rock",
                                "owner": 1,
                                "cover": "img/user-home/Rock.jpg",
                                "songs": [1]
                            },
                            "4": {
                                "name": "Blues",
                                "genre": "Blues",
                                "owner": 1,
                                "cover": "img/user-home/Blues.jpg",
                                "songs": [1]
                            },
                            "5": {
                                "name": "Funk",
                                "genre": "Funk",
                                "owner": 1,
                                "cover": "img/user-home/Funk.jpg",
                                "songs": [1]
                            },
                            "6": {
                                "name": "Country",
                                "genre": "Country",
                                "owner": 1,
                                "cover": "img/user-home/Country.jpg",
                                "songs": [1]
                            },
                            "7": {
                                "name": "Pop",
                                "genre": "Pop",
                                "owner": 1,
                                "cover": "img/user-home/Pop.jpg",
                                "songs": [1]
                            },
                            "8": {
                                "name": "RnB",
                                "genre": "RnB",
                                "owner": 1,
                                "cover": "img/user-home/RnB.jpg",
                                "songs": [1]
                            },
                            "9": {
                                "name": "Hiphop",
                                "genre": "Hiphop",
                                "owner": 1,
                                "cover": "img/user-home/Hiphop.jpg",
                                "songs": [1]
                            },
                            "10": {
                                "name": "Rapping",
                                "genre": "Rapping",
                                "owner": 1,
                                "cover": "img/user-home/Rapping.jpg",
                                "songs": [1]
                            },
                            "11": {
                                "name": "Reggae",
                                "genre": "Reggae",
                                "owner": 1,
                                "cover": "img/user-home/Reggae.jpg",
                                "songs": [1]
                            },
                            "12": {
                                "name": "Punk",
                                "genre": "Punk",
                                "owner": 1,
                                "cover": "img/user-home/Punk.jpg",
                                "songs": [1]
                            },
                            "13": {
                                "name": "EDM",
                                "genre": "EDM",
                                "owner": 1,
                                "cover": "img/user-home/EDM.jpg",
                                "songs": [1]
                            },
                            "14": {
                                "name": "Classical",
                                "genre": "Classical",
                                "owner": 1,
                                "cover": "img/user-home/Classical.jpg",
                                "songs": [1, 2, 3]
                            },
                            "15": {
                                "name": "Acapella",
                                "genre": "Acapella",
                                "owner": 1,
                                "cover": "img/user-home/Acapella.jpg",
                                "songs": [1]
                            }
                        },
                        "likes": [],
                        "comments": []
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
            <Route path="/my-profile/:id" component={MyProfile}/>
            <Route path="/contact-us" component={ContactUs}/>
            <Route path="/playlist-view" component={PlaylistView}/>
            <Route path="/profile/:id" component={Profile}/>
        </Route>
    </Router>
), document.getElementById('beatcoin-main'));
