import React from 'react';
import {getLoggedInUserId, getUserData} from '../server';
import Playlist from './playlist';

export default class PlaylistList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      data: props
    };
  }

  refresh() {
    getLoggedInUserId((userId) => {
      this.setState({userId: userId});

      getUserData(userId, (user) => {
        this.setState({user: user});
      });
    });
  }

  componentDidMount() {
    this.refresh();
  }

  makePlaylist(i) {
    var playlists = this.state.user["playlists"];
    return <Playlist setPlaylist={this.state.data.setPlaylist} genreInfo={playlists[i]} key={playlists[i]._id}></Playlist>;
  }

  getPlaylists() {
    if (this.state.user) {
      var playlists = this.state.user["playlists"];

      var elements = [];
      for (var key in playlists) {
        elements.push(this.makePlaylist(key));
      }
      return elements;
    } else {
      return [];
    }
  }

  // handleClick(e) {
  // 	e.preventDefault();
  // 	var list = e.target.listname;
  // 	this.props.onCall(1, list);
  // }

  render() {
    return (
      <div>
        {React.Children.map(this.getPlaylists(), function(playlist) {
          return (
            <div>{playlist}</div>
          );
        })}
      </div>
    );
  }
}
