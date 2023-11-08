const https = require('https');
const fs = require('node:fs/promises');

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

            //The whole response has been received. Print out the result.
            res.on('end', async () => {
                await fs.writeFile('data.json', data);
                resolve();
            });

        })
    });
};


module.exports = {request};
