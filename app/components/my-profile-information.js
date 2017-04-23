import React from 'react';
import {updateDisplayInfo} from '../server';

export default class MyProfileInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      info: {
        birthday: "",
        contactAgent: "",
        displayed: [
          true, true, true, true, true
        ],
        education: "",
        gender: "",
        location: ""
      }
    }
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.state) {
      this.setState(nextProps.profile);
    }
  }

  handleToggle(e, index) {
    e.preventDefault();
    var newDisplay = this.state.info.displayed;
    newDisplay[index] = !newDisplay[index];
    var newState = this.state;
    updateDisplayInfo(newDisplay, (updatedDisplay) => {
      newState.info.dsplayed = updatedDisplay;
      this.setState(newState);
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
            Displayed Name
            <br/>
            Birthday
            <br/>
            Gender
            <br/>
            Location
            <br/>
            Education
          </div>
          <div className="col-md-4 displayed-info">
            {this.state.name}
            <br/> {this.state.info.birthday}
            <br/> {this.state.info.gender}
            <br/> {this.state.info.location}
            <br/> {this.state.info.education}
          </div>
          <div className="col-md-3 displayed-info">
            <div onClick={(e) => this.handleToggle(e, 0)}>
              {this.state.info.displayed[0]
                ? "Displayed"
                : "Hidden"}
              <span className={"glyphicon glyphicon-" + (this.state.info.displayed[0]
                ? "remove"
                : "ok")}></span>
            </div>
            <div onClick={(e) => this.handleToggle(e, 1)}>
              {this.state.info.displayed[1]
                ? "Displayed"
                : "Hidden"}<span className={"glyphicon glyphicon-" + (this.state.info.displayed[1]
        ? "remove"
        : "ok")}></span>
            </div>
            <div onClick={(e) => this.handleToggle(e, 2)}>
              {this.state.info.displayed[2]
                ? "Displayed"
                : "Hidden"}<span className={"glyphicon glyphicon-" + (this.state.info.displayed[2]
        ? "remove"
        : "ok")}></span>
            </div>
            <div onClick={(e) => this.handleToggle(e, 3)}>
              {this.state.info.displayed[3]
                ? "Displayed"
                : "Hidden"}<span className={"glyphicon glyphicon-" + (this.state.info.displayed[3]
        ? "remove"
        : "ok")}></span>
            </div>
            <div onClick={(e) => this.handleToggle(e, 4)}>
              {this.state.info.displayed[4]
                ? "Displayed"
                : "Hidden"}<span className={"glyphicon glyphicon-" + (this.state.info.displayed[4]
        ? "remove"
        : "ok")}></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
