import React from 'react';
import MyProfileVis from './my-profile-vis';
import {getUserData} from '../server';

export default class MyProfileInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
  }
  refresh() {
    getUserData(this.props.id, (userData) => {
      this.setState(userData.info);
    });
  }
  makeElement(key) {
    var info = this.state;
    var value = info[key];
    var isDisplayed = info[key][1];
    if (isDisplayed) {
      return <div>
        <span>{value}</span>
      </div>;
    } else {
      return <div>
        <span>{value}</span>
      </div>;
    }
  }
  makeElements(data) {
    var elements = [];
    for (var key in data) {
      elements.push(this.makeElement(key));
    }
    return elements;
  }
  makeDisplayedElement(key) {
    var info = this.state;
    var isDisplayed = info[key][1];
    if (isDisplayed) {
      return <div >
        Displayed<span className="glyphicon glyphicon-remove"></span>
      </div>;
    } else {
      return <div>
        <span>Hidden</span>
        <span className="glyphicon glyphicon-ok"></span>
      </div>;
    }
  }
  makeDisplayedElements(data) {
    var elements = [];
    for (var key in data) {
      elements.push(this.makeDisplayedElement(key));
    }
    return elements;
  }

  render() {
    this.refresh();
    var data = this.state;
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
            Address
            <br/>
            Education
          </div>
          <div className="col-md-4 displayed-info">{this.props.username}{React.Children.map(this.makeElements(data), function(element) {
              return <div>{element}</div>;
            })}</div>
          <div className="col-md-3 displayed-info">
            <br/>{React.Children.map(this.makeDisplayedElements(data), function(element) {
              return <div>{element}</div>;
            })}</div>
        </div>
      </div>
    )
  }
}
