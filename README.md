# space-egress-examples

## Why this project

**Note - this work is still in progress.**

This repository is used to provide examples for how to leverage the different [space egress types](https://cloud.gov/docs/management/space-egress/) on cloud.gov.

## Example overview

This example demonstrates one way of leveraging the space egress types on cloud.gov to more securely run an application that needs to respond to requests, and access resources at specific location on the open web or artifacts in an S3 bucket. 

![Egress application example](egress-app-example.jpg?raw=true "Egress application example")

* The application (in this case a simple Node.js application) runs in a restricted egress space. 
* A Docker image running squid proxy runs in a public egress space, on an internal route.
* The squid proxy is configured to only allow access to specific domains via an access control list (ACL) directive.
* A network policy is created to allow the Node.js application to connect to the squid proxy. Because the proxy is running on an internal route, we can ensure that only the Node.js application can access it.

## Deploying this demo

1. Configure squid & build [Docker image](docker)
2. Push Docker image to repo.
3. Deploy [proxy app](proxy) in public egress space on internal route.
4. Deploy [demo app](app) to restricted / closed egress space.
5. Set up network policy to allow demo app to route traffic through proxy.

## Pros & cons to this approach

* Using a proxy on an internal route allows for granular control over which applications may access it using [network policies](https://docs.cloudfoundry.org/devguide/deploy-apps/cf-networking.html#create-policies).
* Using an internal route allows Docker image to use [non-standard port](https://cloud.gov/docs/deployment/docker/#using-non-standard-ports-in-docker-containers) (by default squid runs on port 3128). 
* Additional steps required to make changes when needed and repush Docker image, and redeploy app.
* Potentially some additional compliance burden from using Docker image [over buildpack](https://github.com/cloud-gov/space-egress-examples/issues/3).

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for additional information.

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.
