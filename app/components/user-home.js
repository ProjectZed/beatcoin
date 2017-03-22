import React from 'react';

import PreferredPlaylist from './preferred-playlist.js';
import Playlist from './playlist.js';

export default class UserHome extends React.Component {
  render() {
    return (
      // main thing -->
      <div className="container panelstyle">
        <div className = "row"> //overall row -->

              //left empty column -->
              <div className = "col-md-1">
              </div>

              <div className = "col-md-10"> // overall column -->

                //The row for User Preferred Playlist -->
                <PreferredPlaylist pic = "img/user-home/Playlist.jpg"></PreferredPlaylist>

                 // end of row for User Preferred Playlist -->

                // Row for the first line of categories -->
                <div className = "row everything">

                <Playlist pic = "img/user-home/Jazz.jpg" listname = "Jazz"></Playlist>
                <Playlist pic = "img/user-home/Folk.jpg" listname = "Folk"></Playlist>
                <Playlist pic = "img/user-home/Rock.jpg" listname = "Rock"></Playlist>
                <Playlist pic = "img/user-home/Blues.jpg" listname = "Blues"></Playlist>


                </div> // End of the first line of categories -->

                // Row for the second line of categories -->
                <div className = "row everything">
                  <Playlist pic = "img/user-home/Funk.jpg" listname = "Funk"></Playlist>
                  <Playlist pic = "img/user-home/Country.jpg" listname = "Country"></Playlist>
                  <Playlist pic = "img/user-home/Pop.jpg" listname = "Pop"></Playlist>
                  <Playlist pic = "img/user-home/RnB.jpg" listname = "RnB"></Playlist>

                </div> // End of the second line of categories -->

                // Row for the third line of categories -->
                <div className = "row everything">
                  <Playlist pic = "img/user-home/Hiphop.jpg" listname = "Hip Hop"></Playlist>
                  <Playlist pic = "img/user-home/Rapping.jpg" listname = "Rapping"></Playlist>
                  <Playlist pic = "img/user-home/Reggae.jpg" listname = "Reggae"></Playlist>
                  <Playlist pic = "img/user-home/Punk.jpg" listname = "Punk"></Playlist>

                </div> // End of the third line of categories -->

                // Row for the fourth line of categories -->
                <div className = "row">
                  <Playlist pic = "img/user-home/Instrumental.jpg" listname = "Instrumental"></Playlist>
                  <Playlist pic = "img/user-home/EDM.jpg" listname = "EDM"></Playlist>
                  <Playlist pic = "img/user-home/classNameical.jpg" listname = "classNameical"></Playlist>
                  <Playlist pic = "img/user-home/Acapella.jpg" listname = "Acapella"></Playlist>

                </div> // End of the fourth line of categories -->

              </div> // end of overall column -->

              // right empty column -->
              <div className = "col-md-1">
              </div>

        </div> // end of overall row -->
      </div> // end of container -->

    );
  }
}
