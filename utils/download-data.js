const https = require('https');
const fs = require('fs');
const { dataFile } = require('../app.config');

//GitHub API requires user-agent

function retrieveGitHubUsers(resolveCallback) {
    const options = {
        host: 'api.github.com',
        path: '/users',
        method: 'GET',
        headers: { 'user-agent': 'node.js' },
    };

    https
        .get(options, (response) => {
            const dataJsonFileStream = fs.createWriteStream(dataFile);
            response.pipe(dataJsonFileStream);

            response.on('end', resolveCallback);
        })
        .on('error', (httpError) => resolveCallback(null, httpError));
}

module.exports = { retrieveGitHubUsers };
