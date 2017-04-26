import React from 'react';

import MyProfileInformation from './my-profile-information';
import MyProfileSelector from './my-profile-selector';
import {getPrivateProfile} from '../server';

export default class MyProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profilePicture: ""
    }
    getPrivateProfile(props.currentUserID, (user) => {
      this.setState(user);
    });
  }

  render() {
    var data = this.state;
    return (
      <div id="my-profile">
        <div className="container main-container">
          <div className="row bc-upper-profile">
            <div className="col prof-pic-and-upload">
              <img className="profile-picture img-circle" src={data.profilePicture}></img>
              <div className="row" align="right">
                <button className="upload-profile-link">
                  <span className="glyphicon glyphicon-pencil"></span>
                  Change Profile Picture
                </button>
              </div>
            </div>
            <div className="col my-profile-name">
              {data.name}
            </div>
          </div>
          <div className="row bc-upper-profile">
            <div className="col-md-4">
              <MyProfileSelector/>
            </div>
            <MyProfileInformation loggedUser={this.props.currentUserID} profile={data}/>
          </div>
        </div>
      </div>
    )
  }
}
