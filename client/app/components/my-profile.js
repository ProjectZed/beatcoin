import React from 'react';

import MyProfileInformation from './my-profile-information';
import MyProfileSelector from './my-profile-selector';
import {getPrivateProfile} from '../server';
import {Link} from 'react-router';

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
    // console.log(this.state);
    // console.log(this.state.profilePicture);

    var data = this.state;
    return (
      <div id="my-profile">
        <div className="container main-container">
          <div className="row bc-upper-profile">
            <div className="col-md-3 prof-pic-and-upload">

              <div className="row" align="right">
                <div className="profile-picture img-circle" style={{
                  'backgroundImage': "url('" + this.state.profilePicture + "')"
                }}></div>
                <Link to={"/profile/" + this.props.currentUserID}>
                  <button type="button" className="donate-button btn btn-default every-button">
                    <span className="" styles="width:100%">
                      <div style={{'color': 'white'}}>
                      Public Profile
                    </div>
                    </span>
                  </button>
                </Link>

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
