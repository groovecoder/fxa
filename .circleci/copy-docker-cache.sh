#!/bin/bash

docker create --name temp mozilla/fxa-circleci:ci-base-browsers-latest
docker cp temp:/home/circleci/.yarn/berry ../.yarn/berry
docker cp temp:/home/circleci/project/.yarn/build-state.yml .yarn/build-state.yml
docker cp temp:/home/circleci/project/.yarn/install-state.gzs .yarn/install-state.gzs
docker rm container
