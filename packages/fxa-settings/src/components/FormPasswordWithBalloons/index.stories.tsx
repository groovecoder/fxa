/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { Subject, SubjectWith2Balloons } from './mocks';
import AppLayout from '../AppLayout';
import FormPasswordWithBalloons from '.';
import { Meta } from '@storybook/react';

export default {
  title: 'Components/FormPasswordWithBalloons',
  component: FormPasswordWithBalloons,
} as Meta;

export const Default = () => (
  <AppLayout>
    <div className="max-w-lg mx-auto">
      <Subject />
    </div>
  </AppLayout>
);

export const CustomTextWithConfirmPasswordBalloon = () => (
  <AppLayout>
    <div className="max-w-lg mx-auto">
      <SubjectWith2Balloons />
    </div>
  </AppLayout>
);
