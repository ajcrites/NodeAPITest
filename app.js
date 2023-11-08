const fs = require('node:fs/promises');
const data = require('./utils/download_data.js')
const filter = require('./utils/filter.js')

async function main() {
  try {
    await Promise.all([
      fs.truncate('data.json'),
      fs.truncate('filtered-data'),
      fs.truncate('filtered-data-reversed'),
    ]);
  }
  catch {
    // This error is most likely that these files don't exist.
    // The application code will create it, so we can swallow this error,
    // but this is not best practice in the real world!
  }

  data.request(() => {
    filter.filterData(() => {
      console.log('done!');
    });
  });
}

main();

