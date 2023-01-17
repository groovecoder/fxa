/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Signup, { SignupProps } from '.';
import AppLayout from '../../components/AppLayout';
import { LocationProvider } from '@reach/router';
import { Meta } from '@storybook/react';
import { MOCK_EMAIL } from './mocks';

export default {
  title: 'pages/Signup/Signup',
  component: Signup,
} as Meta;

const storyWithProps = (props: SignupProps) => {
  const story = () => (
    <LocationProvider>
      <AppLayout>
        <Signup {...props} />
      </AppLayout>
    </LocationProvider>
  );
  return story;
};

export const Default = storyWithProps({ email: MOCK_EMAIL });

export const ForceAuthCantChangeEmail = storyWithProps({
  email: MOCK_EMAIL,
  canChangeEmail: false,
});

export const ClientIsPocket = storyWithProps({
  email: MOCK_EMAIL,
  isPocketClient: true,
});

export const ChooseWhatToSyncIsEnabled = storyWithProps({
  email: MOCK_EMAIL,
  isCWTSEnabled: true,
});

export const NewslettersAreEnabled = storyWithProps({
  email: MOCK_EMAIL,
  areNewslettersEnabled: true,
});
