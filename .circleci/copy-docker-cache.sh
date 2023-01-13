#!/bin/bash

# Starts the container and stores its ID. This assumes an image has a
CONTAINERID=$(docker create $1)
echo "Created Container: $CONTAINERID"

# Just to be safe, ensure .yarn folders
mkdir -p .yarn
mkdir -p ../.yarn

# Extract cached files from containers
docker cp $CONTAINERID:/home/circleci/.yarn ../.yarn
docker cp $CONTAINERID:/home/circleci/project/.yarn/build-state.yml .yarn/build-state.yml
docker cp $CONTAINERID:/home/circleci/project/.yarn/install-state.gz .yarn/install-state.gz

# Clean up running container
docker rm $CONTAINERID
