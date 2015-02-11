# commissioner

`commissioner` is a configuration helper for node applications running on Docker and using `consul` as a service discovery. `commissioner` will help you if you're using linked containers during local development and `consul` on production.


## Example

```
commisioner('some_service', 123, function(err, addr, port) {
  console.log(addr);
  console.log(port);
});
```

In case of running on production where `consul.service.consul` is available this will return one of ip and port of container (in cluster) running some_service.

In case of running with linked containers `addr` is a ip of container running some_service. addr and port are extracted from ENV variables set by Docker.
