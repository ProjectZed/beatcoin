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
//
// // For each view conditionally determine which view to display
// // depending on if the ID is present in the HTML.
// // const songProps = [
// // {
// // 	'songTime':'13:37',
// // 	'songTitle':'Sherlock',
// // 	'songArtist':'Blasphemy Frumblesnatch'
// // }
// // ]
// // const profileInfo = [
// // 	{
// // 		'Name':'Johann Bach',
// // 		'birthday':'1685/03/31',
// // 		'birthdaystatus':'Hidden',
// // 		'gender':'Male',
// // 		'genderstatus':'Hidden',
// // 		'address':'Germany',
// // 		'addressstatus':'Displayed',
// // 		'education':'High School',
// // 		'educationstatus':'Hidden',
// // 		'profilePicture':'img/bach.jpg'
// // 	}
// // ]
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.route.current,
            songs: props.route.songs,
            array: props.route.array
        }
        this.playSong = this.playSong.bind(this)
    }

    playSong(index) {
        this.setState({current: index});
    }

    songChange(songID) {
        this.props.children.setState({"currentSong": songID});
    }

    render() {
        const {children} = this.props;
        const child = React.cloneElement(children, {
            playSong: this.playSong,
            playlist: 14
        });
        return (
            <div>
                <Navbar/>
                <div>{child}</div>
                <Footer songs={this.state.songs} data={this.state.current} update={this.songChange}/>
            </div>
        )
    }
}
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" songs={[
            {
                "url": "audio/star-spangled-banner.mp3",
                "cover": "img/songs/covers/star-spangled-banner.jpg",
                "artist": {
                    "song": "The Star Spangled Banner",
                    "name": "USA"
                }
            }, {
                "url": "audio/o-canada.mp3",
                "cover": "img/songs/covers/o-canada.jpg",
                "artist": {
                    "song": "O Canada",
                    "name": "Canada"
                }
            }
        ]} current={0} array={0} component={App}>
            <IndexRoute component={UserHome}/>
            <Route path="/redeem" component={Redeem}/>
            <Route path="/my-profile" component={MyProfile}/>
            <Route path="/contact-us" component={ContactUs}/>
            <Route path="/playlist-view" component={PlaylistView}/>
            <Route path="/profile/:id" component={Profile}/>
        </Route>
    </Router>
), document.getElementById('beatcoin-main'));
