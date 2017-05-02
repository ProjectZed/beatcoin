var ObjectID = require('mongodb').ObjectID;

var databaseName = "beatcoin";
// Put the initial mock objects here.
var initialData = {
  "users": {
    // This user has id "1".
    "1": {
      "_id": new ObjectID("000000000000000000000001"),
      "name": "Beatcoin Admin",
      "beatcoins": 0,
      // Amount of $ a User has to reward listeners
      "balance": 0,
      "profilePicture": "img/users/beatcoin.jpg",
      "info": {
        "nickname": [
          "Beatcoin", false
        ],
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
      "playlists": [{
        "_id": new ObjectID("000000000000000000000001"),
        "name": "Jazz",
        "genre": "Jazz",
        "owner": new ObjectID("000000000000000000000001"),
        "cover": "img/user-home/Jazz.jpg",
        "songs": [new ObjectID("000000000000000000000001")]
      }, {
        "_id": new ObjectID("000000000000000000000002"),
        "name": "Folk",
        "genre": "Folk",
        "owner": new ObjectID("000000000000000000000001"),
        "cover": "img/user-home/Folk.jpg",
        "songs": [new ObjectID("000000000000000000000001")]
      }, {
        "_id": new ObjectID("000000000000000000000003"),
        "name": "Rock",
        "genre": "Rock",
        "owner": new ObjectID("000000000000000000000001"),
        "cover": "img/user-home/Rock.jpg",
        "songs": [new ObjectID("000000000000000000000001")]
      }, {
        "_id": new ObjectID("000000000000000000000004"),
        "name": "Blues",
        "genre": "Blues",
        "owner": new ObjectID("000000000000000000000001"),
        "cover": "img/user-home/Blues.jpg",
        "songs": [new ObjectID("000000000000000000000001")]
      }, {
        "_id": new ObjectID("000000000000000000000005"),
        "name": "Funk",
        "genre": "Funk",
        "owner": new ObjectID("000000000000000000000001"),
        "cover": "img/user-home/Funk.jpg",
        "songs": [new ObjectID("000000000000000000000001")]
      }, {
        "_id": new ObjectID("000000000000000000000006"),
        "name": "Country",
        "genre": "Country",
        "owner": new ObjectID("000000000000000000000001"),
        "cover": "img/user-home/Country.jpg",
        "songs": [new ObjectID("000000000000000000000001")]
      }, {
        "_id": new ObjectID("000000000000000000000007"),
        "name": "Pop",
        "genre": "Pop",
        "owner": new ObjectID("000000000000000000000001"),
        "cover": "img/user-home/Pop.jpg",
        "songs": [new ObjectID("000000000000000000000001")]
      }, {
        "_id": new ObjectID("000000000000000000000008"),
        "name": "RnB",
        "genre": "RnB",
        "owner": new ObjectID("000000000000000000000001"),
        "cover": "img/user-home/RnB.jpg",
        "songs": [new ObjectID("000000000000000000000001")]
      }, {
        "_id": new ObjectID("000000000000000000000009"),
        "name": "Hiphop",
        "genre": "Hiphop",
        "owner": new ObjectID("000000000000000000000001"),
        "cover": "img/user-home/Hiphop.jpg",
        "songs": [new ObjectID("000000000000000000000001")]
      }, {
        "_id": new ObjectID("000000000000000000000010"),
        "name": "Rapping",
        "genre": "Rapping",
        "owner": new ObjectID("000000000000000000000001"),
        "cover": "img/user-home/Rapping.jpg",
        "songs": [new ObjectID("000000000000000000000001")]
      }, {
        "_id": new ObjectID("000000000000000000000011"),
        "name": "Reggae",
        "genre": "Reggae",
        "owner": new ObjectID("000000000000000000000001"),
        "cover": "img/user-home/Reggae.jpg",
        "songs": [new ObjectID("000000000000000000000001")]
      }, {
        "_id": new ObjectID("000000000000000000000012"),
        "name": "Punk",
        "genre": "Punk",
        "owner": new ObjectID("000000000000000000000001"),
        "cover": "img/user-home/Punk.jpg",
        "songs": [new ObjectID("000000000000000000000001")]
      }, {
        "_id": new ObjectID("000000000000000000000013"),
        "name": "EDM",
        "genre": "EDM",
        "owner": new ObjectID("000000000000000000000001"),
        "cover": "img/user-home/EDM.jpg",
        "songs": [new ObjectID("000000000000000000000001")]
      }, {
        "_id": new ObjectID("000000000000000000000014"),
        "name": "Classical",
        "genre": "Classical",
        "owner": new ObjectID("000000000000000000000001"),
        "cover": "img/user-home/Classical.jpg",
        "songs": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003")]
      }, {
        "_id": new ObjectID("000000000000000000000015"),
        "name": "Acapella",
        "genre": "Acapella",
        "owner": new ObjectID("000000000000000000000001"),
        "cover": "img/user-home/Acapella.jpg",
        "songs": [new ObjectID("000000000000000000000001")]
      }],
      "likes": [],
      "comments": []
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "name": "Fang Jhang",
      "beatcoins": 200,
      "balance": 500,
      "profilePicture": "img/users/fang_jhang.jpg",
      "info": {
        "nickname": [
          "Fang Jhang", true
        ],
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
        new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003")
      ],
      "favorites": [
        new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003")
      ],
      "token": "TOKEN-GOES-HERE",
      "playlists": [{
        "_id": new ObjectID("000000000000000000000001"),
        "name": "My Jazz",
        "genre": "Jazz",
        "owner": new ObjectID("000000000000000000000001"),
        "cover": "img/user-home/Jazz.jpg",
        "songs": [new ObjectID("000000000000000000000001")]
      }],
      "likes": [new ObjectID("000000000000000000000002")],
      "comments": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002")]
    }
  },
  "comments": {
    "1": {
      "_id": new ObjectID("000000000000000000000001"),
      "author": new ObjectID("000000000000000000000002"),
      "text": "What a lovely tune!",
      "postDate": 1453690800060,
      "likes": [new ObjectID("000000000000000000000001")]
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "author": new ObjectID("000000000000000000000002"),
      "text": "Truly wonderful!",
      "postDate": 1453690800120,
      "likes": [new ObjectID("000000000000000000000002")]
    }
  },
  "songs": {
    "0": {
      "_id": new ObjectID("000000000000000000000000"),
      "title": "Welcome to Beatcoin",
      "genre": "None",
      "uploader": new ObjectID("000000000000000000000001"),
      "price": 0,
      "plays": 0,
      "audio": "audio/silence.mp3",
      "cover": "img/beatcoinholder.png",
      "lyrics": "Welcome to beatcoin",
      "uploadDate": 1453690800000,
      "likes": [new ObjectID("000000000000000000000000")],
      "comments": []
    },
    "1": {
      "_id": new ObjectID("000000000000000000000001"),
      "title": "The Star Spangled Banner",
      "genre": "Classical",
      "uploader": new ObjectID("000000000000000000000002"),
      "price": 35,
      "plays": 1027,
      "audio": "audio/star-spangled-banner.mp3",
      "cover": "img/songs/covers/star-spangled-banner.jpg",
      "lyrics": "Oh, say can you see by the dawn\'s early light\nWhat so proudly we hailed at the twilight\'s last gleaming?\nWhose broad stripes and bright stars thru the perilous fight,O\'er the ramparts we watched were so gallantly streaming?\nAnd the rockets\' red glare, the bombs bursting in air,\nGave proof through the night that our flag was still there.\nOh, say does that star-spangled banner yet wave\nO\'er the land of the free and the home of the brave?\nOn the shore, dimly seenthrough the mists of the deep,\nWhere the foe\'s haughty host in dread silence reposes,\nWhat is that which the breeze, o\'er the towering steep,\nAs it fitfully blows, half conceals, half discloses?\nNow it catches the gleam of the morning\'s first beam,\nIn full glory reflected now shines in the stream:\n'Tis the star-spangled banner! Oh long may it wave\nO'er the land of the free and the home of the brave.\n\nAnd where is that band who so vauntingly swore\nThat the havoc of war and the battle\'s confusion,\nA home and a country should leave us no more!\nTheir blood has washed out their foul footsteps\' pollution.\nNo refuge could save the hireling and slave'\nFrom the terror of flight and the gloom of the grave:\nAnd the star-spangled banner in triumph doth wave\nO'er the land of the free and the home of the brave.\n\nOh! thus be it ever, when freemen shall stand\nBetween their loved home and the war's desolation!\nBlest with victory and peace, may the heav\'n rescued land\nPraise the Power that hath made and preserved us a nation.\nThen conquer we must, when our cause it is just,\nAnd this be our motto: \"In God is our trust.\"\nAnd the star-spangled banner in triumph shall wave\nO'er the land of the free and the home of the brave.",
      "description": "The U.S. National Anthem",
      "uploadDate": 1453690800000,
      "likes": [new ObjectID("000000000000000000000002")],
      "comments": [new ObjectID("000000000000000000000002")]
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "title": "O Canada",
      "genre": "Classical",
      "uploader": new ObjectID("000000000000000000000002"),
      "price": 24,
      "plays": 6712,
      "audio": "audio/o-canada.mp3",
      "cover": "img/songs/covers/o-canada.jpg",
      "lyrics": "O Canada!\nOur home and native land!\nTrue patriot love in all thy sons command.\nWith glowing hearts we see thee rise,\nThe True North strong and free!\nFrom far and wide,\nO Canada, we stand on guard for thee.\nGod keep our land glorious and free!\nO Canada, we stand on guard for thee.\nO Canada, we stand on guard for thee.",
      "description": "The Canadian National Anthem",
      "uploadDate": 1453490800000,
      "likes": [
        new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002")
      ],
      "comments": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002")]
    },
    "3": {
      "_id": new ObjectID("000000000000000000000003"),
      "title": "Taiwan National Anthem",
      "genre": "Classical",
      "uploader": new ObjectID("000000000000000000000002"),
      "price": 24,
      "plays": 6712,
      "audio": "audio/taiwan-national-anthem.mp3",
      "cover": "img/songs/covers/taiwan-national-anthem.jpg",
      "lyrics": "San Min Chu-i,\nOur aim shall be:\nTo found a free land,\nWorld peace, be our stand.\nLead on, comrades,\nVanguards ye are.\nHold fast your aim,\nBy sun and star.\nBe earnest and brave,\nYour country to save,\nOne heart, one soul,\nOne mind, one goal...",
      "description": "Taiwan National Anthem",
      "uploadDate": 1457490800000,
      "likes": [
        new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002")
      ],
      "comments": [new ObjectID("000000000000000000000001")]
    }
  },
  "redeemables": [{
      "_id": new ObjectID("000000000000000000000001"),
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
    {
      "_id": new ObjectID("000000000000000000000002"),
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
    },
    {
      "_id": new ObjectID("000000000000000000000003"),
      "name": "Beatcoin",
      "image": "img/redeem/beatcoinholder.png",
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
    {
      "_id": new ObjectID("000000000000000000000004"),
      "name": "iTunes",
      "image": "img/redeem/itunes.jpg",
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
  ]
}

/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, cb);
  });
}

/**
 * Reset the MongoDB database.
 * @param db The database connection.
 */
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      cb();
    }
  }

  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if (require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}
