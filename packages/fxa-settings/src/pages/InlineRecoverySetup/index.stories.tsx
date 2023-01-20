/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import InlineRecoverySetup, { InlineRecoverySetupProps } from '.';
import AppLayout from '../../components/AppLayout';
import { LocationProvider } from '@reach/router';
import { Meta } from '@storybook/react';
import { RECOVERY_CODES, SERVICE_NAME } from './mocks';

export default {
  title: 'pages/InlineRecoverySetup',
  component: InlineRecoverySetup,
} as Meta;

const ComponentWithRouter = ({
  isIos,
  recoveryCodes,
  serviceName,
  showConfirmation,
}: InlineRecoverySetupProps) => (
  <LocationProvider>
    <AppLayout>
      <InlineRecoverySetup
        {...{ isIos, recoveryCodes, serviceName, showConfirmation }}
      />
    </AppLayout>
  </LocationProvider>
);

export const Default = () => (
  <ComponentWithRouter
    recoveryCodes={RECOVERY_CODES}
    showConfirmation={false}
  />
);

export const ServiceNameDontShowConfirmation = () => (
  <ComponentWithRouter
    recoveryCodes={RECOVERY_CODES}
    showConfirmation={false}
    serviceName={SERVICE_NAME}
  />
);

export const isIos = () => (
  <ComponentWithRouter
    recoveryCodes={RECOVERY_CODES}
    showConfirmation={false}
    serviceName={SERVICE_NAME}
    isIos={true}
  />
);

export const ShowConfirmation = () => (
  <ComponentWithRouter recoveryCodes={RECOVERY_CODES} showConfirmation={true} />
);

export const ShowConfirmationWithServiceName = () => (
  <ComponentWithRouter
    recoveryCodes={RECOVERY_CODES}
    showConfirmation={true}
    serviceName={SERVICE_NAME}
  />
);
