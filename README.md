[![CircleCI](https://circleci.com/gh/ProjectZed/beatcoin/tree/master.svg?style=shield&circle-token=29c531b9dea3831098549784593f7656e55ae28d)](https://circleci.com/gh/ProjectZed/beatcoin)

# Beatcoin

Beatcoin is a music streaming web app that encourages our listeners to give indie artists a chance to make it big. It’s difficult for aspiring artists to gain a fanbase nowadays due to the exclusivity that record labels maintain. We believe indie artists should have a chance to be heard by millions of people around the world without giving up their uniqueness. To give them this opportunity, artists pay us to have their content streamed on our service.

Like many other music streaming web apps such as Pandora, Beatcoin offers music streaming services for listeners and big data analysis for artists. However, our uniqueness comes from incorporating something similar to how Bing Rewards works. We encourage our listeners to open their ears to the amazing music new artists have to offer by rewarding them with beatcoins! Beatcoins, our virtual currency, can be used to redeem gift cards and similar merchandise. It’s a win-win for everyone, listeners get compensated for listening to new music and artists grow their reputation.

# Instructions

1. Open a new terminal and run the following commands
2. `git clone https://github.com/ProjectZed/beatcoin.git`
3. `cd beatcoin/client`
4. `npm install`

5. Open a new terminal and run the following commands
6. `cd beatcoin/server`
7. `npm install`

8. Open a new terminal and run the following commands
9. Move to the directory containing the beatcoin directory
10. Create the directory `beatcoin-data`
11. **Mac/Linux**: Initialize database with `mongod --dbpath beatcoin-data`  
    **Windows**: Initialize database with `"C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --dbpath beatcoin-data`  

12. In `beatcoin/server/node_modules/mongo-express/config.default.js`, change `db: 'db'` to `db: 'beatcoin'`

13. In the client terminal, run `npm run watch`
14. In the server terminal, run `node server/src/server.js`
15. Open Chrome web browser to `localhost:3000`
