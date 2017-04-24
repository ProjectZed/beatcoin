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


//getUserFavList
app.get('/users/:userid/favorites', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var useridNumber = parseInt(userid, 10);
  if (fromUser === useridNumber) {
      var user = readDocument('users', userid);
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
      }
    res.send(favList);
  } else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});


//getUserPlaylist
//note that playlists are all public, so we don't need to add auth here
app.get('/users/:userid/playlists', function(req, res) {
  var userId = req.params.userid;
  var user = readDocument('users', userId);
  var playlists = user.playlists;
  res.send(playlists);
});

export function getSongComments(songId, cb) {
  var song = readDocument('songs', songId);
  var comments = song.comments;
  comments = comments.map((commentId) => readDocument('comments', commentId));
  comments.forEach((comment) => {
    comment.author = readDocument('users', comment.author);
  });
  emulateServerReturn(comments, cb);
}


//getUserComments
//note that comments are all public, so we don't need to add auth here
app.get('/users/:userid/comments', function(req, res) {
  var userId = req.params.userid;
  var user = readDocument('users', userId);
  var comments = user.comments;
  comments = comments.map((commentId) => readDocument('comments', commentId));
  comments.forEach((comment) => {
    comment.author = readDocument('users', comment.author);
  });
  res.send(comments);
});


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

//getUserFavList
app.get('/users/:userid/data', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var useridNumber = parseInt(userid, 10);
  if (fromUser === useridNumber) {
      var user = readDocument('users', userid);
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
      }
    res.send(favList);
  } else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});

//getUserData
app.get('/users/:userid/private', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var useridNumber = parseInt(userid, 10);
  if (fromUser === useridNumber) {
    var user = readDocument('users', userid);
    res.send(user);
  } else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});

//getPublicProfile
//note that comments are all public, so we don't need to add auth here
app.get('/users/:userid/public', function(req, res) {
  var userId = req.params.userid;
  var userData = readDocument('users', userId);

  //remove all private information so it won't be returned
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

  res.send(userData);
});


//getUploadedSongs
//note that uploaded songs are all public, so we don't need to add auth here
app.get('/users/:userid/uploads', function(req, res) {
  var userId = req.params.userid;
  var user = readDocument('users', userId);
  var uploadIds = user['uploads'];
  var uploadedSongs = uploadIds.map((uploadId) => readDocument('songs', uploadId));
  res.send(uploadedSongs);
});

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

app.get('/redeemables', function(req, res) {
  var items = [];
  items.push(readDocument('redeemables', 1));
  items.push(readDocument('redeemables', 2));
  items.push(readDocument('redeemables', 3));
  items.push(readDocument('redeemables', 4));
  res.send(items);
}

// Starts the server on port 3000!
app.listen(3000, function () {
  console.log('Beatcoin server listening on port 3000!');
});
