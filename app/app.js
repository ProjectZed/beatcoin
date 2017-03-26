import React from 'react';
import ReactDOM from 'react-dom';

// Each major browser view user interface must be imported.
import Profile from './components/profile.js';
import MyProfile from './components/my-profile.js';
import ContactUs from './components/contact-us.js';
import PlaylistView from './components/playlist-view.js';
import Redeem from './components/redeem.js';
import UserHome from './components/user-home.js';
import Navbar from './components/navbar.js';
import Footer from './components/footer.js';

// For each view conditionally determine which view to display
// depending on if the ID is present in the HTML.
const songProps = [
{
	'songTime':'13:37',
	'songTitle':'Sherlock',
	'songArtist':'Blasphemy Frumblesnatch'
}
]
const profileInfo = [
	{
		'Name':'Johann Bach',
		'birthday':'1685/03/31',
		'birthdaystatus':'Hidden',
		'gender':'Male',
		'genderstatus':'Hidden',
		'address':'Germany',
		'addressstatus':'Displayed',
		'education':'High School',
		'educationstatus':'Hidden'
	}
]
if (document.getElementById('profile') !== null) {
  ReactDOM.render(
    <Profile />,
    document.getElementById('profile')
  );
} else if (document.getElementById('my-profile') !== null) {
  ReactDOM.render(
    <MyProfile data={profileInfo[0]}/>,
    document.getElementById('my-profile')
  );
}else if (document.getElementById('contact-us') !== null) {
  ReactDOM.render(
    <ContactUs />,
    document.getElementById('contact-us')
  );
}else if (document.getElementById('playlist-view') !== null) {
  ReactDOM.render(
    <PlaylistView />,
    document.getElementById('playlist-view')
  );
}else if (document.getElementById('redeem') !== null) {
  ReactDOM.render(
    <Redeem />,
    document.getElementById('redeem')
  );
}else if (document.getElementById('user-home') !== null) {
  ReactDOM.render(
    <UserHome />,
    document.getElementById('user-home')
  );
}else if (document.getElementById('navbar') !== null) {
  ReactDOM.render(
    <Navbar />,
    document.getElementById('navbar')
  );
}else if (document.getElementById('footer') !== null) {
  ReactDOM.render(
    <Footer data={songProps[0]}/>,
    document.getElementById('footer')
  );
}
