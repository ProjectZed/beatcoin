import React from 'react';
import CommentThread from './comment-thread';
import DonateButton from './donate-button';
import ProfileInfo from './profile-info';
import Timeline from './timeline';
import PlaylistList from './playlist-list';
import {getPublicProfile} from '../server';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.routeParams.id,
      userData: {
        name: "",
        profilePicture: "",
        info: {}
      },
      setPlaylist: this.props.setPlaylist
    };
  }

  refresh() {
    getPublicProfile(this.state.userId, (userData) => {
      this.setState({userData: userData});
    });
  }

  componentDidMount() {
    this.refresh();
  }

  componentWillReceiveProps(nextProps) {
    getPublicProfile(nextProps.routeParams.id, (userData) => {
      this.setState({userId: nextProps.routeParams.id, userData: userData});
    });
  }

  render() {
    if (this.state.userId === 0) {
      return (
        <div id="profile"></div>
      );
    }
    return (
      <div id="profile">
        <div className="container main-container">
          <div className="row bc-upper-profile">
            <div className="col-md-3">
              <div className="row" align="right">
                <div className="profile-picture img-circle" style={{
                  'backgroundImage': "url('" + this.state.userData.profilePicture + "')"
                }}></div>
              <DonateButton id={this.state.userId}/>
              </div>
            </div>
            <div className="col-md-9 bc-profile-name">
              {this.state.userData.name}
            </div>
          </div>
          <div className="row bc-middle-profile"></div>
          <div className="row bc-lower-profile">
            <div className="row">
              <Timeline id={this.state.userId} setPlaylist={this.props.setPlaylist} onSongChanged={this.props.onSongChanged}/>

              <div className="col-md-4">
                <h4 className="timeline-title">Biography</h4>
                <ProfileInfo profile={this.state.userData.info}/>
              </div>

              <div className="col-md-4 comments-container" align="right" style={{
                'height': '0'
              }}>
                <h4 className="timeline-title">Comments</h4>
                <CommentThread type={2} contentId={this.state.userId}></CommentThread>
              </div>
            </div>

            <div className="row" id="userhome">
              <h4 className="timeline-title">Playlists</h4>
              <PlaylistList userId={this.state.userId} setPlaylist={this.props.setPlaylist}></PlaylistList>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
