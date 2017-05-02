// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();

var bodyParser = require('body-parser');

var ResetDatabase = require('./resetdatabase');

/*Your schemas here!*/
var validate = require('express-jsonschema').validate;
var CommentSchema = require('./schemas/comment.json');
var InfoSchema = require('./schemas/info.json');
var SongSchema = require('./schemas/song.json');

var mongo_express = require('mongo-express/lib/middleware');
// Import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');
var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/beatcoin';

MongoClient.connect(url, function(err, db) {
  // Support receiving text in HTTP request bodies
  app.use(bodyParser.text());
  // Support receiving JSON in HTTP request bodies
  app.use(bodyParser.json());
  // You run the server from `server`, so `../client/build` is `server/../client/build`.
  // '..' means "go up one directory", so this translates into `client/build`!
  app.use(express.static('../client/build'));
  // Support mongo express
  app.use('/mongo_express', mongo_express(mongo_express_config));


  // Reset database.
  app.post('/resetdb', function(req, res) {
    console.log("Resetting database...");
    ResetDatabase(db, function() {
      res.send();
    })
  });

  /**
   * Get the user ID from a token. Returns "" (an invalid ID) if it fails.
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
      // Check that id is a string.
      if (typeof id === 'string') {
        return id;
      } else {
        // Not a number. Return "", an invalid ID.
        return "";
      }
    } catch (e) {
      // Return an invalid ID.
      return "";
    }
  }

  function sendDatabaseError(res, err) {
    res.status(500).send("A database error occurred: " + err);
  }

  //getUserFavList
  app.get('/users/:userid/favorites', function(req, res) {
    var userId = req.params.userid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if (fromUser === userId) {
      db.collection('users').findOne({
        _id: new ObjectID(userId)
      }, function(err, userObject) {
        if (err) {
          return sendDatabaseError(res, err);
        } else if (userObject === null) {
          res.status(400).send("Could not find user: " + userId);
        } else {
          var favList = userObject.favorites;
          if (favList !== null) {

            //then get the list of lists of songs for the genres
            db.collection('users').findOne({
              _id: new ObjectID("000000000000000000000001")
            }, function(err, user1) {
              if (err) {
                return sendDatabaseError(res, err);
              } else {

                var songIds = favList.map((genreId) => {
                  return user1.playlists[parseInt(genreId)].songs;
                });
                songIds = [].concat.apply([], songIds); //flatten array

                //then convert the song ids into song objects (JSON blobs)
                resolveSongObjects(songIds, function(err, songMap) {
                  if (err) {
                    return sendDatabaseError(res, err);
                  }
                  var songs = songIds.map((songId) => {
                    return songMap[songId];
                  });
                  resolveSongUploader(songs, function(err, userMap) {
                    if (err) {
                      return sendDatabaseError(res, err);
                    }
                    var userList = []
                    songs.forEach((song) => {
                      userList.push(userMap[song.uploader]);
                    })
                    for (var i = 0; i < songs.length; i++) {
                      songs[i].uploader = userList[i];
                    }
                    res.send(songs);
                  });
                }); //end of resolveSongObjects call
              }
            }); //end of 'user1' query
          }
        }
      }); //end of 'users' db call
    } else {
      res.status(401).end();
    }
  });

  /**
   * Resolves a list of user objects. Returns an object that maps user IDs to
   * user objects.
   */
  function resolveSongObjects(songIds, callback) {
    if (songIds.length === 0) {
      callback(null, {});
    } else {
      songIds = songIds.map((songId) => new ObjectID(songId));
      db.collection('songs').find({
        _id: {
          $in: songIds
        }
      }).toArray(function(err, songs) {
        if (err) {
          return callback(err);
        }
        var songMap = {};
        songs.forEach((song) => {
          songMap[song._id] = song;
        });
        callback(null, songMap);
      });
    }
  }

  //getUserPlaylists
  //note that playlists are all public, so we don't need to add auth here
  app.get('/users/:userid/playlists', function(req, res) {
    var userId = req.params.userid;
    db.collection('users').findOne({
      _id: new ObjectID(userId)
    }, function(err, user) {
      if (err) {
        return sendDatabaseError(res, err);
      } else if (user === null) {
        res.status(400).send("Could not find user: " + userId);
      } else {
        res.send(user.playlists);
      }
    }); //end of users db call
  });

  function resolveSongUploader(songList, cb) {
    if (songList.length === 0) {
      return cb(null, {})
    }
    var songIds = songList.map((song) => new ObjectID(song.uploader));
    db.collection('users').find({
      _id: {
        $in: songIds
      }
    }).toArray(function(err, userList) {
      if (err) {
        return cb(err)
      }
      var userMap = {};
      userList.forEach((user) => {
        userMap[user._id] = user;
      });
      cb(null, userMap)
    });
  }

  app.get('/users/:userid/playlist/:playlistidx', function(req, res) {
    var userId = req.params.userid;
    var playlistIdx = req.params.playlistidx;
    db.collection('users').findOne({
      _id: new ObjectID(userId)
    }, function(err, user) {
      if (err) {
        return sendDatabaseError(res, err);
      } else if (user === null) {
        res.status(400).send("Could not find user: " + userId);
      } else {
        var playlist = user.playlists[playlistIdx];
        if (playlist === undefined) {
          res.status(400).send("Could not find playlist index: " + playlistIdx);
        } else {
          var songIds = playlist.songs;
          resolveSongObjects(songIds, function(err, songMap) {
            if (err) {
              res.status(500).send("A database error occurred: " + err);
            } else {
              playlist.songs = playlist.songs.map((songId) => {
                return songMap[songId];
              });
              resolveSongUploader(playlist.songs, function(err, userMap) {
                if (err) {
                  res.status(500).send("A database error occurred: " + err);
                } else {
                  playlist.songs = playlist.songs.map((song) => {
                    song.uploader = userMap[song.uploader]
                    return song;
                  })
                }
                res.send(playlist)
              })
            }
          }); //end of resolveSongObjects
        }
      }
    }); //end of users db call
  }); //end of server function

  // getSongComments
  // note that comments are all public, so we don't need to add auth here
  app.get('/songs/:songid/comments', function(req, res) {
    var songId = req.params.songid;
    db.collection('songs').findOne({
      _id: new ObjectID(songId)
    }, function(err, song) {
      if (err) {
        return sendDatabaseError(res, err);
      } else if (song === null) {
        res.status(400).send("Could not find song: " + songId);
      } else {
        var commentIds = song.comments.map((id) => new ObjectID(id));
        db.collection('comments').find({
          _id: {
            $in: commentIds
          }
        }).toArray(function(err, comments) {
          if (err) {
            return sendDatabaseError(res, err);
          }
          resolveCommentsAuthor(comments, function(err, userMap) {
            if (err) {
              return sendDatabaseError(res, err);
            }
            comments.forEach((comment) => {
              comment.author = userMap[comment.author];
            });
            res.send(comments);
          });
        });
      }
    });
  });

  function postSongComment(authorId, songId, text, cb) {
    var newComment = {
      "author": authorId,
      "text": text,
      "postDate": new Date().getTime(),
      "likes": []
    };
    db.collection('comments').insertOne(newComment, function(err, result) {
      if (err) {
        return cb(err);
      }
      newComment._id = result.insertedId;
      db.collection('songs').updateOne({
        _id: songId
      }, {
        $push: {
          comments: newComment._id
        }
      }, function(err) {
        if (err) {
          return cb(err);
        }
        db.collection('users').findOne({
          _id: authorId
        }, function(err, user) {
          if (err) {
            return cb(err);
          }
          newComment.author = user;
          cb(null, newComment)
        });
      });
    });
  }

  // postSongComment
  app.post('/songs/:songid/comments', validate({
    body: CommentSchema
  }), function(req, res) {
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var songId = req.params.songid;
    if (fromUser === body.author) {
      postSongComment(new ObjectID(fromUser), new ObjectID(songId), body.text, function(err, newComment) {
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

  function resolveCommentsAuthor(commentList, cb) {
    if (commentList.length === 0) {
      return cb(null, {})
    }
    var authors = commentList.map((comment) => new ObjectID(comment.author));
    db.collection('users').find({
      _id: {
        $in: authors
      }
    }).toArray(function(err, userList) {
      if (err) {
        return cb(err);
      }
      var userMap = {};
      userList.forEach((user) => {
        userMap[user._id] = user;
      });
      cb(null, userMap)
    });
  }

  //getUserComments
  //note that comments are all public, so we don't need to add auth here
  app.get('/users/:userid/comments', function(req, res) {
    var userId = req.params.userid;
    db.collection('users').findOne({
      _id: new ObjectID(userId)
    }, function(err, user) {
      if (err) {
        return sendDatabaseError(res, err);
      } else if (user === null) {
        res.status(400).send("Could not find user: " + userId);
      } else {
        var commentIds = user.comments.map((id) => new ObjectID(id));
        db.collection('comments').find({
          _id: {
            $in: commentIds
          }
        }).toArray(function(err, comments) {
          if (err) {
            return sendDatabaseError(res, err);
          }
          resolveCommentsAuthor(comments, function(err, userMap) {
            if (err) {
              return sendDatabaseError(res, err);
            }
            comments.forEach((comment) => {
              comment.author = userMap[comment.author];
            });
            res.send(comments);
          });
        });
      }
    });
  });

  function putSong(authorId, songTitle, songLyrics, songDescription, songGenre, songRewards, cb) {
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
    db.collection('songs').insertOne(newSong, function(err, result) {
      if (err) {
        return cb(err);
      }
      newSong._id = result.insertedId;
      db.collection('users').updateOne({
        _id: authorId
      }, {
        $push: {
          uploads: newSong._id
        }
      }, function(err) {
        if (err) {
          return cb(err);
        }
        db.collection('users').findOne({
          _id: authorId
        }, function(err, user) {
          if (err) {
            return cb(err);
          }
          newSong.uploader = user;
          cb(null, newSong)
        });
      });
    });
  }

  app.put('/users/:userid/uploads', validate({
    body: SongSchema
  }), function(req, res) {
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = req.params.userid;
    if (fromUser === userId) {
      putSong(new ObjectID(fromUser), body.title, body.lyrics, body.description, body.genre, body.rewards, (err, song) => {
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
    if (fromUser === userId) {
      db.collection('comments').updateOne({
        _id: new ObjectID(commentId)
      }, {
        $addToSet: {
          likes: new ObjectID(fromUser)
        }
      }, function(err) {
        if (err) {
          return sendDatabaseError(res, err);
        }
        db.collection('comments').findOne({
          _id: new ObjectID(commentId)
        }, function(err, comment) {
          if (err) {
            return sendDatabaseError(res, err);
          }
          // Return a resolved version of the comment
          db.collection('users').findOne({
            _id: new ObjectID(comment.author)
          }, function(err, user) {
            if (err) {
              return sendDatabaseError(res, err);
            }
            comment.author = user;
            res.send(comment);
          });
        });
      });
    } else {
      res.status(401).end();
    }
  });

  app.delete('/comments/:commentid/likes/:userid', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var commentId = req.params.commentid;
    var userId = req.params.userid;
    if (fromUser === userId) {
      db.collection('comments').updateOne({
        _id: new ObjectID(commentId)
      }, {
        $pull: {
          likes: new ObjectID(fromUser)
        }
      }, function(err) {
        if (err) {
          return sendDatabaseError(res, err);
        }
        db.collection('comments').findOne({
          _id: new ObjectID(commentId)
        }, function(err, comment) {
          if (err) {
            return sendDatabaseError(res, err);
          }
          // Return a resolved version of the comment
          db.collection('users').findOne({
            _id: new ObjectID(comment.author)
          }, function(err, user) {
            if (err) {
              return sendDatabaseError(res, err);
            }
            comment.author = user;
            res.send(comment);
          });
        });
      });
    } else {
      res.status(401).end();
    }
  });

  function postUserComment(authorId, userId, text, cb) {
    var newComment = {
      "author": authorId,
      "text": text,
      "postDate": new Date().getTime(),
      "likes": []
    };
    db.collection('comments').insertOne(newComment, function(err, result) {
      if (err) {
        return cb(err);
      }
      newComment._id = result.insertedId;
      db.collection('users').updateOne({
        _id: userId
      }, {
        $push: {
          comments: newComment._id
        }
      }, function(err) {
        if (err) {
          return cb(err);
        }
        db.collection('users').findOne({
          _id: authorId
        }, function(err, user) {
          if (err) {
            return cb(err);
          }
          newComment.author = user;
          cb(null, newComment)
        });
      });
    });
  }

  app.post('/users/:userid/comments', validate({
    body: CommentSchema
  }), function(req, res) {
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var toUser = req.params.userid;
    if (fromUser === body.author) {
      postUserComment(new ObjectID(fromUser), new ObjectID(toUser), body.text, function(err, newComment) {
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
    if (fromUser === userId) {
      db.collection('songs').updateOne({
        _id: new ObjectID(songId)
      }, {
        $addToSet: {
          likes: new ObjectID(fromUser)
        }
      }, function(err) {
        if (err) {
          return sendDatabaseError(res, err);
        }
        db.collection('songs').findOne({
          _id: new ObjectID(songId)
        }, function(err, song) {
          if (err) {
            return sendDatabaseError(res, err);
          }
          // Return a resolved version of the comment
          db.collection('users').findOne({
            _id: new ObjectID(song.uploader)
          }, function(err, user) {
            if (err) {
              return sendDatabaseError(res, err);
            }
            song.uploader = user;
            res.send(song);
          });
        });
      });
    } else {
      res.status(401).end();
    }
  });

  app.delete('/songs/:songid/likes/:userid', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var songId = req.params.songid;
    var userId = req.params.userid;
    if (fromUser === userId) {
      db.collection('songs').updateOne({
        _id: new ObjectID(songId)
      }, {
        $pull: {
          likes: new ObjectID(fromUser)
        }
      }, function(err) {
        if (err) {
          return sendDatabaseError(res, err);
        }
        db.collection('songs').findOne({
          _id: new ObjectID(songId)
        }, function(err, song) {
          if (err) {
            return sendDatabaseError(res, err);
          }
          // Return a resolved version of the comment
          db.collection('users').findOne({
            _id: new ObjectID(song.uploader)
          }, function(err, user) {
            if (err) {
              return sendDatabaseError(res, err);
            }
            song.uploader = user;
            res.send(song);
          });
        });
      });
    } else {
      res.status(401).end();
    }
  });

  // Update User info helper
  function updateUserInfo(userId, birthday, contactAgent, education, gender, location, nickname, callback) {
    var newUpdate = {
      'nickname': nickname,
      'birthday': birthday,
      'gender': gender,
      'location': location,
      'contactAgent': contactAgent,
      'education': education
    };
    db.collection('users').updateOne({
      _id: userId
    }, {
      $set: {
        info: newUpdate
      }
    }, function(err) {
      if (err) {
        return callback(err);
      }
      db.collection('users').findOne({
        _id: userId
      }, function(err, user) {
        if (err) {
          return callback(err);
        }
        callback(null, user.info)
      })
    });
  }

  // Update User info
  app.post('/users/:userid/info', validate({
    body: InfoSchema
  }), function(req, res) {
    var body = req.body;
    var userId = req.params.userid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if (fromUser === userId) {
      updateUserInfo(new ObjectID(fromUser), body.birthday, body.contactAgent, body.education, body.gender, body.location, body.nickname, function(err, updatedProfile) {
        if (err) {
          res.status(500).send("A database error occurred: " + err);
        } else {
          res.status(201);
          res.send(updatedProfile);
        }
      });
    } else {
      res.status(401).end();
    }
  });

  //getUserData
  app.get('/users/:userid/private', function(req, res) {
    var userId = req.params.userid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if (fromUser === userId) {
      db.collection('users').findOne({
        _id: new ObjectID(userId)
      }, function(err, user) {
        if (err) {
          return sendDatabaseError(res, err);
        } else if (user === null) {
          res.status(400).send("Could not find user: " + userId);
        } else {
          res.send(user);
        }
      })
    } else {
      // 401: Unauthorized request.
      res.status(401).end();
    }
  });

  //getPublicProfile
  //note that comments are all public, so we don't need to add auth here
  app.get('/users/:userid/public', function(req, res) {
    var userId = req.params.userid;
    db.collection('users').findOne({
      _id: new ObjectID(userId)
    }, function(err, user) {
      if (err) {
        return sendDatabaseError(res, err);
      } else if (user === null) {
        res.status(400).send("Could not find user: " + userId);
      } else {

        //remove all private information so it won't be returned
        delete user.beatcoins;
        delete user.balance;
        delete user.token;
        delete user.likes;
        if (user.info.nickname[1] === false) {
          delete user.info.nickname
        }
        if (user.info.birthday[1] === false) {
          delete user.info.birthday
        }
        if (user.info.gender[1] === false) {
          delete user.info.gender
        }
        if (user.info.location[1] === false) {
          delete user.info.location
        }
        if (user.info.contactAgent[1] === false) {
          delete user.info.contactAgent
        }
        if (user.info.education[1] === false) {
          delete user.info.education
        }

        res.send(user);
      }
    });
  });

  //getUploadedSongs
  //note that uploaded songs are all public, so we don't need to add auth here
  app.get('/users/:userid/uploads', function(req, res) {
    var userId = req.params.userid;
    db.collection('users').findOne({
      _id: new ObjectID(userId)
    }, function(err, user) {
      if (err) {
        return sendDatabaseError(res, err);
      } else if (user === null) {
        res.status(400).send("Could not find user: " + userId);
      } else {
        var songs = user.uploads.map((id) => new ObjectID(id));
        db.collection('songs').find({
          _id: {
            $in: songs
          }
        }).toArray(function(err, songList) {
          if (err) {
            return sendDatabaseError(res, err);
          } else {
            resolveSongUploader(songList, function(err, userMap) {
              if (err) {
                return sendDatabaseError(res, err);
              }
              var userList = [];
              songList.forEach((song) => {
                userList.push(userMap[song.uploader])
              })
              for (var i = 0; i < songList.length; i++) {
                songList[i].uploader = userList[i];
              }
              res.send(songList)
            });
          }
        })
      }
    }); //end of 'users' db call
  }); //end of server function

  app.get('/redeemables', function(req, res) {
    db.collection('redeemables').find().toArray(function(err, activeRedeemables) {
      if (err) {
        return sendDatabaseError(res, err);
      } else if (activeRedeemables === null) {
        res.status(400).send("Could not find redeemables: active");
      } else {
        res.send(activeRedeemables)
      }
    });
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
});
