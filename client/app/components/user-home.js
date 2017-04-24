import React from 'react';

import PreferredPlaylist from './preferred-playlist.js';
import Playlist from './playlist.js';

import {getLoggedInUserId} from '../server';
import {getGenreLists} from '../server';
import {getUserFavList} from '../server';

export default class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      genreList: [],
      userFavList: [],
      setPlaylist: this.props.setPlaylist
    };
    getLoggedInUserId((userId) => {
      this.setState({user: userId});
    })

    getGenreLists((genreList) => {
      this.setState({genreList: genreList});
    })

    getUserFavList(this.state.user, (userFavList) => {
      this.setState({userFavList: userFavList});
    })
  }

  render() {
    var genreList = this.state.genreList;
    var playLists = [];
    for (var i = 0; i < (genreList.length); i++) {
      playLists.push(
        <Playlist setPlaylist={this.props.setPlaylist} genreInfo={genreList[i]} key={genreList[i]._id}></Playlist>
      );
    }

    var rows = [];
    for (var j = 0; j < (genreList.length / 4); j++) {
      rows.push([]);
      for (var k = 0; k < 4; k++) {
        if ((4 * j + k) < genreList.length) {
          rows[j].push(playLists[4 * j + k]);
        }
      }
    }

    var preferredPlaylist = <div></div>
    if (this.state.userFavList.length > 0) {
      preferredPlaylist = <PreferredPlaylist pic={this.state.userFavList[0].cover} setPlaylist={this.props.setPlaylist} favListInfo={this.state.userFavList} key={this.state.userFavList[0]._id}></PreferredPlaylist>
    }

    return (
      <div>
        <section id="userhome">
          <div className="container panelstyle">
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-10">
                {preferredPlaylist}
                {rows.map((child) => {
                  return (
                    <div className="row" key={rows.indexOf(child)}>
                      {child}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
