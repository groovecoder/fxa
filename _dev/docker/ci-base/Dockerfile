FROM cimg/node:16.13 AS fxa_build

ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV YARN_CHECKSUM_BEHAVIOR=throw
ENV FXA_AUTO_INSTALL=0

COPY --chown=circleci:circleci . .
COPY --chown=circleci:circleci .yarn-global/ /home/circleci/.yarn

RUN git rev-parse HEAD > base_ref; \
    cp yarn.lock yarn.lock.base; \
    yarn install --immutable; \
    yarn workspaces foreach --topological-dev -piv run compile;

FROM cimg/node:16.13 AS END

RUN --mount=type=bind,from=fxa_build,source=/,target=/fxa \
    cp -ra /fxa/home/circleci/.yarn /home/circleci && \
    cp -ra /fxa/home/circleci/.npm /home/circleci && \
    cp -ra /fxa/home/circleci/.cache /home/circleci && \
    cp -ra /fxa/home/circleci/project /home/circleci;
