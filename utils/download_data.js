const https = require('https')
const fs = require('fs')



//GitHub API requires user-agent

function request() {
    return new Promise ((resolve) => {
        var options = {
            host: 'api.github.com',
            path: '/users',
            method: 'GET',
            headers: {'user-agent': 'node.js'}
        };
    
        https.get(options, (res) => {
        
            let data = ''
    
            res.on('data', (chunk) => {
                data += chunk.toString('utf8');
            });
    
            //saveData(data);
    
            //The whole response has been received. Print out the result.
            res.on('end', () => {
                // saveData(data);
                //console.log("Data: ", data);
                fs.writeFileSync('data.JSON', data);
                console.log("finished saving data")
                resolve();
            });

        })
    });   
        //console.log("finished download data")
        // const saveData = (data) => {
        //     fs.writeFileSync('data.JSON', data);
        //     console.log("finished saving data")

        // };

};


module.exports = {request};
