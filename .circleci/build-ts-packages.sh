#/bin/bash -ex

# Only rebuild packages that have changes since the container's
# base_ref, which holds the commit from which the container was built.
# This works, because when the container image is created, we
# also compile the workspaces.
yarn workspaces foreach \
    -piv \
    --topological-dev \
    --since=$(cat base_ref) \
    run compile;
