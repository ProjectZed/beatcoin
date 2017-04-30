import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';

// Each major browser view user interface must be imported.
import Profile from './components/profile.js';
import MyProfile from './components/my-profile.js';
import ContactUs from './components/contact-us.js';
import PlaylistView from './components/playlist-view.js';
import Redeem from './components/redeem.js';
import UserHome from './components/user-home.js';
import Navbar from './components/navbar.js';
import Footer from './components/footer.js';
import ErrorBanner from './components/errorbanner';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songList: [
        {
          "_id": "000000000000000000000000",
          "title": "Welcome to Beatcoin",
          "genre": "None",
          "uploader": {
            "_id": "000000000000000000000001",
            "name": "Beatcoin Admin",
            "beatcoins": 0,
            // Amount of $ a User has to reward listeners
            "balance": 0,
            "profilePicture": "img/users/beatcoin.jpg",
            "info": {
              "nickname": [
                "Beatcoin", false
              ],
              "birthday": [
                "2017/01/24", false
              ],
              "gender": [
                "N/A", false
              ],
              "location": [
                "UMass Amherst", false
              ],
              "contactAgent": [
                "N/A", false
              ],
              "education": ["College", false]
            },
            "uploads": [],
            "favorites": [],
            //used for authentication
            "token": "TOKEN-GOES-HERE",
            "playlists": [
              {
                "_id": "000000000000000000000001",
                "name": "Jazz",
                "genre": "Jazz",
                "owner": "000000000000000000000001",
                "cover": "img/user-home/Jazz.jpg",
                "songs": ["000000000000000000000001"]
              }, {
                "_id": "000000000000000000000002",
                "name": "Folk",
                "genre": "Folk",
                "owner": "000000000000000000000001",
                "cover": "img/user-home/Folk.jpg",
                "songs": ["000000000000000000000001"]
              }, {
                "_id": "000000000000000000000003",
                "name": "Rock",
                "genre": "Rock",
                "owner": "000000000000000000000001",
                "cover": "img/user-home/Rock.jpg",
                "songs": ["000000000000000000000001"]
              }, {
                "_id": "000000000000000000000004",
                "name": "Blues",
                "genre": "Blues",
                "owner": "000000000000000000000001",
                "cover": "img/user-home/Blues.jpg",
                "songs": ["000000000000000000000001"]
              }, {
                "_id": "000000000000000000000005",
                "name": "Funk",
                "genre": "Funk",
                "owner": "000000000000000000000001",
                "cover": "img/user-home/Funk.jpg",
                "songs": ["000000000000000000000001"]
              }, {
                "_id": "000000000000000000000006",
                "name": "Country",
                "genre": "Country",
                "owner": "000000000000000000000001",
                "cover": "img/user-home/Country.jpg",
                "songs": ["000000000000000000000001"]
              }, {
                "_id": "000000000000000000000007",
                "name": "Pop",
                "genre": "Pop",
                "owner": "000000000000000000000001",
                "cover": "img/user-home/Pop.jpg",
                "songs": ["000000000000000000000001"]
              }, {
                "_id": "000000000000000000000008",
                "name": "RnB",
                "genre": "RnB",
                "owner": "000000000000000000000001",
                "cover": "img/user-home/RnB.jpg",
                "songs": ["000000000000000000000001"]
              }, {
                "_id": "000000000000000000000009",
                "name": "Hiphop",
                "genre": "Hiphop",
                "owner": "000000000000000000000001",
                "cover": "img/user-home/Hiphop.jpg",
                "songs": ["000000000000000000000001"]
              }, {
                "_id": "000000000000000000000010",
                "name": "Rapping",
                "genre": "Rapping",
                "owner": "000000000000000000000001",
                "cover": "img/user-home/Rapping.jpg",
                "songs": ["000000000000000000000001"]
              }, {
                "_id": "000000000000000000000011",
                "name": "Reggae",
                "genre": "Reggae",
                "owner": "000000000000000000000001",
                "cover": "img/user-home/Reggae.jpg",
                "songs": ["000000000000000000000001"]
              }, {
                "_id": "000000000000000000000012",
                "name": "Punk",
                "genre": "Punk",
                "owner": "000000000000000000000001",
                "cover": "img/user-home/Punk.jpg",
                "songs": ["000000000000000000000001"]
              }, {
                "_id": "000000000000000000000013",
                "name": "EDM",
                "genre": "EDM",
                "owner": "000000000000000000000001",
                "cover": "img/user-home/EDM.jpg",
                "songs": ["000000000000000000000001"]
              }, {
                "_id": "000000000000000000000014",
                "name": "Classical",
                "genre": "Classical",
                "owner": "000000000000000000000001",
                "cover": "img/user-home/Classical.jpg",
                "songs": ["000000000000000000000001", "000000000000000000000002", "000000000000000000000003"]
              }, {
                "_id": "000000000000000000000015",
                "name": "Acapella",
                "genre": "Acapella",
                "owner": "000000000000000000000001",
                "cover": "img/user-home/Acapella.jpg",
                "songs": ["000000000000000000000001"]
              }
            ],
            "likes": [],
            "comments": []
          },
          "price": 0,
          "plays": 0,
          "audio": "audio/silence.mp3",
          "cover": "img/beatcoinholder.png",
          "lyrics": "Welcome to beatcoin",
          "uploadDate": 1453690800000,
          "likes": [0],
          "comments": []
        }
      ],
      currentSongIndex: 0,
      currentUserID: "000000000000000000000002"
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
      currentSongIndex: this.state.currentSongIndex,
      currentUserID: this.state.currentUserID
    });
    return (
      <div>
        <Navbar currentUserID={this.state.currentUserID}/>
        <div className="row">
          <div className="col-md-12">
            <ErrorBanner/>
          </div>
        </div>
        <div>{child}</div>
        <Footer songList={this.state.songList} currentSongIndex={this.state.currentSongIndex} songChangeCallback={this.onSongChanged} currentUserID={this.state.currentUserID}/>
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
