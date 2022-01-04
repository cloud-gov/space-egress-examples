## Space Egress Proxy

This application deploys a simple proxy application made up of the Docker image in the `docker` directory.

## Deploy instructions

Copy the file `vars.yml.example` to `vars.yml` and deploy as follows:

```bash
~$ cf target -o my-org -s public-egress-space
~$ cf push --vars-file vars.yml
```

## Notes

* This proxy runs in a [public egress space](https://cloud.gov/docs/management/space-egress/#public-egress) (meaning that originating traffic can be sent to the open internet), and on an [internal route](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html#internal-routes) (meaning only other apps running on the platform can send traffic to it).

* The proxy application is configured to only allow outbound traffic to domains listed in the [access control list](http://www.squid-cache.org/Doc/config/acl/) (see the `squid.conf` file in the `docker` directory.)