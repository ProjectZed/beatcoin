import React from 'react';
import {getUserPlaylist} from '../server';
import Playlist from './playlist';

export default class PlaylistList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      playList: []
    };
    getUserPlaylist(this.state.userId, (list) => {
      this.setState({playList: list});
    })
  }

  componentWillReceiveProps(nextProps) {
    getUserPlaylist(nextProps.userId, (list) => {
      this.setState({userId: nextProps.userId, playList: list});
    })
  }

  render() {
    var list = this.state.playList;
    var playLists = [];
    for (var i = 0; i < (list.length); i++) {
      playLists.push(
        <Playlist setPlaylist={this.props.setPlaylist} genreInfo={list[i]} key={list[i]._id}></Playlist>
      );
    }

    var rows = [];
    for (var j = 0; j < (playLists.length / 4); j++) {
      rows.push([]);
      for (var k = 0; k < 4; k++) {
        if ((4 * j + k) < playLists.length) {
          rows[j].push(playLists[4 * j + k]);
        }
      }
    }

    return (
      <div>
        {rows.map((child) => {
          return (
            <div className="row" key={rows.indexOf(child)}>
              {child}
            </div>
          )
        })}
      </div>
    );
  }
}