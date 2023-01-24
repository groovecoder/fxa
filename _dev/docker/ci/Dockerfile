# These builds occur in the CI. Reference .circleci/config.yml

FROM cimg/node:16.13 as base_install

ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV YARN_CHECKSUM_BEHAVIOR=throw
ENV FXA_AUTO_INSTALL=0

COPY --chown=circleci:circleci .yarn /home/circleci/.yarn
COPY --chown=circleci:circleci project /home/circleci/project

RUN yarn install --immutable --inline-builds; \
    git rev-parse HEAD > base_ref; \
    cp yarn.lock yarn.lock.base;

RUN rm -rf /home/circleci/project/packages/fxa-settings/fxa-content-server-l10n; \
    rm -rf /home/circleci/project/packages/fxa-content-server/fxa-content-server-l10n; \
    rm -rf /home/circleci/project/packages/fxa-auth-server/fxa-content-server-l10n; \
    ln -s /home/circleci/project/packages/fxa-react/fxa-content-server-l10n /home/circleci/project/packages/fxa-settings/fxa-content-server-l10n; \
    ln -s /home/circleci/project/packages/fxa-react/fxa-content-server-l10n /home/circleci/project/packages/fxa-content-server/fxa-content-server-l10n; \
    ln -s /home/circleci/project/packages/fxa-react/fxa-content-server-l10n /home/circleci/project/packages/fxa-auth-server/fxa-content-server-l10n;

# Setup browser based docker images for functional tests
FROM cimg/node:16.13-browsers as browsers_install

ENV FXA_AUTO_INSTALL=0

# Copy over base image state
COPY --chown=circleci:circleci --from=base_install /home/circleci /home/circleci

# Install firefox
RUN npx playwright install firefox


# Single layer images perform better
FROM cimg/node:16.13 as base
COPY --chown=circleci:circleci --from=base_install /home/circleci /home/circleci

FROM cimg/node:16.13-browsers as browsers_base
COPY --chown=circleci:circleci --from=browsers_install /home/circleci /home/circleci
# Copies over the installed browsers. TODO: Remove when we phase out content server tests
COPY --chown=circleci:circleci install /usr/local/bin/
