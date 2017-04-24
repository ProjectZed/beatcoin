import React from 'react';

export default class ContactInformation extends React.Component {
  render() {
    return (
      <div className="information">
        <span>+1 (123) 456 - 7890</span>
        <br/>
        <span>123 Street St</span>
        <br/>
        <span>Amherst, MA</span>
        <br/>
        <span>01002</span>
        <br/>
        <span>beatcoin@beatcoin.com</span>
      </div>
    )
  }
}
