# commissioner

[![Build Status](https://img.shields.io/travis/mthenw/commissioner.svg?style=flat)](https://travis-ci.org/mthenw/commissioner)
[![Version](http://img.shields.io/npm/v/commissioner.svg?style=flat)](https://www.npmjs.org/package/commissioner)

`commissioner` is a small configuration helper for node.js services running on Docker and using `consul` as a service discovery. `commissioner` will help you if you're using linked containers during development and `consul` on production.


## Example

```
var service_name = 'redis';
var service_port = 6379;

commisioner(service_name, service_port, function(err, records) {
  console.log(records[0].addr);
  console.log(records[0].port);
});
```
### Scenerios

#### Productions with consul

Commissioner returns array of `addr` and `port` records for all containers running redis (based on DNS SRV record).

#### Local development with linked containers

Commissioner returns array with one record where `addr` and `port` are extracted from ENV variables set by Docker.
