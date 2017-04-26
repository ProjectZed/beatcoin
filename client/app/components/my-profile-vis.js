import React from 'react';
import {getUserData} from '../server';

export default class MyProfileVis extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.data;
  }
  refresh() {
    getUserData(this.props.id, (userData) => {
      this.setState(userData.info);
    });
  }

  makeDisplayedElement(key) {
    var info = this.state;
    var isDisplayed = info[key][1];
    if (isDisplayed) {
      var displayedText = "Displayed";
      return <div>
        <span>{displayedText}</span>
        <span className="glyphicon glyphicon-remove"></span>
      </div>;
    } else {
      var hiddenText = "Hidden";
      return <div>
        <span>{hiddenText}</span>
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
        <div className="col-md-3 displayed-info">
          <br/>{React.Children.map(this.makeDisplayedElements(data), function(element) {
            return <div>{element}</div>;
          })}</div>
      </div>
    )
  }
}
