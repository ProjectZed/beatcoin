import React from 'react';
import {getUserData} from '../server';

export default class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  refresh() {
    getUserData(this.props.id, (userData) => {
      this.setState(userData.info);
    });
  }
 
  componentDidMount() {
    this.refresh();
  }

  makeElement(key) {
    var info = this.state;
    var namesDict = {
      'birthday': 'Birthday',
      'gender': 'Gender',
      'location': 'Location',
      'contactAgent': 'Contact Agent',
      'education': 'Education'
    };

    var name = namesDict[key];
    var value = info[key][0];
    var isDisplayed = info[key][1];
    if (isDisplayed) {
      return <li>
        <p style={{
          'textAlign': 'left'
        }}>
          <b>{name}</b>
          <span style={{
            'float': 'right'
          }}>{value}</span>
        </p>
      </li>;
    } else {
      return <div></div>;
    }
  }

  makeElements(info) {
    var elements = [];
    for (var key in info) {
      elements.push(this.makeElement(key));
    }
    return elements;
  }

  render() {
    var info = this.state;

    return (
      <div>
        <div className="panel box">
          <div className="panel-body">
            <ul className="user-info-list" style={{
              'paddingLeft': '0'
            }}>
              {React.Children.map(this.makeElements(info), function(element) {
                return <div>{element}</div>;
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
