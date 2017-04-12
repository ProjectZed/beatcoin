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
    emulateServerReturn(2, cb);
}

export function playlistClicked(user, alist, cb) {
    if (user === 1) {
        var lists = readDocument(user.playlists, 1);
        var theList = lists.filter((list) => {
            list.name === alist
        });
        theList = theList.sort((a, b) => {
            b.uploadDate - a.uploadDate
        });
        emulateServerReturn(theList.songs, cb);
    } else {
        getLoggedInUserId((userId) => {
            var songs = readDocument(user.favorites, userId);
            var tList = songs.sort((a, b) => {
                b.uploadDate - a.uploadDate
            });
            emulateServerReturn(tList, cb);
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
