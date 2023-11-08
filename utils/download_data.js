const https = require('https');
const fs = require('fs');

//GitHub API requires user-agent

function request(resolve) {
    const options = {
        host: 'api.github.com',
        path: '/users',
        method: 'GET',
        headers: {'user-agent': 'node.js'}
    };

    https.get(options, (response) => {
        const dataJsonFileStream = fs.createWriteStream('./data.json');
        response.pipe(dataJsonFileStream);

        response.on('end', resolve);
    });
};


module.exports = {request};
