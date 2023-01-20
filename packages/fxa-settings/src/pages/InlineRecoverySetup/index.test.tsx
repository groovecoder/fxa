/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../models/mocks';
// import { getFtlBundle, testL10n } from 'fxa-react/lib/test-utils';
// import { FluentBundle } from '@fluent/bundle';
import InlineRecoverySetup from '.';
import { logPageViewEvent } from '../../lib/metrics';
import { RECOVERY_CODES, SERVICE_NAME } from './mocks';

jest.mock('../../lib/metrics', () => ({
  logViewEvent: jest.fn(),
  logPageViewEvent: jest.fn(),
}));

describe('InlineRecoverySetup', () => {
  // let bundle: FluentBundle;
  // beforeAll(async () => {
  //   bundle = await getFtlBundle('settings');
  // });
  it('renders default content as expected', () => {
    renderWithRouter(
      <InlineRecoverySetup
        recoveryCodes={RECOVERY_CODES}
        showConfirmation={false}
      />
    );
    // const ftlMsgMock = screen.getAllByTestId('ftlmsg-mock')[1];
    // testL10n(ftlMsgMock, bundle, {
    //   email: exampleEmail,
    // });
    screen.getByRole('heading', {
      name: 'Save backup authentication codes to continue to account settings',
    });
    screen.getByText(
      'Store these one-time use codes in a safe place for when you don’t have your mobile device.'
    );
    // download, copy, print, cancel, continue
    screen.getByRole('button', { name: 'Download' });
    screen.getByRole('button', { name: 'Copy' });
    screen.getByRole('button', { name: 'Print' });
    screen.getByRole('button', { name: 'Cancel' });
    screen.getByRole('button', { name: 'Continue' });
  });
  it('renders as expected with a custom service name', () => {
    renderWithRouter(
      <InlineRecoverySetup
        recoveryCodes={RECOVERY_CODES}
        showConfirmation={false}
        serviceName={SERVICE_NAME}
      />
    );
    // const ftlMsgMock = screen.getAllByTestId('ftlmsg-mock')[1];
    // testL10n(ftlMsgMock, bundle, {
    //   email: exampleEmail,
    // });
    screen.getByRole('heading', {
      name: `Save backup authentication codes to continue to ${SERVICE_NAME}`,
    });
  });

  it('renders "showConfirmation" content as expected', () => {
    renderWithRouter(
      <InlineRecoverySetup
        recoveryCodes={RECOVERY_CODES}
        showConfirmation={true}
      />
    );
    // const ftlMsgMock = screen.getAllByTestId('ftlmsg-mock')[1];
    // testL10n(ftlMsgMock, bundle, {
    //   email: exampleEmail,
    // });
    screen.getByRole('heading', {
      name: 'Confirm backup authentication code to continue to account settings',
    });
    screen.queryByLabelText('Document that contains hidden text.');
    screen.getByLabelText('Backup authentication code');
    screen.getByRole('button', { name: 'Confirm' });
    screen.getByRole('button', { name: 'Back' });
    screen.getByRole('button', { name: 'Cancel setup' });
  });
  it('renders "showConfirmation" content as expected with a custom service name', () => {
    renderWithRouter(
      <InlineRecoverySetup
        recoveryCodes={RECOVERY_CODES}
        showConfirmation={true}
        serviceName={SERVICE_NAME}
      />
    );
    // const ftlMsgMock = screen.getAllByTestId('ftlmsg-mock')[1];
    // testL10n(ftlMsgMock, bundle, {
    //   email: exampleEmail,
    // });
    screen.getByRole('heading', {
      name: `Confirm backup authentication code to continue to ${SERVICE_NAME}`,
    });
  });
  it('renders as expected when context is iOS', () => {
    renderWithRouter(
      <InlineRecoverySetup
        recoveryCodes={RECOVERY_CODES}
        showConfirmation={false}
        isIos={true}
      />
    );
    // const ftlMsgMock = screen.getAllByTestId('ftlmsg-mock')[1];
    // testL10n(ftlMsgMock, bundle, {
    //   email: exampleEmail,
    // });
    const downloadButton = screen.queryByText('Download');
    const copyButton = screen.queryByText('Copy');
    const printButton = screen.queryByText('Print');

    expect(copyButton).toBeInTheDocument();
    expect(downloadButton).not.toBeInTheDocument();
    expect(printButton).not.toBeInTheDocument();
  });

  it('emits the expected metrics on render', async () => {
    renderWithRouter(
      <InlineRecoverySetup
        recoveryCodes={RECOVERY_CODES}
        showConfirmation={false}
      />
    );
    expect(logPageViewEvent).toHaveBeenCalledWith('inline-recovery-setup', {
      entrypoint_variation: 'react',
    });
  });
});
