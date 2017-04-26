//new Buffer(JSON.stringify({ id: 2 })).toString('base64');
var token = 'eyJpZCI6Mn0=';

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

export function getUserPlaylists(userId, cb) {
  sendXHR('GET', '/users/' + userId + '/playlists', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getSongComments(songId, cb) {
  sendXHR('GET', '/songs/' + songId + '/comments', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getUserComments(userId, cb) {
  sendXHR('GET', '/users/' + userId + '/comments', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getPlaylist(userId, playlistId, cb) {
  sendXHR('GET', '/users/' + userId + '/playlist/' + playlistId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function likeComment(userId, commentId, cb) {
  sendXHR('PUT', '/comments/' + commentId + '/likes/' + userId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function dislikeComment(userId, commentId, cb) {
  sendXHR('DELETE', '/comments/' + commentId + '/likes/' + userId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function postUserComment(posterId, userId, message, cb) {
  sendXHR('POST', '/users/' + userId + '/comments', {
    "author": posterId,
    "text": message
  }, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function postSongComment(posterId, songId, message, cb) {
  sendXHR('POST', '/songs/' + songId + '/comments', {
    "author": posterId,
    "text": message
  }, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function likeSong(userId, songId, cb) {
  sendXHR('PUT', '/songs/' + songId + '/likes/' + userId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function dislikeSong(userId, songId, cb) {
  sendXHR('DELETE', '/songs/' + songId + '/likes/' + userId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function updateProfile(userId, info, cb) {
  sendXHR('POST', '/users/' + userId + '/info', info, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getPrivateProfile(userId, cb) {
  sendXHR('GET', '/users/' + userId + '/private', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getPublicProfile(userId, cb) {
  sendXHR('GET', '/users/' + userId + '/public', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getUploadedSongs(userId, cb) {
  sendXHR('GET', '/users/' + userId + '/uploads', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getRedeemables(cb) {
  sendXHR('GET', 'redeemables', undefined, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}

function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  // The below comment tells ESLint that BeatcoinError is a global.
  // Otherwise, ESLint would complain about it! (See what happens in Atom if
  // you remove the comment...)
  /* global BeatcoinError */

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
      BeatcoinError('Could not ' + verb + " " + resource + ": Received " + statusCode + " " + statusText + ": " + responseText);
    }
  });

  // Time out the request if it takes longer than 10,000
  // milliseconds (10 seconds)
  xhr.timeout = 10000;

  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    BeatcoinError('Could not ' + verb + " " + resource + ": Could not connect to the server.");
  });

  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    BeatcoinError('Could not ' + verb + " " + resource + ": Request timed out.");
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
