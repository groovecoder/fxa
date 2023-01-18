FROM mozilla/fxa-circleci:ci-latest AS fxa_base
# Empty pull. This has the latest and greatest from fxa.

FROM cimg/node:16.13-browsers

ENV FXA_AUTO_INSTALL=0

# Copy over the source from the ci-latest tag.
# Also copy caches and optimize to two layers
RUN --mount=type=bind,from=fxa_base,source=/,target=/fxa \
    cp -ra /fxa/home/circleci/.cache /home/circleci && \
    cp -ra /fxa/home/circleci/.npm /home/circleci; \
    cp -ra /fxa/home/circleci/.yarn /home/circleci;

RUN --mount=type=bind,from=fxa_base,source=/,target=/fxa \
    cp -ra /fxa/home/circleci/project /home/circleci;

# Install firefox
RUN npx playwright install firefox;
