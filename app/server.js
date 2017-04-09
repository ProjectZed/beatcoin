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

export function getSongInfo(ids, cb) {
    var songs = [{
            "url": "audio/star-spangled-banner.mp3",
            "cover": "img/songs/covers/star-spangled-banner.jpg",
            "artist": {
                "song": "The Star Spangled Banner",
                "name": "USA"
            }
        },
        {
            "url": "audio/o-canada.mp3",
            "cover": "img/songs/covers/o-canada.jpg",
            "artist": {
                "song": "O Canada",
                "name": "Canada"
            }
        }, {
            "url": "audio/taiwan-national-anthem.mp3",
            "cover": "img/songs/covers/taiwan-national-anthem.jpg",
            "artist": {
                "song": "Taiwan National Anthem",
                "name": "Taiwan"
            }
        }
    ]
    emulateServerReturn(songs, cb);
}

export function getInitialSong(ids, cb) {
    var songs = [{
        "url": "audio/silence.mp3",
        "cover": "img/beatcoinholder.png",
        "artist": {
            "song": "Welcome to Beatcoin",
            "name": ""
        }
    }]

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
