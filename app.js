const fs = require('node:fs/promises');
const data = require('./utils/download-data.js');
const filter = require('./utils/filter.js');
const {
    dataFile,
    filteredFile,
    filteredFileReversed,
} = require('./app.config');

async function main() {
    try {
        await Promise.all([
            fs.truncate(dataFile),
            fs.truncate(filteredFile),
            fs.truncate(filteredFileReversed),
        ]);
    } catch {
        // This error is most likely that these files don't exist.
        // The application code will create it, so we can swallow this error,
        // but this is not best practice in the real world!
    }

    data.retrieveGitHubUsers((_, responseError) => {
        if (responseError) {
            console.error(
                'There was an error attempting to download the data',
                responseError,
            );
            process.exit(1);
        }
        filter.loadAndFilterData((_, loadError) => {
            if (loadError) {
                console.log(
                    'There was an error loading and filtering the data',
                    loadError,
                );
                process.exit(1);
            }
            console.log('done!');
        });
    });
}

main();
