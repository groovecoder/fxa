/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Signin, { SigninProps } from '.';
import AppLayout from '../../components/AppLayout';
import { LocationProvider } from '@reach/router';
import { Meta } from '@storybook/react';
import { MOCK_EMAIL, MOCK_SERVICE, MOCK_OTHER_ICON } from './mocks';
export default {
  title: 'pages/Signin',
  component: Signin,
} as Meta;

// TODO: Add in error and success states when the Alert Bar is implemented
const SigninWithProvider = ({
  email,
  isPasswordNeeded,
  serviceName,
  ServiceLogo,
}: SigninProps) => {
  return (
    <LocationProvider>
      <AppLayout>
        <Signin {...{ email, isPasswordNeeded, ServiceLogo, serviceName }} />
      </AppLayout>
    </LocationProvider>
  );
};

export const PasswordNeeded = () => (
  <SigninWithProvider email={MOCK_EMAIL} isPasswordNeeded />
);

export const PasswordNotNeeded = () => (
  <SigninWithProvider email={MOCK_EMAIL} isPasswordNeeded={false} />
);

export const CustomServiceName = () => (
  <SigninWithProvider
    email={MOCK_EMAIL}
    isPasswordNeeded={false}
    serviceName={MOCK_SERVICE}
  />
);

export const IsPocketClient = () => (
  <SigninWithProvider
    email={MOCK_EMAIL}
    isPasswordNeeded={false}
    serviceName={'Pocket'}
  />
);

export const HasServiceLogo = () => (
  <SigninWithProvider
    email={MOCK_EMAIL}
    isPasswordNeeded={false}
    serviceName={'VPN'}
    ServiceLogo={MOCK_OTHER_ICON}
  />
);
