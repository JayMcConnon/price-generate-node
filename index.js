const axios = require('axios');
const fs = require('fs');
const prices = require('./prices.json');


// Get prices from bitskins



// Pull prices from prices.json
const items = prices.prices;


console.log('Generating prices from prices.json');
// Start counting time to generate the list
console.time('listGenerate');
// This is where the itemList will end up
let itemList = {};
// Iterate through each item in the list
items.forEach(item => {
  // Get the name
  const name = item.market_hash_name;
  // Get the price and make it primitive
  const price = parseFloat(item.price);
  // Push the values to the item
  newItem = {
    [name]: price
  };
  // Push the item to the big daddy itemList
  Object.assign(itemList, newItem);
});
// Let's see how long that took
console.timeEnd('listGenerate');

// If there is no items in the itemList something went wrong
if (itemList.length === 0) {
  console.error('No prices generated.... Exiting');
  process.exit(1);
}
// Otherwise, start writing to the file
console.log('Success generating prices, Moving on to saving it to generatedPriceList.json');
console.log('Stringifying...');
// Stringify the output to write to file
const listToExport = JSON.stringify(itemList);
// Set up path for generatedPricesList.json
const path = './generatedPricesList.json';
// Do this in try catch to stop it erroring out
try {
  // If the file doesn't exist
  if (!fs.existsSync(path)) {
    // Let us know
    console.log('File doesn\'t exist already, creating it..');
    // Then create it with our itemList
    fs.writeFile('generatedPriceList.json', listToExport, 'utf8', () => {
      console.log('Done!');
    });
  } else {
    // If the file exists (This is kinda pointless, just for nice looks)
    // TODO Clean this up with ternary
    console.log('File already exists, Overwriting');
    fs.writeFile('generatedPriceList.json', listToExport, 'utf8', () => {
      console.log('Done!');
    });
  }
}
catch (err) {
  // If it errors out, let us know, Could be permissions or something. 
  console.error(err);
}
