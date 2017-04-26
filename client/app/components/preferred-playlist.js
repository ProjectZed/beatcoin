import React from 'react';

export default class PreferredPlaylist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      favListInfo: this.props.favListInfo,
      setPlaylist: this.props.setPlaylist
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.state.setPlaylist(this.state.favListInfo);
  }

  render() {
    var image = <img className="img-big" src="img/user-home/Playlist.jpg" alt=""/>
    if (this.state.favListInfo.length > 0) {
      image = <img className="img-big" src={this.state.favListInfo[0].cover} alt=""/>
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="relative">
            <a href="#" onClick={(e) => this.onClick(e)}>
              {image}
              <p className="playlist-text">User Preferred Playlist</p>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
