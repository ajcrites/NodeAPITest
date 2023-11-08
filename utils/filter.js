const fs = require('fs');
const { chain } = require('stream-chain');
const StreamArray = require('stream-json/streamers/StreamArray');
const Fork = require('stream-fork');
const {
    dataFile,
    filteredFile,
    filteredFileReversed,
} = require('../app.config');

function loadAndFilterData(loadAndFilterCallback) {
    const filterOperations = [
        fs.createReadStream(dataFile),
        StreamArray.withParser(),
        ({ value: { login, id } }) => `${login} ${id}\n`,
    ];

    const forkStream = new Fork(
        [
            fs.createWriteStream(filteredFile),
            chain([
                (userData) =>
                    `${userData
                        .toString()
                        .trim()
                        .split('')
                        .reverse()
                        .join('')}\n`,
                fs.createWriteStream(filteredFileReversed),
            ]),
        ],
        {},
    );

    const pipeline = chain(filterOperations);

    pipeline.on('end', loadAndFilterCallback);
    pipeline.on('error', (error) => loadAndFilterCallback(null, error));

    pipeline.pipe(forkStream);
}

module.exports = { loadAndFilterData };
