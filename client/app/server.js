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

///users/1/playlists
  export function getGenreLists(cb) {
    sendXHR('GET', '/users/1/playlists', undefined, (xhr) => {
      cb(JSON.parse(xhr.responseText));
    });
  }

///users/:userid/favorites
  export function getUserFavList(userId, cb) {
    sendXHR('GET', '/users/' + userId + '/favorites', undefined, (xhr) => {
      cb(JSON.parse(xhr.responseText));
    });
  }

  export function getUserPlaylist(userId, cb) {
    var user = readDocument('users', userId);
    var playList = user.playlists;
    emulateServerReturn(playList, cb);
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

  export function getUserComments(userId, cb) {
    var user = readDocument('users', userId);
    var comments = user.comments;
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

  export function updateProfile(profile, cb) {
    getLoggedInUserId((userId) => {
      getUserData(userId, (user) => {
        user.info = profile;
        writeDocument('users', user);
        emulateServerReturn(profile, cb);
      });
    });
  }

  export function getUserData(userId, cb) {
    // Get the User object with the id "user".
    var userData = readDocument('users', userId);

    emulateServerReturn(userData, cb);
  }

  export function getPublicProfile(userId, cb) {
    var userData = readDocument('users', userId);
    delete userData.beatcoins;
    delete userData.balance;
    delete userData.token;
    delete userData.likes;
    if (userData.info.nickname[1] === false) {
      delete userData.info.nickname
    }
    if (userData.info.birthday[1] === false) {
      delete userData.info.birthday
    }
    if (userData.info.gender[1] === false) {
      delete userData.info.gender
    }
    if (userData.info.location[1] === false) {
      delete userData.info.location
    }
    if (userData.info.contactAgent[1] === false) {
      delete userData.info.contactAgent
    }
    if (userData.info.education[1] === false) {
      delete userData.info.education
    }

    emulateServerReturn(userData, cb);
  }

  export function getUploadedSongs(userId, cb) {
    // Get the User object with the id "user".
    var user = readDocument('users', userId);
    var uploadIds = user['uploads'];
    var uploadedSongs = uploadIds.map((uploadId) => readDocument('songs', uploadId));

    emulateServerReturn(uploadedSongs, cb);
  }

  //new Buffer(JSON.stringify({ id: 2 })).toString('base64');
  var token = 'eyJpZCI6Mn0=';

  function sendXHR(verb, resource, body, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open(verb, resource);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);

    // The below comment tells ESLint that FacebookError is a global.
    // Otherwise, ESLint would complain about it! (See what happens in Atom if
    // you remove the comment...)
    /* global FacebookError */

    // Response received from server. It could be a failure, though!
    xhr.addEventListener('load', function() {
      var statusCode = xhr.status;
      var statusText = xhr.statusText;
      if (statusCode >= 200 && statusCode < 300) {
        // Success: Status code is in the [200, 300) range.
        // Call the callback with the final XHR object.
        cb(xhr);
      } else {
        // Client or server error.
        // The server may have included some response text with details concerning
        // the error.
        var responseText = xhr.responseText;
        FacebookError('Could not ' + verb + " " + resource + ": Received " + statusCode + " " + statusText + ": " + responseText);
      }
    });

    // Time out the request if it takes longer than 10,000
    // milliseconds (10 seconds)
    xhr.timeout = 10000;

    // Network failure: Could not connect to server.
    xhr.addEventListener('error', function() {
      FacebookError('Could not ' + verb + " " + resource + ": Could not connect to the server.");
    });

    // Network failure: request took too long to complete.
    xhr.addEventListener('timeout', function() {
      FacebookError('Could not ' + verb + " " + resource + ": Request timed out.");
    });

    switch (typeof(body)) {
      case 'undefined':
        // No body to send.
        xhr.send();
        break;
      case 'string':
        // Tell the server we are sending text.
        xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        xhr.send(body);
        break;
      case 'object':
        // Tell the server we are sending JSON.
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // Convert body into a JSON string.
        xhr.send(JSON.stringify(body));
        break;
      default:
        throw new Error('Unknown body type: ' + typeof(body));
    }
  }
