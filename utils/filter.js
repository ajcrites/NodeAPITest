const fs = require('fs')
const { chain } = require('stream-chain');
const StreamArray = require('stream-json/streamers/StreamArray');
const Fork = require('stream-fork');

function loadAndFilterData() {
    const filterOperations = [
        fs.createReadStream('data.json'),
        StreamArray.withParser(),
        ({ value: { login, id } }) => `${login} ${id}\n`,
    ];

    const forkStream = new Fork([
        fs.createWriteStream('filtered-data'),
        chain([
          userData => `${userData.toString().trim().split('').reverse().join('')}\n`,
          fs.createWriteStream('filtered-data-reversed'),
        ]),
    ], {});

    chain(filterOperations).pipe(forkStream);
}

module.exports = { loadAndFilterData };
