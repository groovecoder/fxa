#!/bin/bash

CONTAINERID=$(docker create mozilla/fxa-circleci:ci-base-latest)
echo "Created Container: $CONTAINERID"

mkdir -p .yarn
mkdir -p ../.yarn

docker cp $CONTAINERID:/home/circleci/.yarn ../.yarn
docker cp $CONTAINERID:/home/circleci/project/.yarn/build-state.yml .yarn/build-state.yml
docker cp $CONTAINERID:/home/circleci/project/.yarn/install-state.gz .yarn/install-state.gz
docker rm $CONTAINERID
