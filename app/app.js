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
            songList: [],
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
            songList: this.state.songs,
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
