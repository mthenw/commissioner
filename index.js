var dns = require('dns');

module.exports = function(name, port, options, cb) {
  if (typeof(options) === 'function') {
    cb = options;
    options = null;
  }

  dns.resolveSrv(name + '.service.consul', function(err, records) {
    if (!err) { cb(null, parseDnsRecords(records));
    } else {
      var serviceDomain = name + '-' + port + '.service.consul';
      dns.resolveSrv(serviceDomain, function(err, records) {
        if (!err) { cb(null, parseDnsRecords(records));
        } else {
          queryDNSForLinkedContainers(name, port, options, cb);
        }
      });
    }
  });
};

function parseDnsRecords(records) {
  return records.map(function(record) {
    return {addr: record.name, port: record.port};
  });
}

function queryDNSForLinkedContainers(name, port, options, cb) {
  dns.lookup(name, function(err, addr) {
    if (err) {
      if (options && options.fallbackAddr && options.fallbackPort) {
        cb(null, [{
          addr: options.fallbackAddr,
          port: options.fallbackPort
        }]);
      } else {
        cb(new Error('Couldn\'t not resolve service'));
      }
    } else {
      cb(null, [{
        addr: addr,
        port: getContainerPort(name, port)
      }]);
    }
  });
}

function getContainerPort(name, port) {
  var key = name.toUpperCase() + '_PORT_' + port + '_TCP_PORT';
  return process.env[key];
}
