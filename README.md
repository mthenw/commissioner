# commissioner

[![Build Status](https://img.shields.io/travis/mthenw/commissioner.svg?style=flat)](https://travis-ci.org/mthenw/commissioner)
[![Version](http://img.shields.io/npm/v/commissioner.svg?style=flat)](https://www.npmjs.org/package/commissioner)

`commissioner` is a small configuration helper for node.js services. It will help you if meet the following:

1. use [Docker](https://github.com/docker/docker)/[Docker Compose](https://github.com/docker/compose) (linked containers),
2. and/or use [consul](https://consul.io) for service discovery,
3. you don't want to care about environment in which you application runs, you just want to get IP and port of dependent service.


## Example

```
var service_name = 'redis';
var service_port = 6379;

commisioner(service_name, service_port, function(err, records) {
  console.log(records[0].addr);
  console.log(records[0].port);
});
```

or with fallback

```
var options = {
  fallbackAddr: 'localhost',
  fallbackPort: 6379
};

commisioner(service_name, service_port, options, function(err, records) {
  console.log(records[0].addr);
  console.log(records[0].port);
});
```

### Strategy

1. Query DNS (SRV) for `<service_name>.consul.service` and return records, if not found goto #2.
2. Query DNS (SRV) for `<service_name>-<port>.consul.service` and return records, if not found goto 3.
3. Query DNS (A) for `<service_name>` ([/etc/hosts in container](https://docs.docker.com/userguide/dockerlinks/#important-notes-on-docker-environment-variables)), get port from ENV ([Environment Variables in container](https://docs.docker.com/userguide/dockerlinks/#environment-variables)) and return, if not found goto 4.
4. if fallback addr and port passed, return them, otherwise return error.
