const fs = require('node:fs/promises')

async function loadData() {
    try {
        const dataBuffer = await fs.readFile('data.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch(e) {
        return []
    }
}

async function filterData() {
    const data = await loadData();
    const filteredData = [];

    data.forEach(({ login, id }) => {
        filteredData.push(`${login} ${id}`);
    })
    await saveData('filtered-data', filteredData);
    return saveData('filtered-data-reversed', reverseFilteredData(filteredData))
}

async function saveData(filename, data) {
    for (i = 0; i < data.length; i++) {
        await fs.appendFile(filename, `${data[i]}\n`);
    }
}

function reverseFilteredData(data) {
    return data.map(el => el.split('').reverse().join(''));
}

module.exports = {filterData};
