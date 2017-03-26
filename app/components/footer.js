import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
          <nav className="navbar navbar-fixed-bottom navbar-default">
            <div className="container">
              <div className="navbar navbar-static-top">
              <div className="navbar-left">
                  <div className="btn-group" role="group">
                    <button type="button" className="btn btn-default navbar-btn">
                      <span className="glyphicon glyphicon-fast-backward"></span>
                    </button>
                    <button type="button" className="btn btn-default navbar-btn">
                      <span className="glyphicon glyphicon-play-circle"></span>
                    </button>
                    <button type="button" className="btn btn-default navbar-btn">
                      <span className="glyphicon glyphicon-fast-forward"></span>
                    </button>
                  </div>
                </div>
            <div className="navbar-inner" style="display: inline-block;">
            <div className="nav navbar-text progress" style="width: 500px; margin-top:15px">
                      <div className="bar" style="width: 50%;"></div>
                  </div>
                  <p className="nav navbar-text">this.props.SongTime</p>
            <button type="button" className="btn btn-default navbar-btn">
                    <span className="glyphicon glyphicon-repeat"></span>
                  </button>
            <button type="button" className="btn btn-default navbar-btn">
                    <span className="glyphicon glyphicon-volume-down"></span>
                  </button>
            </div>
                <div className="nav navbar-nav navbar-right">
            <div className="comments-image song-pic"></div>
                  <p className="nav navbar-text" style="margin-top:10px">this.props.SongName<br></br>this.props.ArtistName</p>
                  <button type="button" className="btn btn-default navbar-btn">
                    <span className="glyphicon glyphicon-thumbs-up"></span>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )
    }
}
