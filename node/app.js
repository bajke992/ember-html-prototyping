var express = require('express');
var app = express();

app.get('/', function(req, res) {

    var body = 'Hello World';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', Buffer.byteLength(body));
    res.end(body);
});

app.listen(9000);
console.log('Listening on port 9000');