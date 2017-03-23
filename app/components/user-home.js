import React from 'react';

import PreferredPlaylist from './preferred-playlist.js';
import Playlist from './playlist.js';

export default class UserHome extends React.Component {
  render() {
    return (
      // main thing -->
      <div className="container panelstyle">
        <div className = "row">


              <div className = "col-md-1">
              </div>

              <div className = "col-md-10">


                <PreferredPlaylist pic = "img/user-home/Playlist.jpg"></PreferredPlaylist>




                <div className = "row everything">

                <Playlist pic = "img/user-home/Jazz.jpg" listname = "Jazz"></Playlist>
                <Playlist pic = "img/user-home/Folk.jpg" listname = "Folk"></Playlist>
                <Playlist pic = "img/user-home/Rock.jpg" listname = "Rock"></Playlist>
                <Playlist pic = "img/user-home/Blues.jpg" listname = "Blues"></Playlist>


                </div>


                <div className = "row everything">
                  <Playlist pic = "img/user-home/Funk.jpg" listname = "Funk"></Playlist>
                  <Playlist pic = "img/user-home/Country.jpg" listname = "Country"></Playlist>
                  <Playlist pic = "img/user-home/Pop.jpg" listname = "Pop"></Playlist>
                  <Playlist pic = "img/user-home/RnB.jpg" listname = "RnB"></Playlist>

                </div>


                <div className = "row everything">
                  <Playlist pic = "img/user-home/Hiphop.jpg" listname = "Hip Hop"></Playlist>
                  <Playlist pic = "img/user-home/Rapping.jpg" listname = "Rapping"></Playlist>
                  <Playlist pic = "img/user-home/Reggae.jpg" listname = "Reggae"></Playlist>
                  <Playlist pic = "img/user-home/Punk.jpg" listname = "Punk"></Playlist>

                </div>


                <div className = "row">
                  <Playlist pic = "img/user-home/Instrumental.png" listname = "Instrumental"></Playlist>
                  <Playlist pic = "img/user-home/EDM.jpg" listname = "EDM"></Playlist>
                  <Playlist pic = "img/user-home/Classical.jpg" listname = "Classical"></Playlist>
                  <Playlist pic = "img/user-home/Acapella.jpg" listname = "Acapella"></Playlist>

                </div>

              </div>


              <div className = "col-md-1">
              </div>

        </div>
      </div> 

    );
  }
}
