const https = require('https');
const ProxyAgent = require('proxy-agent');

// URL of proxy app.
const proxyUri = 'http://test-egress-rules-proxy.apps.internal:3128';

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Example app listening at port: ${port}`);
});

// Request options.
let opts = {
    method: 'GET',
    port: 443,
    path: '/'
};

// Helper method to make HTTP request.
makeGetRequest = (opts, res) => {
    request = https.request(opts, (response) => {
        if (response.statusCode != 200) {
            res.send(`Unable to access that resource: ${response.statusCode}`);
        }
        else {
            response.pipe(res);
        }
    });
    request.on("error", (e) => {
        console.error(e);
    });
    request.end();
};

// Default route.
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Route to request resource through proxy.
app.get('/proxy/:host', (req, res) => {
    opts.agent = new ProxyAgent(proxyUri);
    opts.host = req.params.host;
    makeGetRequest(opts, res);
});

// Route that bypasses proxy.
app.get('/noproxy/:host', (req, res) => {
    delete opts.agent;
    opts.host = req.params.host;
    makeGetRequest(opts, res);
    res.end();
});