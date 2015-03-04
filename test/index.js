var commisioner  = require('../');

describe('commisioner', function() {
  it('should get service address from env', function(done) {
    process.env['SOME_SERVICE_PORT_123_TCP_ADDR'] = '0.0.0.0';

    commisioner('some_service', 123, function(err, addr) {
      addr.should.equal('0.0.0.0');
      done();
    });
  });

  it('should get service port from env', function(done) {
    process.env['SOME_SERVICE_PORT_123_TCP_PORT'] = '567';

    commisioner('some_service', 123, function(err, addr, port) {
      port.should.equal('567');
      done();
    });
  });
});
