// import React from 'react';
// import ReactDOM from 'react-dom';
// import {IndexRoute, Router, Route, browserHistory} from 'react-router'
//
// Each major browser view user interface must be imported.
import Profile from './components/profile.js';
import MyProfile from './components/my-profile.js';
import ContactUs from './components/contact-us.js';
import PlaylistView from './components/playlist-view.js';
import Redeem from './components/redeem.js';
import UserHome from './components/user-home.js';
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
// // if (document.getElementById('profile') !== null) {
// //   ReactDOM.render(
// //     <Profile />,
// //     document.getElementById('profile')
// //   );
// // } else if (document.getElementById('my-profile') !== null) {
// //   ReactDOM.render(
// //     <MyProfile data={profileInfo[0]}/>,
// //     document.getElementById('my-profile')
// //   );
// // }else if (document.getElementById('contact-us') !== null) {
// //   ReactDOM.render(
// //     <ContactUs />,
// //     document.getElementById('contact-us')
// //   );
// // }else if (document.getElementById('playlist-view') !== null) {
// //   ReactDOM.render(
// //     <PlaylistView />,
// //     document.getElementById('playlist-view')
// //   );
// // }else if (document.getElementById('redeem') !== null) {
// //   ReactDOM.render(
// //     <Redeem />,
// //     document.getElementById('redeem')
// //   );
// // }else if (document.getElementById('user-home') !== null) {
// //   ReactDOM.render(
// //     <UserHome />,
// //     document.getElementById('user-home')
// //   );
// // }else if (document.getElementById('navbar') !== null) {
// //   ReactDOM.render(
// //     <Navbar />,
// //     document.getElementById('navbar')
// //   );
// // }else if (document.getElementById('footer') !== null) {
// //   ReactDOM.render(
// //     <Footer data={songProps[0]}/>,
// //     document.getElementById('footer')
// //   );
// // }
//
// /**
//  * A fake profile page.
//  */
// class ProfilePage extends React.Component {
//     render() {
//         return (
//             <p>This is the profile page for a user with ID {this.props.params.id}.</p>
//         );
//     }
// }
//
// class App extends React.Component {
//     render() {
//         return (
//             <div>{this.props.children}</div>
//         )
//     }
// }
//
// ReactDOM.render((
//     <Router history={browserHistory}>
//         <Route path="/" component={App}>
// 						{}
//             <IndexRoute component={PlaylistView}/>
//             <Route path="profile/:id" component={ProfilePage}/>
//         </Route>
//     </Router>
// ), document.getElementById('beatcoin-main'));
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router'

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={PlaylistView}/>
        <Route path="/redeem" component={Redeem}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/myprofile" component={MyProfile}/>
        <Route path="/contact-us" component={ContactUs}/>
        <Route path="/user-home" component={UserHome}/>
    </Router>
), document.getElementById('beatcoin-main'));
