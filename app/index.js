const https = require('https');
const ProxyAgent = require('proxy-agent');
const cfenv = require('cfenv');

// URL of proxy app.
const proxyUri = process.env.proxyUri;

// Get S3 Bucket name from bound service.
const getBucketName = () => {
    let appEnv = cfenv.getAppEnv();
    let services = appEnv.getServices();
    let s3 = services["egress-test-s3"]; // Or whatever you named your service. 
    return s3.credentials.bucket;
}

// Run express
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Example app listening at port: ${port}`);
});

// Default HTTPS request options.
let defaultOpts = {
    method: 'GET',
    host: 's3-us-gov-west-1.amazonaws.com',
    port: 443,
};

// Helper method to make HTTP request.
const makeGetRequest = (opts, res) => {
    request = https.request(opts, (response) => {
        if (response.statusCode != 200) {
            res.send(`Unable to access that resource: ${response.statusCode}`);
        }
        else {
            res.set('Content-Type', 'image/png');
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
app.get('/proxy/:file', (req, res) => {
    const opts = defaultOpts;
    opts.agent = new ProxyAgent(proxyUri);
    opts.path = `/${getBucketName()}/${req.params.file}`;
    makeGetRequest(opts, res);
});

// Route that bypasses proxy.
app.get('/noproxy/:file', (req, res) => {
    const opts = defaultOpts;
    opts.path = `/${req.params.file}`;
    makeGetRequest(opts, res);
    res.end();
});