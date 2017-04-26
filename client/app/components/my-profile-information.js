import React from 'react';
import {updateProfile} from '../server';

export default class MyProfileInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedUser: props.loggedUser,
      name: "",
      info: {
        nickname: [
          "", false
        ],
        birthday: [
          "", false
        ],
        contactAgent: [
          "", false
        ],
        education: [
          "", false
        ],
        gender: [
          "", false
        ],
        location: ["", false]
      }
    }
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.state) {
      this.setState(nextProps.profile);
    }
  }

  handleToggle(e, key) {
    e.preventDefault();
    var newProfile = this.state.info;
    newProfile[key][1] = !newProfile[key][1];
    updateProfile(this.state.loggedUser, newProfile, (updatedProfile) => {
      this.setState({info: updatedProfile.info});
    });
  }

  render() {
    return (
      <div>
        <div className="col-md-8 profile-info">
          <font size="6">General
          </font>
          <font size="4">
            <a href="#">
              <span className="glyphicon glyphicon-pencil"></span>
            </a>
          </font>
          <hr/>
          <div className="col-md-4 displayed-info">
            Nickname
            <br/>
            Birthday
            <br/>
            Gender
            <br/>
            Location
            <br/>
            Education
            <br/>
            Contact Agent
          </div>
          <div className="col-md-4 displayed-info">
            {this.state.info.nickname[0]}
            <br/> {this.state.info.birthday[0]}
            <br/> {this.state.info.gender[0]}
            <br/> {this.state.info.location[0]}
            <br/> {this.state.info.education[0]}
            <br/> {this.state.info.contactAgent[0]}
          </div>
          <div className="col-md-3 displayed-info">
            <div onClick={(e) => this.handleToggle(e, "nickname")}>
              {this.state.info.nickname[1]
                ? "Displayed"
                : "Hidden"}
              <span className={"glyphicon glyphicon-" + (this.state.info.nickname[1]
                ? "remove"
                : "ok")}></span>
            </div>
            <div onClick={(e) => this.handleToggle(e, "birthday")}>
              {this.state.info.birthday[1]
                ? "Displayed"
                : "Hidden"}<span className={"glyphicon glyphicon-" + (this.state.info.birthday[1]
        ? "remove"
        : "ok")}></span>
            </div>
            <div onClick={(e) => this.handleToggle(e, "gender")}>
              {this.state.info.gender[1]
                ? "Displayed"
                : "Hidden"}<span className={"glyphicon glyphicon-" + (this.state.info.gender[1]
        ? "remove"
        : "ok")}></span>
            </div>
            <div onClick={(e) => this.handleToggle(e, "location")}>
              {this.state.info.location[1]
                ? "Displayed"
                : "Hidden"}<span className={"glyphicon glyphicon-" + (this.state.info.location[1]
        ? "remove"
        : "ok")}></span>
            </div>
            <div onClick={(e) => this.handleToggle(e, "education")}>
              {this.state.info.education[1]
                ? "Displayed"
                : "Hidden"}<span className={"glyphicon glyphicon-" + (this.state.info.education[1]
        ? "remove"
        : "ok")}></span>
            </div>
            <div onClick={(e) => this.handleToggle(e, "contactAgent")}>
              {this.state.info.contactAgent[1]
                ? "Displayed"
                : "Hidden"}<span className={"glyphicon glyphicon-" + (this.state.info.contactAgent[1]
        ? "remove"
        : "ok")}></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
