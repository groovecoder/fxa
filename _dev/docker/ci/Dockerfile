FROM cimg/node:16.13 as base

# This is build occurs in the CI. Reference .circleci/config.yml
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV YARN_CHECKSUM_BEHAVIOR=throw
ENV FXA_AUTO_INSTALL=0

COPY --chown=circleci:circleci .yarn /home/circleci/.yarn
COPY --chown=circleci:circleci project /home/circleci/project

RUN yarn install --immutable --inline-builds; \
    git rev-parse HEAD > base_ref; \
    cp yarn.lock yarn.lock.base;\
    rm -rf /home/circleci/project/packages/fxa-settings/fxa-content-server-l10n; \
    rm -rf /home/circleci/project/packages/fxa-content-server/fxa-content-server-l10n; \
    rm -rf /home/circleci/project/packages/fxa-auth-server/fxa-content-server-l10n; \
    ln -s /home/circleci/project/packages/fxa-react/fxa-content-server-l10n /home/circleci/project/packages/fxa-settings/fxa-content-server-l10n; \
    ln -s /home/circleci/project/packages/fxa-react/fxa-content-server-l10n /home/circleci/project/packages/fxa-content-server/fxa-content-server-l10n; \
    ln -s /home/circleci/project/packages/fxa-react/fxa-content-server-l10n /home/circleci/project/packages/fxa-auth-server/fxa-content-server-l10n;

FROM cimg/node:16.13-browsers as browsers

ENV FXA_AUTO_INSTALL=0

# Copy over the installed browsers
COPY --chown=circleci:circleci ./install /usr/local/bin/

# Copy over base image state
COPY --chown=circleci:circleci --from=base /home/circleci/.cache /home/circleci/.cache
COPY --chown=circleci:circleci --from=base /home/circleci/.npm /home/circleci/.npm
COPY --chown=circleci:circleci --from=base /home/circleci/.yarn /home/circleci/.yarn
COPY --chown=circleci:circleci --from=base /home/circleci/project /home/circleci/project

# Install firefox
RUN npx playwright install firefox
