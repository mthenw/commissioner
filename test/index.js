var commissioner  = require('../');
var dns = require('dns');
var sinon = require('sinon');

describe('commisioner', function() {
  var resolveSrv;

  beforeEach(function() {
    resolveSrv = sinon.stub(dns, 'resolveSrv');
  });

  afterEach(function() {
    dns.resolveSrv.restore();
  });

  it('should query DNS with consul service domain', function(done) {
    resolveSrv.yields(null, [{
      name: 'addr1',
      port: 6000
    }]);

    commissioner('some_service', 123, function(err, records) {
      dns.resolveSrv.calledWith('some_service.service.consul').should.be.true;
      records[0].addr.should.equal('addr1');

      done();
    });
  });

  it('should get service ip from env', function(done) {
    resolveSrv.yields(true);

    process.env['SOME_SERVICE_PORT_123_TCP_ADDR'] = '0.0.0.0';

    commissioner('some_service', 123, function(err, records) {
      records[0].addr.should.equal('0.0.0.0');
      done();
    });
  });

  it('should get service port from env', function(done) {
    resolveSrv.yields(true);

    process.env['SOME_SERVICE_PORT_123_TCP_PORT'] = '567';

    commissioner('some_service', 123, function(err, records) {
      records[0].port.should.equal('567');
      done();
    });
  });
});
