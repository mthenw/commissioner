module.exports = function(name, port, cb) {
  var key = name.toUpperCase() + '_PORT_' + port + '_TCP_';
  var addrKey = key + 'ADDR';
  var portKey = key + 'PORT';

  cb(null, process.env[addrKey], process.env[portKey]);
}
