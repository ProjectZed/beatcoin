var initialData = {
	// The "user" collection. Contains all of the users in our Facebook system.
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
				"birthday": "2017/01/24",
				"gender": "N/A",
				"location": "UMass Amherst",
				"contactAgent": "N/A",
				"education": "College",
				"displayed": [false, false, false, false, false]
			},
			"uploads": [],
			"favorites": [],
			"token": "TOKEN-GOES-HERE",
			"playlists": {
				"1": {
					"name": "Jazz",
					"genre": "Jazz",
					"owner": 1,
					"cover": "img/user-home/Jazz.jpg",
					"songs": [1]
				},
				"2": {
					"name": "Folk",
					"genre": "Folk",
					"owner": 1,
					"cover": "img/user-home/Folk.jpg",
					"songs": [1]
				},
				"3": {
					"name": "Rock",
					"genre": "Rock",
					"owner": 1,
					"cover": "img/user-home/Rock.jpg",
					"songs": [1]
				},
				"4": {
					"name": "Blues",
					"genre": "Blues",
					"owner": 1,
					"cover": "img/user-home/Blues.jpg",
					"songs": [1]
				},
				"5": {
					"name": "Funk",
					"genre": "Funk",
					"owner": 1,
					"cover": "img/user-home/Funk.jpg",
					"songs": [1]
				},
				"6": {
					"name": "Country",
					"genre": "Country",
					"owner": 1,
					"cover": "img/user-home/Country.jpg",
					"songs": [1]
				},
				"7": {
					"name": "Pop",
					"genre": "Pop",
					"owner": 1,
					"cover": "img/user-home/Pop.jpg",
					"songs": [1]
				},
				"8": {
					"name": "RnB",
					"genre": "RnB",
					"owner": 1,
					"cover": "img/user-home/RnB.jpg",
					"songs": [1]
				},
				"9": {
					"name": "Hiphop",
					"genre": "Hiphop",
					"owner": 1,
					"cover": "img/user-home/Hiphop.jpg",
					"songs": [1]
				},
				"10": {
					"name": "Rapping",
					"genre": "Rapping",
					"owner": 1,
					"cover": "img/user-home/Rapping.jpg",
					"songs": [1]
				},
				"11": {
					"name": "Reggae",
					"genre": "Reggae",
					"owner": 1,
					"cover": "img/user-home/Reggae.jpg",
					"songs": [1]
				},
				"12": {
					"name": "Punk",
					"genre": "Punk",
					"owner": 1,
					"cover": "img/user-home/Punk.jpg",
					"songs": [1]
				},
				"13": {
					"name": "EDM",
					"genre": "EDM",
					"owner": 1,
					"cover": "img/user-home/EDM.jpg",
					"songs": [1]
				},
				"14": {
					"name": "Classical",
					"genre": "Classical",
					"owner": 1,
					"cover": "img/user-home/Classical.jpg",
					"songs": [1]
				},
				"15": {
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
				"birthday": "1689/03/31",
				"gender": "Female",
				"location": "UMass Amherst",
				"contactAgent": "Sara Ramaker (310-288-8000)",
				"education": "High School",
				"displayed": [true, true, true, true, true]
			},
			"uploads": [1],
			"favorites": [1],
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
			"comments": [1,2]
		}
	},
	"comments":{
		"1": {
			"author": 2,
			"text": "What a lovely tune!",
			"postDate": 1453690800060,
			"likes": [2]
		},
		"2": {
			"author": 2,
			"text": "Truly wonderful!",
			"postDate": 1453690800120,
			"likes": [2]
		}
	},
	"songs": {
		"1": {
			"title": "L'Abe igi orombo",
			"genre": "Folk",
			"uploader": 2,
			"price": 35,
			"plays": 1027,
			"audio": "audio/labe_igi_orombo.mp3",
			"cover": "img/labe_igi_orombo.jpg",
			"lyrics": "L'abe igi orombo\nN'ibe l'agbe nsere wa\nInu wa dun, ara wa ya\nL'abe igi orombo\n\nOrombo, orombo\nOrombo, orombo.",
			"description": "Nigerian children's song about the orange tree.",
			"uploadDate": 1453690800000,
			"likes": [2],
			"comments": []
		}
	},
	"redeemables": {
		"1": {
			"name": "Chipotle",
			"image": "img/redeem/chipotle.jpg",
			"price": [
				//beatcoins,cents
				[1000,1000],
				[1200,1500],
				[1700,2000]
			]
		},
		"2": {
			"name": "Amazon",
			"image": "img/redeem/amazon.jpg",
			"price": [
				//beatcoins,cents
				[1000,1000],
				[1200,1500],
				[1700,2000]
			]
		}
	}
}
