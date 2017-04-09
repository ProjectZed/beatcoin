import React from 'react';
import {getUserData} from '../server';
import Playlist from './playlist';

export default class PlaylistList extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  refresh() {
    getUserData(this.props.id, (user) => {
      this.setState({user: user});
    });
  }

  componentDidMount() {
    this.refresh();
  }

  makePlaylist(key) {
    var playlists = this.state.user["playlists"];
    var name = playlists[key]["name"];
    var cover = playlists[key]["cover"];
    return <Playlist pic={cover} listname={name}></Playlist>;
  }

  getPlaylists() {
    if (this.state) {
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
