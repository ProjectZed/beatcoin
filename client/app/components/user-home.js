import React from 'react';

import PreferredPlaylist from './preferred-playlist.js';
import Playlist from './playlist.js';

import {getGenreLists} from '../server';
import {getUserFavList} from '../server';

export default class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.currentUserID,
      genreList: [],
      userFavList: [],
      setPlaylist: props.setPlaylist
    };

    getGenreLists((genreList) => {
      getUserFavList(this.state.userId, (userFavList) => {
        this.setState({genreList: genreList, userFavList: userFavList});
      });
    });
  }

  render() {
    var genreList = this.state.genreList;
    var playLists = [];
    for (var i = 0; i < (genreList.length); i++) {
      playLists.push(
        <Playlist index={i} setPlaylist={this.props.setPlaylist} genreInfo={genreList[i]} key={genreList[i]._id}></Playlist>
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
    )
  }
}
