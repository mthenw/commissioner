var dns = require('dns');

module.exports = function(name, port, cb) {
  dns.resolveSrv(name + '.service.consul', function(err, addresses) {
    if (err) {
      var key = name.toUpperCase() + '_PORT_' + port + '_TCP_';
      var addrKey = key + 'ADDR';
      var portKey = key + 'PORT';

      cb(null, process.env[addrKey], process.env[portKey]);
    } else {
      cb(null, addresses[0].name, addresses[0].port);
    }
  });
};
