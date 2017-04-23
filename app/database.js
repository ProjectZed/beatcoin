import React from 'react';

var initialData = {
  "users": {
    // This user has id "1".
    "1": {
      "_id": 1,
      "name": "Beatcoin Admin",
      "beatcoins": 0,
      // Amount of $ a User has to reward listeners
      "balance": 0,
      "profilePicture": "img/users/beatcoin.jpg",
      "info": {
        "birthday": [
          "2017/01/24", false
        ],
        "gender": [
          "N/A", false
        ],
        "location": [
          "UMass Amherst", false
        ],
        "contactAgent": [
          "N/A", false
        ],
        "education": ["College", false]
      },
      "uploads": [],
      "favorites": [],
      //used for authentication
      "token": "TOKEN-GOES-HERE",
      "playlists": [
        {
          "_id": "1",
          "name": "Jazz",
          "genre": "Jazz",
          "owner": 1,
          "cover": "img/user-home/Jazz.jpg",
          "songs": [1]
        }, {
          "_id": "2",
          "name": "Folk",
          "genre": "Folk",
          "owner": 1,
          "cover": "img/user-home/Folk.jpg",
          "songs": [1]
        }, {
          "_id": "3",
          "name": "Rock",
          "genre": "Rock",
          "owner": 1,
          "cover": "img/user-home/Rock.jpg",
          "songs": [1]
        }, {
          "_id": "4",
          "name": "Blues",
          "genre": "Blues",
          "owner": 1,
          "cover": "img/user-home/Blues.jpg",
          "songs": [1]
        }, {
          "_id": "5",
          "name": "Funk",
          "genre": "Funk",
          "owner": 1,
          "cover": "img/user-home/Funk.jpg",
          "songs": [1]
        }, {
          "_id": "6",
          "name": "Country",
          "genre": "Country",
          "owner": 1,
          "cover": "img/user-home/Country.jpg",
          "songs": [1]
        }, {
          "_id": "7",
          "name": "Pop",
          "genre": "Pop",
          "owner": 1,
          "cover": "img/user-home/Pop.jpg",
          "songs": [1]
        }, {
          "_id": "8",
          "name": "RnB",
          "genre": "RnB",
          "owner": 1,
          "cover": "img/user-home/RnB.jpg",
          "songs": [1]
        }, {
          "_id": "9",
          "name": "Hiphop",
          "genre": "Hiphop",
          "owner": 1,
          "cover": "img/user-home/Hiphop.jpg",
          "songs": [1]
        }, {
          "_id": "10",
          "name": "Rapping",
          "genre": "Rapping",
          "owner": 1,
          "cover": "img/user-home/Rapping.jpg",
          "songs": [1]
        }, {
          "_id": "11",
          "name": "Reggae",
          "genre": "Reggae",
          "owner": 1,
          "cover": "img/user-home/Reggae.jpg",
          "songs": [1]
        }, {
          "_id": "12",
          "name": "Punk",
          "genre": "Punk",
          "owner": 1,
          "cover": "img/user-home/Punk.jpg",
          "songs": [1]
        }, {
          "_id": "13",
          "name": "EDM",
          "genre": "EDM",
          "owner": 1,
          "cover": "img/user-home/EDM.jpg",
          "songs": [1]
        }, {
          "_id": "14",
          "name": "Classical",
          "genre": "Classical",
          "owner": 1,
          "cover": "img/user-home/Classical.jpg",
          "songs": [1, 2, 3]
        }, {
          "_id": "15",
          "name": "Acapella",
          "genre": "Acapella",
          "owner": 1,
          "cover": "img/user-home/Acapella.jpg",
          "songs": [1]
        }
      },
      "likes": [],
      "comments": []
    },
    "2": {
      "_id": 2,
      "name": "Fang Jhang",
      "beatcoins": 200,
      "balance": 500,
      "profilePicture": "img/users/fang_jhang.jpg",
      "info": {
        "birthday": [
          "1689/03/31", true
        ],
        "gender": [
          "Female", true
        ],
        "location": [
          "UMass Amherst", true
        ],
        "contactAgent": [
          "Sara Ramaker", true
        ],
        "education": ["High School", true]
      },
      "uploads": [
        1, 2, 3
      ],
      "favorites": [
        1, 2, 3
      ],
      "token": "TOKEN-GOES-HERE",
      "playlists": {
        "1": {
          "name": "My Jazz",
          "genre": "Jazz",
          "owner": 1,
          "cover": "img/user-home/Jazz.jpg",
          "songs": [1]
        }
      },
      "likes": [2],
      "comments": [1, 2]
    }
  },
  "comments": {
    "1": {
      "_id": 1,
      "author": 2,
      "text": "What a lovely tune!",
      "postDate": 1453690800060,
      "likes": [1]
    },
    "2": {
      "_id": 2,
      "author": 2,
      "text": "Truly wonderful!",
      "postDate": 1453690800120,
      "likes": [2]
    }
  },
  "songs": {
    "0": {
      "_id": 0,
      "title": "Welcome to Beatcoin",
      "genre": "None",
      "uploader": 1,
      "price": 0,
      "plays": 0,
      "audio": "audio/silence.mp3",
      "cover": "img/beatcoinholder.png",
      "lyrics": "Welcome to beatcoin",
      "uploadDate": 1453690800000,
      "likes": [0],
      "comments": []
    },
    "1": {
      "_id": 1,
      "title": "The Star Spangled Banner",
      "genre": "Classical",
      "uploader": 2,
      "price": 35,
      "plays": 1027,
      "audio": "audio/star-spangled-banner.mp3",
      "cover": "img/songs/covers/star-spangled-banner.jpg",
      "lyrics": "Oh, say can you see by the dawn\'s early light\nWhat so proudly we hailed at the twilight\'s last gleaming?\nWhose broad stripes and bright stars thru the perilous fight,O\'er the ramparts we watched were so gallantly streaming?\nAnd the rockets\' red glare, the bombs bursting in air,\nGave proof through the night that our flag was still there.\nOh, say does that star-spangled banner yet wave\nO\'er the land of the free and the home of the brave?\nOn the shore, dimly seenthrough the mists of the deep,\nWhere the foe\'s haughty host in dread silence reposes,\nWhat is that which the breeze, o\'er the towering steep,\nAs it fitfully blows, half conceals, half discloses?\nNow it catches the gleam of the morning\'s first beam,\nIn full glory reflected now shines in the stream:\n'Tis the star-spangled banner! Oh long may it wave\nO'er the land of the free and the home of the brave.\n\nAnd where is that band who so vauntingly swore\nThat the havoc of war and the battle\'s confusion,\nA home and a country should leave us no more!\nTheir blood has washed out their foul footsteps\' pollution.\nNo refuge could save the hireling and slave'\nFrom the terror of flight and the gloom of the grave:\nAnd the star-spangled banner in triumph doth wave\nO'er the land of the free and the home of the brave.\n\nOh! thus be it ever, when freemen shall stand\nBetween their loved home and the war's desolation!\nBlest with victory and peace, may the heav\'n rescued land\nPraise the Power that hath made and preserved us a nation.\nThen conquer we must, when our cause it is just,\nAnd this be our motto: \"In God is our trust.\"\nAnd the star-spangled banner in triumph shall wave\nO'er the land of the free and the home of the brave.",
      "description": "The U.S. National Anthem",
      "uploadDate": 1453690800000,
      "likes": [2],
      "comments": [2]
    },
    "2": {
      "_id": 2,
      "title": "O Canada",
      "genre": "Classical",
      "uploader": 2,
      "price": 24,
      "plays": 6712,
      "audio": "audio/o-canada.mp3",
      "cover": "img/songs/covers/o-canada.jpg",
      "lyrics": "O Canada!\nOur home and native land!\nTrue patriot love in all thy sons command.\nWith glowing hearts we see thee rise,\nThe True North strong and free!\nFrom far and wide,\nO Canada, we stand on guard for thee.\nGod keep our land glorious and free!\nO Canada, we stand on guard for thee.\nO Canada, we stand on guard for thee.",
      "description": "The Canadian National Anthem",
      "uploadDate": 1453490800000,
      "likes": [
        1, 2
      ],
      "comments": [1, 2]
    },
    "3": {
      "_id": 3,
      "title": "Taiwan National Anthem",
      "genre": "Classical",
      "uploader": 2,
      "price": 24,
      "plays": 6712,
      "audio": "audio/taiwan-national-anthem.mp3",
      "cover": "img/songs/covers/taiwan-national-anthem.jpg",
      "lyrics": "San Min Chu-i,\nOur aim shall be:\nTo found a free land,\nWorld peace, be our stand.\nLead on, comrades,\nVanguards ye are.\nHold fast your aim,\nBy sun and star.\nBe earnest and brave,\nYour country to save,\nOne heart, one soul,\nOne mind, one goal...",
      "description": "Taiwan National Anthem",
      "uploadDate": 1457490800000,
      "likes": [
        1, 2
      ],
      "comments": [1]
    }
  },
  "redeemables": {
    "1": {
      "name": "Chipotle",
      "image": "img/redeem/chipotle.jpg",
      "price": [
        //beatcoins,cents
        [
          1000, 1000
        ],
        [
          1400, 1500
        ],
        [1700, 2000]
      ]
    },
    "2": {
      "name": "Amazon",
      "image": "img/redeem/amazon.jpg",
      "price": [
        //beatcoins,cents
        [
          1000, 1000
        ],
        [
          1400, 1500
        ],
        [1700, 2000]
      ]
    }
  }
}

var data = JSON.parse(localStorage.getItem('beatcoin_data'));
if (data === null) {
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem('beatcoin_data', JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem('beatcoin_data', JSON.stringify(initialData));
  data = JSONClone(initialData);
}

/**
 * Reset database button.
 */
export default class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
        resetDatabase();
        window.alert("Database reset! Refreshing the page now...");
        document.location.reload(false);
      }}>Reset Mock DB</button>
    );
  }
}
