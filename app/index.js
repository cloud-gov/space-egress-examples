const https = require('https');
const ProxyAgent = require('proxy-agent');

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const proxyUri = 'http://test-egress-rules-proxy.apps.internal:3128';

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/proxy/:host', (req, res) => {
    var opts = {
        method: 'GET',
        host: req.params.host,
        path: '/',
        agent: new ProxyAgent(proxyUri)
    };
    https.get(opts, (response) => {
        if (response.statusCode != 200) {
            res.send("Unable to access that resource");
        }
        else {
            res.set('Content-Type', 'text/html');
            response.pipe(res);
        }
    });
});

app.get('/noproxy/:host', (req, res) => {
    var opts = {
        method: 'GET',
        host: req.params.host,
        path: '/'
    };
    https.get(opts, (response) => {
        if (response.statusCode != 200) {
            res.send("Unable to access that resource");
        }
        else {
            response.pipe(res);
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening at port: ${port}`);
})