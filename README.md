# Bitskins api example nodeJS code

I made this code as a help to a friend that wanted a consistent way to get prices from bitskins api
and then write it into a minified file.

It does this for all items for CS GO 

The script to get the prices from bitskins is in getPrices.js

in index.js is a script to then pull the details from the prices.json that has been generated and generate a smaller file with just the names
and prices, this was the original use for the script, it isn't particularly useful.

To use, run `npm install`

rename `config.json.example` to `config.json`

then run `node getPrices.js`

This is just a messaround thing i build ina few minutes for a friend. Please don't shout at me if it breaks or anything. 


