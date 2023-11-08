const fsPromises = require('node:fs/promises')
const fs = require('fs')

async function loadData() {
    try {
        const dataBuffer = await fsPromises.readFile('data.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch(e) {
        return []
    }
}

async function filterData(filterDataCompleteCallback) {
    const data = await loadData();
    const filteredData = data.map(({ login, id }) => `${login} ${id}`);

    saveData('filtered-data', filteredData).on('finish', () => {
      saveData('filtered-data-reversed', reverseFilteredData(filteredData))
        .on('finish', filterDataCompleteCallback);
    });
}

function saveData(filename, data) {
    const fileWriteStream = fs.createWriteStream(filename);
    data.forEach(user => fileWriteStream.write(`${user}\n`));
    fileWriteStream.end();

    return fileWriteStream;
}

function reverseFilteredData(data) {
    return data.map(el => el.split('').reverse().join(''));
}

module.exports = {filterData};
