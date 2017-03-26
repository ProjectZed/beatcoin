import React from 'react';

import MyProfileInformation from './my-profile-information';
import MyProfileSelector from './my-profile-selector';
import Navbar from './navbar';
import Footer from './footer';

export default class MyProfile extends React.Component {
    render() {
        return (
            <div>
              <Navbar></Navbar>
            <div className="container main-container">
                <div className="row bc-upper-profile">
                    <div className="col-md-4">
                        <div className="row" align="right">
                            <img src="img/bach.jpg" className="profile-picture img-circle"></img>
                        </div>
                        <div className="row" align="right">
                            <button className="upload-profile-link">

                        <span className="glyphicon glyphicon-pencil"></span>
                        Change Profile Picture
                    </button>
                        </div>
                    </div>
                    <div className="col-md-8 my-profile-name">
                        {this.props.data.Name}
                    </div>
                </div>
                <div className="row bc-upper-profile">
                    <div className="col-md-4">
                      <MyProfileSelector />
                    </div>

                    <MyProfileInformation data={this.props.data}/>
                </div>

            </div>
            <Footer data={{songTime:'13:37',songTitle:'Sherlock',songArtist:'Blasphemy Frumblesnatch'}}/>,
            </div>
        )
    }
}
