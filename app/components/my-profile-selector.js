import React from 'react';

export default class MyProfileSelector extends React.Component {
    render() {
        return (
            <div>
              <div className="row selector-col">
                  <b>
              <button className="row selector-button">
                  General
              </button>
              <button className="row selector-button">
                  Listening Preferences
              </button>
              <button className="row selector-button">
                  Songs
              </button>
              <button className="row selector-button">
                  Favorites
              </button>
              <button className="row selector-button">
                  Redeem
              </button>
            </b>
              </div>
            </div>
        )
    }
}
