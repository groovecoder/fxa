/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { logPageViewEvent } from '../../lib/metrics';
import { FtlMsg } from 'fxa-react/lib/utils';
import { useFtlMsgResolver } from '../../models';
import InputText from '../../components/InputText';
import { ReactComponent as CopyIcon } from './recovery_code_copy.svg';
import { ReactComponent as DownloadIcon } from './recovery_code_download.svg';
import { ReactComponent as PrintIcon } from './recovery_code_print.svg';
import { ReactComponent as RecoveryCodesGraphic } from '../Signin/SigninRecoveryCode/graphic_recovery_codes.svg';

export type InlineRecoverySetupProps = {
  isIos?: boolean;
  recoveryCodes: Array<string>;
  serviceName?: string;
  showConfirmation: boolean;
};

const InlineRecoverySetup = ({
  isIos,
  recoveryCodes,
  serviceName,
  showConfirmation,
}: InlineRecoverySetupProps & RouteComponentProps) => {
  logPageViewEvent('inline-recovery-setup', {
    entrypoint_variation: 'react',
  });

  const ftlMsgResolver = useFtlMsgResolver();
  const localizedInputTextLabel = ftlMsgResolver.getMsg(
    'inline-recovery-backup-authentication-code',
    'Backup authentication code'
  );
  const localizedCopyButtonTitle = ftlMsgResolver.getMsg('copy-button', 'Copy');
  const localizedDownloadButtonTitle = ftlMsgResolver.getMsg(
    'inline-recovery-download-button',
    'Download'
  );
  const localizedPrintButtonTitle = ftlMsgResolver.getMsg(
    'inline-recovery-print-button',
    'Print'
  );
  const localizedGraphicAriaLabel = ftlMsgResolver.getMsg(
    'inline-recovery-setup-image-description',
    'Document that contains hidden text.'
  );

  /* TODO: - Add in copy/download/print/continue/cancel actions for all buttons
   *       - Add in metrics for all events
   *       - Add tests for all metrics
   */
  const printCode = () => {};
  const copyCode = () => {};
  const downloadCode = () => {};
  const cancelSetup = () => {};
  const continueSetup = () => {};

  return (
    <>
      {showConfirmation ? (
        <>
          <div className="mb-4">
            {serviceName ? (
              <FtlMsg id="inline-recovery-confirmation-header">
                <h1 className="card-header">
                  Confirm backup authentication code{' '}
                  <span className="card-subheader">{`to continue to ${serviceName}`}</span>
                </h1>
              </FtlMsg>
            ) : (
              <FtlMsg id="inline-recovery-confirmation-header-default">
                <h1 className="card-header">
                  Confirm backup authentication code{' '}
                  <span className="card-subheader">
                    to continue to account settings
                  </span>
                </h1>
              </FtlMsg>
            )}
          </div>
          <section>
            <form noValidate>
              <div>
                <RecoveryCodesGraphic
                  role="img"
                  aria-label={localizedGraphicAriaLabel}
                  className="mx-auto"
                />
                <FtlMsg id="inline-recovery-confirmation-description">
                  <p className="text-sm mb-6">
                    To ensure that you will be able to regain access to your
                    account in the event of a lost device, please enter one of
                    your saved backup authentication codes.
                  </p>
                </FtlMsg>
                <InputText
                  label={localizedInputTextLabel}
                  className="tooltip-below recovery-code text-start my-4"
                  anchorStart={true}
                  required
                  autoFocus
                  autoComplete="off"
                />
                <FtlMsg id="inline-recovery-confirm-button">
                  <button type="submit" className="cta-primary cta-xl w-full">
                    Confirm
                  </button>
                </FtlMsg>
                <div className="flex justify-between mt-4">
                  <FtlMsg id="inline-recovery-back-link">
                    <button className="link-blue text-sm">Back</button>
                  </FtlMsg>
                  <FtlMsg id="inline-recovery-cancel-setup">
                    <button className="link-blue text-sm">Cancel setup</button>
                  </FtlMsg>
                </div>
              </div>
            </form>
          </section>
        </>
      ) : (
        <>
          <div className="mb-4">
            {serviceName ? (
              <FtlMsg id="inline-recovery-setup-header" vars={{ serviceName }}>
                <h1 className="card-header">
                  Save backup authentication codes{' '}
                  <span className="card-subheader">{`to continue to ${serviceName}`}</span>
                </h1>
              </FtlMsg>
            ) : (
              <FtlMsg id="inline-recovery-setup-header-default">
                <h1 className="card-header">
                  Save backup authentication codes{' '}
                  <span className="card-subheader">
                    to continue to account settings
                  </span>
                </h1>
              </FtlMsg>
            )}
          </div>
          <section>
            <FtlMsg id="inline-recovery-setup-message">
              <p className="text-sm mb-6">
                Store these one-time use codes in a safe place for when you
                don’t have your mobile device.
              </p>
            </FtlMsg>
            <div>
              <div className="flex rounded-xl px-7 font-mono text-center text-sm text-green-900 bg-green-800/10 flex-wrap relative mb-6 py-4">
                {recoveryCodes.map((code) => {
                  return <div className="flex-50% py-1">{code}</div>;
                })}
              </div>
              {isIos ? (
                <div className="flex justify-center w-4/5 max-w-48 mx-auto fill-grey-500">
                  <button
                    title={localizedCopyButtonTitle}
                    className="w-12 h-12 relative inline-block text-grey-500 rounded active:text-blue-600  active:fill-blue-600 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 hover:bg-grey-50"
                    onClick={copyCode}
                  >
                    <CopyIcon
                      className="mx-auto"
                      role="img"
                      aria-label={localizedCopyButtonTitle}
                    />
                    {localizedCopyButtonTitle}
                  </button>
                </div>
              ) : (
                <div className="flex justify-between w-4/5 max-w-48 mx-auto fill-grey-500">
                  <button
                    title={localizedDownloadButtonTitle}
                    className="w-12 h-12 relative inline-block text-grey-500 rounded active:text-blue-600 active:fill-blue-600 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 hover:bg-grey-50 align-center"
                    onClick={downloadCode}
                  >
                    <DownloadIcon
                      className="mx-auto"
                      role="img"
                      aria-label={localizedDownloadButtonTitle}
                    />
                  </button>
                  <button
                    title={localizedCopyButtonTitle}
                    className="w-12 h-12 relative inline-block text-grey-500 rounded active:text-blue-600  active:fill-blue-600 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 hover:bg-grey-50"
                    onClick={copyCode}
                  >
                    <CopyIcon className="mx-auto" />
                  </button>
                  <button
                    title={localizedPrintButtonTitle}
                    className="w-12 h-12 relative inline-block text-grey-500 rounded active:text-blue-600  active:fill-blue-600 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 hover:bg-grey-50"
                    onClick={printCode}
                  >
                    <PrintIcon
                      className="mx-auto"
                      role="img"
                      aria-label={localizedPrintButtonTitle}
                    />
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-center mt-6 mb-4 mx-auto max-w-64">
              <FtlMsg id="inline-recovery-cancel-button">
                <button
                  className="cta-neutral mx-2 px-10 py-2 flex-1"
                  onClick={cancelSetup}
                >
                  Cancel
                </button>
              </FtlMsg>
              <FtlMsg id="inline-recovery-continue-button">
                <button
                  className="cta-neutral mx-2 px-10 py-2"
                  onClick={continueSetup}
                >
                  Continue
                </button>
              </FtlMsg>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default InlineRecoverySetup;
