import React from 'react';
import {getLoggedInUserId} from '../server';
import {Link} from 'react-router';

export default class DonateButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      data: props.data
    };
  }

  refresh() {
    getLoggedInUserId((userId) => {
      this.setState({userId: userId});
    });
  }

  componentDidMount() {
    this.refresh();
  }

  isViewingOwnProfile() {
    if (this.state) {
      if (this.state.userId == this.props.id)
        return true;
      else
        return false;
      }
    else {
      return false;
    }
  }

  makeButton() {
    if (this.isViewingOwnProfile())
      return (
        <Link to={"/my-profile"}>
          <button type="button" className="donate-button btn btn-default every-button">
            <span className="" styles="width:100%">
              <div style={{
                'color': 'white'
              }}>Edit</div>
            </span>
          </button>
        </Link>
      );
    else
      return (
        <button type="button" className="donate-button btn btn-default every-button">
          <span className="" styles="width:100%">
            Donate
          </span>
        </button>

      );
    }

  render() {
    return (
      <div>
        {this.makeButton()}
      </div>
    )
  }
}
