/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
// import { getFtlBundle, testAllL10n } from 'fxa-react/lib/test-utils';
// import { FluentBundle } from '@fluent/bundle';
import { usePageViewEvent } from '../../lib/metrics';
import Signup from '.';
import { MOCK_EMAIL } from './mocks';

jest.mock('../../lib/metrics', () => ({
  usePageViewEvent: jest.fn(),
  logViewEvent: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('@reach/router', () => ({
  ...jest.requireActual('@reach/router'),
  useNavigate: () => mockNavigate,
}));

describe('Signup page', () => {
  // TODO: enable l10n tests when they've been updated to handle embedded tags in ftl strings
  // TODO: in FXA-6461
  // let bundle: FluentBundle;
  // beforeAll(async () => {
  //   bundle = await getFtlBundle('settings');
  // });

  it('renders as expected', () => {
    render(<Signup email={MOCK_EMAIL} />);
    // testAllL10n(screen, bundle);
    screen.getByRole('heading', { name: 'Set your password' });
    screen.getByRole('link', { name: 'Change email' });
    screen.getByLabelText('Password');
    screen.getByLabelText('Repeat password');
    screen.getByLabelText('How old are you?');
    screen.getByRole('link', { name: 'Why do we ask? Opens in new window' });
    screen.getByRole('button', { name: 'Create account' });
    screen.getByTestId('fxa-tos-link');
    screen.getByTestId('fxa-privacy-link');

    // By default, neither newsletters or CWTS are enabled
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('allows users to show and hide password input', () => {
    render(<Signup email={MOCK_EMAIL} />);

    const newPasswordInput = screen.getByLabelText('Password');

    expect(newPasswordInput).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getByTestId('new-password-visibility-toggle'));
    expect(newPasswordInput).toHaveAttribute('type', 'text');
    fireEvent.click(screen.getByTestId('new-password-visibility-toggle'));
    expect(newPasswordInput).toHaveAttribute('type', 'password');
  });

  it('shows an error message if the age input is empty', () => {
    render(<Signup email={MOCK_EMAIL} />);

    expect(
      screen.queryByText('You must enter your age to sign up')
    ).not.toBeInTheDocument();
    const ageInput = screen.getByLabelText('How old are you?');
    fireEvent.input(ageInput, '');
    fireEvent.blur(ageInput);
    screen.getByText('You must enter your age to sign up');
  });

  it('allows the user to change their email when canGoBack is true', () => {
    render(<Signup email={MOCK_EMAIL} canChangeEmail={false} />);
    expect(
      screen.queryByRole('link', { name: 'Change email' })
    ).not.toBeInTheDocument();
  });

  it('shows an info banner and Pocket-specific TOS when client is Pocket', () => {
    render(<Signup email={MOCK_EMAIL} isPocketClient />);

    const infoBannerLink = screen.getByRole('link', {
      name: 'Find out here Opens in new window',
    });
    expect(infoBannerLink).toBeInTheDocument();

    // info banner is dismissible
    const infoBannerDismissButton = screen.getByRole('button', {
      name: 'Close',
    });
    fireEvent.click(infoBannerDismissButton);
    expect(infoBannerLink).not.toBeInTheDocument();

    screen.getByTestId('pocket-tos-external-link');
    screen.getByTestId('pocket-privacy-notice-external-link');
  });

  it('shows options to choose what to sync when CWTS is enabled', async () => {
    render(<Signup email={MOCK_EMAIL} isCWTSEnabled />);

    screen.getByText('Choose what to sync');

    const checkboxes = await screen.findAllByRole('checkbox');
    expect(checkboxes).toHaveLength(8);
  });

  it('shows newsletter subscription options when newsletters are enabled', async () => {
    render(<Signup email={MOCK_EMAIL} areNewslettersEnabled />);

    screen.getByText(
      'Practical knowledge is coming to your inbox. Sign up for more:'
    );

    const checkboxes = await screen.findAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
  });

  it('emits a metrics event on render', () => {
    render(<Signup email={MOCK_EMAIL} />);
    expect(usePageViewEvent).toHaveBeenCalledWith(`signup`, {
      entrypoint_variation: 'react',
    });
  });
});
