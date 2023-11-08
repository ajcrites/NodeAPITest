const fs = require('fs');
const data = require('./utils/download_data.js')
const filter = require('./utils/filter.js')

async function main() {
  fs.truncateSync('data.JSON');
  fs.truncateSync('filteredData.txt');
  fs.truncateSync('filteredDataReversed.txt');
  await data.request();
  filter.filterData();
}
main();

