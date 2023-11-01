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
    console.log("In filtered data")

    const data = loadData();
    var filteredData = [];

    data.forEach((el) => {
        filteredData.push(el.login + " " + el.id)
    })
    console.log(filteredData)
    saveFiltered(filteredData);

}

const saveFiltered = (data) => {
    
    let i = 0;
    while ( i < data.length) {
        fs.appendFile('filteredData.txt', data[i] + "\n", function (err) {
        if (err) throw err});

        i++;
        console.log("in while loop")
     }
    reverseFiltered(data);
}

const reverseFiltered = (data) => {
    let i = 0;
    while ( i < data.length) {
        
        var reversedElement = data[i].split("").reverse().join("");

        fs.appendFile('filteredDataReversed.txt', reversedElement + "\n", function (err) {
        if (err) throw err});

        i++;
        console.log("in reverse while loop")
    }
}



module.exports = {filterData};
