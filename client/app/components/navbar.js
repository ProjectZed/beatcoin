import React from 'react';
import {Link} from 'react-router';
import {getPrivateProfile} from '../server';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beatcoins: 0
    }
    getPrivateProfile(props.currentUserID, (user) => {
      this.state = {
        beatcoins: user.beatcoins
      }
    });
  }

  render() {
    var beatcoins = this.state.beatcoins;
    return (
      <nav className="navbar navbar-fixed-top navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className='navbar-brand' to={'/'}>
              <span className="glyphicon glyphicon-home"></span>
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <form className="navbar-form navbar-left" role="search">
              <div className="input-group">
                <input type="text" className="form-control bc-search" placeholder="Search Beatcoin"></input>
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-default">
                    <span className="glyphicon glyphicon-search"></span>
                  </button>
                </span>
              </div>
            </form>
            <div className="nav navbar-nav navbar-right">
              <div className="btn-toolbar pull-right" role="toolbar">
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-default navbar-btn">
                    <Link to="/redeem">{beatcoins}</Link>
                  </button>
                </div>
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-default navbar-btn">
                    Upload
                  </button>
                </div>
                <div className="btn-group" role="group">
                  <Link to={"/profile/" + this.props.currentUserID} style={{
                    'color': 'white'
                  }}>
                    <button type="button" className="btn btn-default navbar-btn">
                      Profile
                    </button>
                  </Link>
                  <div className="btn-group" role="group">
                    <button type="button" className="btn btn-default dropdown-toggle navbar-btn" data-toggle="dropdown">
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to={'/redeem'}>Redeem Beatcoins</Link>
                      </li>
                      <li>
                        <Link to={'/contact-us'}>Contact Us</Link>
                      </li>
                      <li>
                        <a href="#">Log out</a>
                      </li>
                      <li>
                        <button className="btn btn-default" type="button" onClick={() => {
                          var xhr = new XMLHttpRequest();
                          xhr.open('POST', '/resetdb');
                          xhr.addEventListener('load', function() {
                            window.alert("Database reset! Refreshing the page now...");
                            document.location.reload(false);
                          });
                          xhr.send();
                        }}>Reset Mock DB</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
