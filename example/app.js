var http = require('http');
var redis = require('redis');
var commissioner = require('commissioner');

var client;
commissioner('db', 6379, function(err, records) {
  if (err) {
    console.log(err);
  } else {
    client = redis.createClient(records[0].port, records[0].addr);
  }
});

http.createServer(function(req, res) {
  client.incr('visits');
  client.get('visits', function(err, count) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Visited: ' + count);
  });
}).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');
