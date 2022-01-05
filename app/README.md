## Space Egress Test App

This application is a simple Node.js application that has two different endpoints. One uses the space egress proxy to request resources from the open web, and the other attempts a direct connection to resources on the open web.

This example is meant to simulate instances where you want to run an application in a [restricted](https://cloud.gov/docs/management/space-egress/#restricted-egress) or [closed egress](https://cloud.gov/docs/management/space-egress/#closed-egress) space that has a need to fetch specific resources from the open internet or from [S3](https://cloud.gov/docs/services/s3/).

## Deploy instructions

```bash
~$ cf target -o my-org -s restricted-egress-space
~$ cf push
```

## Notes

* After you have deployed this application, and the the egress proxy app, you'll need to set up a network policy to allow traffic from this application to use the proxy:

```bash
~$ cf add-network-policy {name-of-your-app} {name-of-your proxy-app} -s {proxy-app-space} -o {your-org} --protocol tcp --port 3128
```


