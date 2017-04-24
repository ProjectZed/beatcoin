import React from 'react';

export default class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: props.profile
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({profile: nextProps.profile});
  }

  makeElements(info) {
    var elements = [];
    var namesDict = {
      'nickname': 'Nickname',
      'birthday': 'Birthday',
      'gender': 'Gender',
      'location': 'Location',
      'contactAgent': 'Contact Agent',
      'education': 'Education'
    };
    for (var key in info) {
      var name = namesDict[key];
      var value = info[key];
      elements.push(
        <li>
          <p style={{
            'textAlign': 'left'
          }}>
            <b>{name}</b>
            <span style={{
              'float': 'right'
            }}>{value[0]}</span>
          </p>
        </li>
      );
    }
    return elements;
  }

  render() {
    var info = this.makeElements(this.state.profile);
    info.map((i) => { < div > {
        i
      } < /div>});
    return (
      <div>
        <div className="panel box">
          <div className="panel-body">
            <ul className="user-info-list" style={{
              'paddingLeft': '0'
            }}>
              {info}
            </ul > </div> < /div>
      </div >)}
  }
