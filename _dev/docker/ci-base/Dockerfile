FROM cimg/node:16.13 AS fxa_build

# This is build occurs in the CI. Reference .circleci/config.yml
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV YARN_CHECKSUM_BEHAVIOR=throw
ENV FXA_AUTO_INSTALL=0

COPY --chown=circleci:circleci .yarn /home/circleci/.yarn
COPY --chown=circleci:circleci project /home/circleci/project

RUN yarn install --immutable --inline-builds; \
    git rev-parse HEAD > base_ref; \
    cp yarn.lock yarn.lock.base;
