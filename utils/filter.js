const fs = require('fs')


const loadData = () => {
    try {
        const dataBuffer = fs.readFileSync('data.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch(e) {
        return []
    }
}

const filterData = () => {
    const data = loadData();
    const filteredData = [];

    data.forEach((el) => {
        filteredData.push(el.login + " " + el.id)
    })
    saveFiltered(filteredData);
}

const saveFiltered = (data) => {
    let i = 0;
    while (i < data.length) {
        fs.appendFileSync('filteredData.txt', `${data[i]}\n`);
        i++;
    }
    reverseFiltered(data);
}

const reverseFiltered = (data) => {
    let i = 0;
    while ( i < data.length) {
        const reversedElement = data[i].split("").reverse().join("");
        fs.appendFileSync('filteredDataReversed.txt', `${reversedElement}\n`);
        i++;
    }
}

module.exports = {filterData};
