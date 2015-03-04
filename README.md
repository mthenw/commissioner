# commissioner

`commissioner` is a configuration helper for node services running on Docker and using `consul` as a service discovery. `commissioner` will help you if you're using linked containers during local development and `consul` on production.


## Example

```
var service_name = 'redis';
var service_port = 6379;

commisioner(service_name, service_port, function(err, addr, port) {
  console.log(addr);
  console.log(port);
});
```
### Scenerios

#### Productions with consul

Commissioner returns `addr` and `port` of one (random) of containers running redis (based on DNS SRV record).

#### Local development with linked containers

`addr` and `port` are extracted from ENV variables set by Docker.
