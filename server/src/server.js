// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();

var bodyParser = require('body-parser');

var database = require('./database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;

/*Your schemas here!*/

var validate = require('express-jsonschema').validate;

// Support receiving text in HTTP request bodies
app.use(bodyParser.text());
// Support receiving JSON in HTTP request bodies
app.use(bodyParser.json());
// You run the server from `server`, so `../client/build` is `server/../client/build`.
// '..' means "go up one directory", so this translates into `client/build`!
app.use(express.static('../client/build'));

// Reset database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  // This is a debug route, so don't do any validation.
  database.resetDatabase();
  // res.send() sends an empty response with status code 200
  res.send();
});

/**
 * Get the user ID from a token. Returns -1 (an invalid ID)
 * if it fails.
 */
function getUserIdFromToken(authorizationLine) {
  try {
    // Cut off "Bearer " from the header value.
    var token = authorizationLine.slice(7);
    // Convert the base64 string to a UTF-8 string.
    var regularString = new Buffer(token, 'base64').toString('utf8');
    // Convert the UTF-8 string into a JavaScript object.
    var tokenObj = JSON.parse(regularString);
    var id = tokenObj['id'];
    // Check that id is a number.
    if (typeof id === 'number') {
      return id;
    } else {
      // Not a number. Return -1, an invalid ID.
      return -1;
    }
  } catch (e) {
    // Return an invalid ID.
    return -1;
  }
}

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

export function getUserPlaylist(userId, cb) {
  var user = readDocument('users', userId);
  var playList = user.playlists;
  emulateServerReturn(playList, cb);
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

/**
 * Translate JSON Schema Validation failures into error 400s.
 */
app.use(function(err, req, res, next) {
  if (err.name === 'JsonSchemaValidation') {
    // Set a bad request http response status
    res.status(400).end();
  } else {
    // It's some other sort of error; pass it to next error middleware handler
    next(err);
  }
});

// Starts the server on port 3000!
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
