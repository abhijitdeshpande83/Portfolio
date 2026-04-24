#!/bin/bash

#Variables
DOCKER_USER=${1}
IMG_TAG=${2}

#Docker login
docker login

docker buildx build --platform linux/amd64 -t $DOCKER_USER/portfolio:$IMG_TAG --push .