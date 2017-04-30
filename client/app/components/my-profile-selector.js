import React from 'react';
import {Link} from 'react-router';

export default class MyProfileSelector extends React.Component {
  render() {
    return (
      <div>
        <div className="row selector-col">
          <b>
            <button className="row selector-button">
              <Link to="/my-profile">General</Link>
            </button>
            <button className="row selector-button">
              <Link to="/redeem">
                Redeem
              </Link>
            </button>
          </b>
        </div>
      </div>
    )
  }
}
