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
var CommentSchema = require('./schemas/comment.json');
var InfoSchema = require('./schemas/info.json');
var SongSchema = require('./schemas/song.json');

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

//getUserPlaylists
//note that playlists are all public, so we don't need to add auth here
app.get('/users/:userid/playlists', function(req, res) {
  var userId = req.params.userid;
  var user = readDocument('users', userId);
  var playlists = user.playlists;
  res.send(playlists);
});

app.get('/users/:userid/playlist/:playlistid', function(req, res) {
  var userId = req.params.userid;
  var playlistId = req.params.playlistid;
  var user = readDocument('users', userId);
  var playlist = user.playlists[playlistId];
  var songs = playlist.songs;
  songs = songs.map((songId) => {
    return getSong(songId)
  });
  playlist.songs = songs;
  res.send(playlist);
});

// getSongComments
// note that comments are all public, so we don't need to add auth here
app.get('/songs/:songid/comments', function(req, res) {
  var songid = req.params.songid;
  var song = readDocument('songs', songid);
  var comments = song.comments;
  comments = comments.map((commentId) => readDocument('comments', commentId));
  comments.forEach((comment) => {
    comment.author = readDocument('users', comment.author);
  });
  res.send(comments);
});

function postSongComment(authorId, songId, text, cb) {
  try {
    var song = readDocument('songs', songId);
    var newComment = {
      "author": authorId,
      "text": text,
      "postDate": new Date().getTime(),
      "likes": []
    };
    newComment = addDocument('comments', newComment);
    newComment.author = readDocument('users', newComment.author);
    song.comments.push(newComment._id);
    writeDocument('songs', song);
    cb(null, newComment);
  } catch (err) {
    cb(err);
  }
}

// postSongComment
app.post('/songs/:songid/comments', validate({
  body: CommentSchema
}), function(req, res) {
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var songId = req.params.songid;
  if (fromUser === body.author) {
    postSongComment(fromUser, songId, body.text, function(err, newComment) {
      if (err) {
        res.status(500).send("A database error occurred: " + err);
      } else {
        res.status(201);
        res.set('Location', '/songs/' + songId);
        res.send(newComment);
      }
    });
  } else {
    res.status(401).end();
  }
});

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

function putSong(authorId, songTitle, songLyrics, songDescription, songGenre, songRewards, cb) {
  try {
    var user = readDocument('users', authorId);
    var newSong = {
      "title": songTitle,
      "genre": songGenre,
      "uploader": authorId,
      "price": songRewards,
      "plays": 0,
      "audio": "audio/star-spangled-banner.mp3",
      "cover": "img/songs/covers/star-spangled-banner.jpg",
      "lyrics": songLyrics,
      "description": songDescription,
      "uploadDate": new Date().getTime(),
      "likes": [],
      "comments": []
    };
    newSong = addDocument('songs', newSong);
    user.uploads.push(newSong._id);
    writeDocument('users', user);
    newSong.uploader = readDocument('users', authorId);
    cb(null, newSong);
  } catch (err) {
    cb(err);
  }
}

app.put('/users/:userid/uploads', validate({
  body: SongSchema
}), function(req, res) {
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userId = req.params.userid;
  var useridNumber = parseInt(userId, 10);
  if (fromUser === useridNumber) {
    putSong(fromUser, body.title, body.lyrics, body.description, body.genre, body.rewards, (err, song) => {
      if (err) {
        res.status(500).send("A database error occurred: " + err);
      } else {
        res.send(song);
      }
    })
  } else {
    res.status(401).end();
  }
});

app.put('/comments/:commentid/likes/:userid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var commentId = req.params.commentid;
  var userId = req.params.userid;
  var useridNumber = parseInt(userId, 10);
  if (fromUser === useridNumber) {
    var comment = readDocument('comments', commentId);
    if (comment.likes.indexOf(useridNumber) == -1) {
      comment.likes.push(useridNumber);
      writeDocument('comments', comment);
    }
    comment.author = readDocument('users', comment.author);
    res.send(comment);
  } else {
    res.status(401).end();
  }
});

app.delete('/comments/:commentid/likes/:userid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var commentId = req.params.commentid;
  var userId = req.params.userid;
  var useridNumber = parseInt(userId, 10);
  if (fromUser === useridNumber) {
    var comment = readDocument('comments', commentId);
    var index = comment.likes.indexOf(useridNumber);
    if (index !== -1) {
      comment.likes.splice(index, 1);
      writeDocument('comments', comment);
    }
    comment.author = readDocument('users', comment.author);
    res.send(comment);
  } else {
    res.status(401).end();
  }
});

function postUserComment(authorId, userId, text, cb) {
  try {
    var user = readDocument('users', userId);
    var newComment = {
      "author": authorId,
      "text": text,
      "postDate": new Date().getTime(),
      "likes": []
    };
    newComment = addDocument('comments', newComment);
    newComment.author = readDocument('users', newComment.author);
    user.comments.push(newComment._id);
    writeDocument('users', user);
    cb(null, newComment);
  } catch (err) {
    cb(err);
  }
}

app.post('/users/:userid/comments', validate({
  body: CommentSchema
}), function(req, res) {
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var toUser = req.params.userid;
  if (fromUser === body.author) {
    postUserComment(fromUser, toUser, body.text, function(err, newComment) {
      if (err) {
        res.status(500).send("A database error occurred: " + err);
      } else {
        res.status(201);
        res.set('Location', '/users/' + toUser);
        res.send(newComment);
      }
    });
  } else {
    res.status(401).end();
  }
});

app.put('/songs/:songid/likes/:userid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var songId = req.params.songid;
  var userId = req.params.userid;
  var useridNumber = parseInt(userId, 10);
  if (fromUser === useridNumber) {
    var song = readDocument('songs', songId);
    if (song.likes.indexOf(useridNumber) == -1) {
      song.likes.push(useridNumber);
      writeDocument('songs', song);
    }
    song.uploader = readDocument('users', song.uploader);
    res.send(song);
  } else {
    res.status(401).end();
  }
});

app.delete('/songs/:songid/likes/:userid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var songId = req.params.songid;
  var userId = req.params.userid;
  var useridNumber = parseInt(userId, 10);
  if (fromUser === useridNumber) {
    var song = readDocument('songs', songId);
    var index = song.likes.indexOf(useridNumber);
    if (index !== -1) {
      song.likes.splice(index, 1);
      writeDocument('songs', song);
    }
    song.uploader = readDocument('users', song.uploader);
    res.send(song);
  } else {
    res.status(401).end();
  }
});

// Update User info
app.post('/users/:userid/info', validate({
  body: InfoSchema
}), function(req, res) {
  var body = req.body;
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var useridNumber = parseInt(userid, 10);
  if (fromUser === useridNumber) {
    var user = readDocument('users', userid);
    user.info = body;
    writeDocument('users', user);
    res.send(user);
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
  var uploadedSongs = readDocument('users', userId)['uploads'].map((uploadId) => readDocument('songs', uploadId));
  res.send(uploadedSongs);
});

app.get('/redeemables', function(req, res) {
  res.send(readDocument('redeemables', 'active'));
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

// Starts the server on port 3000!
var server = app.listen(3000, function() {
  console.log('Beatcoin server listening on port 3000!');
});

module.exports = server;
