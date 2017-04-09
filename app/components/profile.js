import React from 'react';
import CommentThread from './comment-thread';
import DonateButton from './donate-button';
import ProfileInfo from './profile-info';
import Timeline from './timeline';
import PlaylistList from './playlist-list';
import Playlist from './playlist';
import {getUserData} from '../server';

export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: {}
		};
	}

	refresh() {
		getUserData(this.props.params.id, (userData) => {
			this.setState(userData);
		});
	}

	componentDidMount() {
		this.refresh();
	}

	render() {
		var data = this.state;

    return (
      <div id="profile">
        <div className="container main-container">
          <div className="row bc-upper-profile">
            <div className="col-md-3">
              <div className="row" align="right">
                <div className="profile-picture img-circle" style={{'backgroundImage': "url('" + data.profilePicture + "')"
                }}></div>
                <DonateButton id={this.props.params.id}/>
              </div>
            </div>
            <div className="col-md-9 bc-profile-name">
              {data.name}
            </div>
          </div>

          <div className="row bc-middle-profile"></div>

          <div className="row bc-lower-profile">
            <div className="row">
              <Timeline id={this.props.params.id}/>

              <div className="col-md-4">
                <h4 className="timeline-title">Biography</h4>
                <ProfileInfo id={this.props.params.id} data={data.info}/>
              </div>

              <div className="col-md-4 comments-container" align="right" style={{
                'height': '0'
              }}>
                <h4 className="timeline-title">Comments</h4>
                <CommentThread>
                  <Comment picture="profile-pic" name="Doggie Doggo" message="Bark Bark Bark" date="Today"/>
                  <Comment picture="profile-pic" name="Doggie Doggo" message="Woof Woof Woof" date="Yesterday"/>
                </CommentThread>
              </div>
            </div>

            <div className="row">
              <h4 className="timeline-title">Playlists</h4>
              <PlaylistList id={this.props.params.id}>
                <Playlist pic="img/user-home/Jazz.jpg" listname="My Jazz"></Playlist>
                <Playlist pic="img/user-home/Jazz.jpg" listname="My Jazz"></Playlist>
                <Playlist pic="img/user-home/Jazz.jpg" listname="My Jazz"></Playlist>
                <Playlist pic="img/user-home/Jazz.jpg" listname="My Jazz"></Playlist>
                <Playlist pic="img/user-home/Jazz.jpg" listname="My Jazz"></Playlist>
                <Playlist pic="img/user-home/Jazz.jpg" listname="My Jazz"></Playlist>
              </PlaylistList>
            </div>

          </div>

        </div>
      </div>
    )
  }
}
