  import {
    readDocument,
    writeDocument,
    addDocument
  } from './database.js';

  /**
   * Emulates how a REST call is *asynchronous* -- it calls your function back
   * some time in the future with data.
   */
  function emulateServerReturn(data, cb) {
    setTimeout(() => {
      cb(data);
    }, 4);
  }

  export function getLoggedInUserId(cb) {
    emulateServerReturn("2", cb);
  }

  export function getGenreLists(cb) {
    var beatcoin = readDocument('users', "1");
    var genreList = beatcoin.playlists;
    emulateServerReturn(genreList, cb);
  }

  export function getUserFavList(cb) {
    getLoggedInUserId((userId) => {
      var user = readDocument('users', userId);
      var favList = user.favorites;
      if (favList !== null) {
        favList = favList.map((genreId) => {
          return getPlaylistSync(1, genreId);
        });
        favList = favList.map((object) => {
          return object.songs;
        });
        favList = [].concat.apply([], favList);
        favList = favList.sort((a, b) => {
          b.uploadDate - a.uploadDate
        });
        emulateServerReturn(favList, cb);
      }
    });
  }

  export function playlistClicked(userId, listId, cb) {
    if (userId === "1") {
      var user = readDocument('users', userId);
      var playlist = user.playlists[listId];
      var songs = playlist.songs;
      songs = songs.sort((a, b) => {
        b.uploadDate - a.uploadDate
      });
      var actualSongs = songs.map((songId) => {
        return getSong(songId)
      });
      emulateServerReturn(actualSongs, cb);

    } else {
      getLoggedInUserId((userId) => {
        var user = readDocument('users', userId);
        var songs = user.favorites;
        songs = songs.sort((a, b) => {
          b.uploadDate - a.uploadDate
        });
        var actualSongs = songs.map((songId) => {
          return getSong(songId)
        });
        emulateServerReturn(actualSongs, cb);
      });
    }
  }

  export function getSongComments(songId, cb) {
    var song = readDocument('songs', songId);
    var comments = song.comments;
    comments = comments.map((commentId) => readDocument('comments', commentId));
    comments.forEach((comment) => {
      comment.author = readDocument('users', comment.author);
    });
    emulateServerReturn(comments, cb);
  }

  function getSong(songId) {
    var song = readDocument('songs', songId);
    song.uploader = readDocument('users', song.uploader);
    return song;
  }

  function getPlaylistSync(userId, playlistId) {
    var user = readDocument('users', userId);
    var playlist = user.playlists[playlistId];
    var songs = playlist.songs;
    songs = songs.map((songId) => {
      return getSong(songId)
    });
    playlist.songs = songs;
    return playlist;
  }

  export function getPlaylist(userId, playlistId, cb) {
    var user = readDocument('users', userId);
    var playlist = user.playlists[playlistId];
    var songs = playlist.songs;
    songs = songs.map((songId) => {
      return getSong(songId)
    });
    playlist.songs = songs;
    emulateServerReturn(playlist, cb);
  }

  export function likeComment(userId, commentId, cb) {
    var comment = readDocument('comments', commentId);
    comment.likes.push(userId);
    writeDocument('comments', comment);
    comment.author = readDocument('users', comment.author);
    emulateServerReturn(comment, cb);
  }

  export function dislikeComment(userId, commentId, cb) {
    var comment = readDocument('comments', commentId);
    var index = comment.likes.indexOf(userId);
    if (index !== -1) {
      comment.likes.splice(index, 1);
      writeDocument('comments', comment);
    }
    comment.author = readDocument('users', comment.author);
    emulateServerReturn(comment, cb);
  }

  export function postUserComment(posterId, userId, message, cb) {
    var comment = {
      "author": posterId,
      "text": message,
      "postDate": new Date().getTime(),
      "likes": []
    }
    comment = addDocument('comments', comment);
    comment.author = readDocument('users', comment.author);
    var user = readDocument('users', userId);
    user.comments.push(comment._id);
    writeDocument('users', user);
    emulateServerReturn(comment, cb);
  }

  export function postSongComment(songId, message, cb) {
    getLoggedInUserId((userId) => {
      var comment = {
        "author": userId,
        "text": message,
        "postDate": new Date().getTime(),
        "likes": []
      }
      comment = addDocument('comments', comment);
      comment.author = readDocument('users', comment.author);
      var song = readDocument('songs', songId);
      song.comments.push(comment._id);
      writeDocument('songs', song);
      emulateServerReturn(comment, cb);
    });
  }

  export function likeSong(userId, songId, cb) {
    var song = readDocument('songs', songId);
    song.likes.push(userId);
    writeDocument('songs', song);
    song.uploader = readDocument('users', song.uploader);
    emulateServerReturn(song, cb);
  }

  export function dislikeSong(userId, songId, cb) {
    var song = readDocument('songs', songId);
    var index = song.likes.indexOf(userId);
    if (index !== -1) {
      song.likes.splice(index, 1);
      writeDocument('songs', song);
    }
    song.uploader = readDocument('users', song.uploader);
    emulateServerReturn(song, cb);
  }

  export function updateDisplayInfo(displayInfo, cb) {
    getLoggedInUserId((userId) => {
      getUserData(userId, (user) => {
        user.info.displayed = displayInfo;
        writeDocument('users', user);
        emulateServerReturn(displayInfo, cb);
      });
    });
  }

  export function getUserData(userId, cb) {
    // Get the User object with the id "user".
    var userData = readDocument('users', userId);

    emulateServerReturn(userData, cb);
  }

  export function getUploadedSongs(userId, cb) {
    // Get the User object with the id "user".
    var user = readDocument('users', userId);
    var uploadIds = user['uploads'];
    var uploadedSongs = uploadIds.map((uploadId) => readDocument('songs', uploadId));

    emulateServerReturn(uploadedSongs, cb);
  }
