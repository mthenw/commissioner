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
    process.env = [];
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

  it(
    'should query DNS with consul service domain (including port)',
    function(done) {
      resolveSrv.withArgs('some_service.service.consul').yields(new Error());
      resolveSrv.withArgs('some_service-123.service.consul').yields(null, [{
        name: 'addr1',
        port: 6000
      }]);

      commissioner('some_service', 123, function(err, records) {
        dns.resolveSrv.calledWith('some_service-123.service.consul')
          .should.be.true;
        records[0].addr.should.equal('addr1');

        done();
      });
    }
  );

  it('should get service IP/PORT from ENV', function(done) {
    resolveSrv.yields(new Error());

    process.env['SOME_SERVICE_PORT_123_TCP_ADDR'] = '1.1.1.1';
    process.env['SOME_SERVICE_PORT_123_TCP_PORT'] = '567';

    commissioner('some_service', 123, function(err, records) {
      records[0].addr.should.equal('1.1.1.1');
      records[0].port.should.equal('567');
      done();
    });
  });

  it('should return error if every step failed', function(done) {
    resolveSrv.yields(true);

    commissioner('some_service', 123, function(err, records) {
      err.should.be.instanceOf(Error);
      done();
    });
  });

  it('should use fallback if passed and every step failed', function(done) {
    resolveSrv.yields(true);

    var options = {
      fallbackAddr: '2.2.2.2',
      fallbackPort: 456
    };

    commissioner('some_service', 123, options, function(err, records) {
      records[0].addr.should.equal('2.2.2.2');
      records[0].port.should.equal(456);
      done();
    });
  });
});
