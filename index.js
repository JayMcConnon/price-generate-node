const fs = require('fs');
const prices = require('./prices.json');

const items = prices.prices;


console.log('Generating prices from prices.json');
console.time('listGenerate');
let itemList = {};
items.forEach(item => {
  const name = item.market_hash_name;
  const price = parseFloat(item.price);
  newItem = {
    [name]: price
  };
  return Object.assign(itemList, newItem);
  // Get it into the list
});
console.timeEnd('listGenerate');

if (itemList.length === 0) {
  console.error('No prices generated.... Exiting');
  process.exit(1);
}
console.log('Success generating prices, Moving on to saving it to generatedPriceList.json');
console.log('Stringifying...');
const listToExport = JSON.stringify(itemList);

const path = './generatedPricesList.json';

try {
  if (!fs.existsSync(path)) {
    console.log('File doesn\'t exist already, creating it..');
    fs.writeFile('generatedPriceList.json', listToExport, 'utf8', () => {
      console.log('Done!');
    });
  } else {
    console.log('File already exists, Overwriting');
    fs.writeFile('generatedPriceList.json', listToExport, 'utf8', () => {
      console.log('Done!');
    });
  }
}
catch (err) {
  console.error(err);
}
