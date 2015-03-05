var dns = require('dns');

function getFromDockerEnv(name, port) {
  var key = name.toUpperCase() + '_PORT_' + port + '_TCP_';
  var addrKey = key + 'ADDR';
  var portKey = key + 'PORT';

  return {
    addr: process.env[addrKey],
    port: process.env[portKey]
  };
}

function parseDnsRecords(records) {
  return records.map(function(record) {
    return {addr: record.name, port: record.port};
  });
}

module.exports = function(name, port, cb) {
  dns.resolveSrv(name + '.service.consul', function(err, records) {
    if (err) {
      cb(null, [getFromDockerEnv(name, port)]);
    } else {
      cb(null, parseDnsRecords(records));
    }
  });
};
