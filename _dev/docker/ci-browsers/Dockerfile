FROM mozilla/fxa-circleci:ci-base-latest AS fxa_base
# Empty pull. This has the latest and greatest from fxa.

FROM cimg/node:16.13-browsers

ENV FXA_AUTO_INSTALL=0

# Copy over the installed browsers
COPY --chown=circleci:circleci ./install /usr/local/bin/.

# Copy over the source from the ci-base-latest tag.
# Also copy caches and optimize to a single layer
RUN --mount=type=bind,from=fxa_base,source=/,target=/fxa \
    cp -ra /fxa/home/circleci/.yarn /home/circleci && \
    cp -ra /fxa/home/circleci/.npm /home/circleci && \
    cp -ra /fxa/home/circleci/.cache /home/circleci && \
    cp -ra /fxa/home/circleci/project /home/circleci && \
    npx playwright install firefox;
