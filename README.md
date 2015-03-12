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
### Scenarios

#### Production environment with consul

Commissioner returns array of `addr` and `port` records for all containers running redis (based on DNS SRV record).

#### Local development with linked containers

Commissioner returns array with one record where `addr` and `port` are extracted from ENV variables set by Docker.
