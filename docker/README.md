## Space Egress Proxy Docker Image

This Dockerfile can be used to create an image for squid 3.5.27. It was adapted from [this project](https://github.com/sameersbn/docker-squid).

When deployed to cloud.gov, it can be used to restrict outbound traffic from applications running in a restricted or closed egress space.

## Deploy instructions

In order to deploy this application, you must build a Docker image and [push it to a public image repository](https://cloud.gov/docs/deployment/docker/).

Before building the image, make any needed changes to the `acl` directives in the `squid.conf` file, most importantly the directive for `dstdomain`. Once modified, build and push your image:

```bash
~$ docker build -t {user}/{image} -f Dockerfile .
~$ docker push {user}/{image}:{tag}
```

## Notes

* After you push this image, you'll need to use path to this image in the public or private repo where it is housed to deploy the proxy app. Details are in the `proxy` directory.