const data = require('./utils/download_data.js')
const filter = require('./utils/filter.js')

async function main() {
  await data.request();
  filter.filterData();
}
main();

