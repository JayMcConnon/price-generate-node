const axios = require('axios');
const fs = require('fs');
const { bitskins_key, bitskins_secret } = require('./config.json');
const totp = require('notp').totp;
const base32 = require('thirty-two');

const schedule = require('node-schedule');


const j = schedule.scheduleJob('30 * * * * *', function(){
    console.log('Running bitskins prices on schedule.');
    // Set up the secret.
    const secret = totp.gen(base32.decode(bitskins_secret));

    // Set up axios call
    const baseUrl = 'https://bitskins.com/api/v1';
    const endpoint = `/get_all_item_prices/?api_key=${bitskins_key}&app_id=730&code=${secret}`
    const url = `${baseUrl}${endpoint}`;

    // Start a timer to check response time from API
    console.time('apiResponseTime');
    // Get prices from bitskins
    axios.get(url)
        .then(function(response) {
          console.log('Got the bitskins prices');
          const receivedItems = response.data;
          const saveableItems = JSON.stringify(receivedItems);
          fs.writeFile('prices.json', saveableItems, 'utf8', () => {
            console.log('Written to local json file');
          });
          fs.writeFile('../bot/prices.json', saveableItems, 'utf8', () => {
            console.log('Written to bots json file');
          });
        })
        .catch(err => {
          console.error(err.message);
        });

    console.timeEnd('apiResponseTime');
});
