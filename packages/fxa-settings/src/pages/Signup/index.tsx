/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useForm } from 'react-hook-form';
import { logViewEvent, usePageViewEvent } from '../../lib/metrics';
import { FtlMsg } from 'fxa-react/lib/utils';
import FormPasswordWithBalloons from '../../components/FormPasswordWithBalloons';
import Checkbox from '../../components/Settings/Checkbox';
import InputText from '../../components/InputText';
import LinkExternal from 'fxa-react/components/LinkExternal';
import { ReactComponent as IconClose } from 'fxa-react/images/close.svg';
import { useFtlMsgResolver } from '../../models';

/**
 * Fields available in each newsletter:
 * - `label` is the label shown to the user.
 * - `slug` is the id passed to Basket
 */
type Newsletter = {
  label: string;
  slug: string;
};

/**
 * Fields available in each engine:
 * - `checked` whether the item should be checked when CWTS opens.
 * - `id` of the engine, must be the name the browser uses.
 * - `text` to display when CWTS opens
 * - `test` if defined, function used to test whether CWTS is available
 *    for the given `userAgent`. Should return `true` or `false`.
 */
type Engine = {
  checked: boolean;
  id: string;
  text: string;
  test?: () => boolean;
};
interface SharedProps {
  email: string;
  // canChangeEmail is true if not from relying party or force_auth
  canChangeEmail?: boolean;
  // POCKET_CLIENTIDS.includes(this.relier.get('clientId'))
  isPocketClient?: boolean;
}

// CWTS is enabled if relier is sync or multiService, broker is OAuth
// CWTS and newsletters cannot both be enabled
type ConditionalProps =
  | {
      isCWTSEnabled?: boolean;
      areNewslettersEnabled?: never;
    }
  | {
      isCWTSEnabled?: never;
      areNewslettersEnabled?: boolean;
    }
  | {
      isCWTSEnabled?: never;
      areNewslettersEnabled?: never;
    };

export type SignupProps = SharedProps & ConditionalProps;

type FormData = {
  newPassword: string;
  confirmPassword: string;
  userAge: string;
};

const Signup = ({
  email,
  canChangeEmail = true,
  isPocketClient = false,
  isCWTSEnabled,
  areNewslettersEnabled,
}: SignupProps & RouteComponentProps) => {
  usePageViewEvent('signup', {
    entrypoint_variation: 'react',
  });

  const onFocusMetricsEvent = 'signup.engage';

  const [age, setAge] = useState<number>(0);
  const [ageCheckErrorText, setAgeCheckErrorText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [newPasswordErrorText, setNewPasswordErrorText] = useState('');
  const [
    isAccountSuggestionBannerVisible,
    setIsAccountSuggestionBannerVisible,
  ] = useState<boolean>(isPocketClient);

  const { handleSubmit, register, getValues, errors, formState, trigger } =
    useForm<FormData>({
      mode: 'onTouched',
      criteriaMode: 'all',
      defaultValues: {
        newPassword: '',
        confirmPassword: '',
      },
    });

  const ftlMsgResolver = useFtlMsgResolver();

  /**
   * Newsletter data and ftl message resolvers kept here for simplicity,
   * but could eventually be moved out and imported if the list becomes longer.
   */
  const accountsJourneyNewsletterLabel = ftlMsgResolver.getMsg(
    'signup-newsletter-account-journey',
    'Get the latest news about Mozilla and Firefox'
  );
  const takeActionNewsletterLabel = ftlMsgResolver.getMsg(
    'signup-newsletter-take-action',
    'Take action to keep the internet healthy'
  );
  const knowledgeIsPowerNewsletterLabel = ftlMsgResolver.getMsg(
    'signup-newsletter-knowledge-is-power',
    'Be safer and smarter online'
  );

  const newsletters: Newsletter[] = [
    {
      label: accountsJourneyNewsletterLabel,
      slug: 'firefox-accounts-journey',
    },
    {
      label: takeActionNewsletterLabel,
      slug: 'take-action-for-the-internet',
    },
    {
      label: knowledgeIsPowerNewsletterLabel,
      slug: 'knowledge-is-power',
    },
  ];

  /**
   * List of sync engines is temporarily included here for simplicity and l10n,
   * but should eventually be moved to a /lib or /model file once functionality
   * from sync-engine.js is transferred to fxa-settings.
   */

  const bookmarksEngineText = ftlMsgResolver.getMsg(
    'signup-sync-engine-bookmarks',
    'Bookmarks'
  );

  const historyEngineText = ftlMsgResolver.getMsg(
    'signup-sync-engine-history',
    'History'
  );

  const passwordEngineText = ftlMsgResolver.getMsg(
    'signup-sync-engine-passwords',
    'Passwords'
  );

  const addonsEngineText = ftlMsgResolver.getMsg(
    'signup-sync-engine-addons',
    'Add-ons'
  );

  const openTabsEngineText = ftlMsgResolver.getMsg(
    'signup-sync-engine-open-tabs',
    'Open Tabs'
  );

  const preferencesEngineText = ftlMsgResolver.getMsg(
    'signup-sync-engine-preferences',
    'Preferences'
  );

  const addressesEngineText = ftlMsgResolver.getMsg(
    'signup-sync-engine-addresses',
    'Addresses'
  );

  const creditCardsEngineText = ftlMsgResolver.getMsg(
    'signup-sync-engine-credit-cards',
    'Credit Cards'
  );

  const engines: Engine[] = [
    {
      checked: true,
      id: 'bookmarks',
      text: bookmarksEngineText,
    },
    {
      checked: true,
      id: 'history',
      text: historyEngineText,
    },
    {
      checked: true,
      id: 'passwords',
      text: passwordEngineText,
    },
    {
      checked: true,
      id: 'addons',
      text: addonsEngineText,
    },
    {
      checked: true,
      id: 'tabs',
      text: openTabsEngineText,
    },
    {
      checked: true,
      id: 'prefs',
      text: preferencesEngineText,
    },
    {
      checked: true,
      id: 'addresses',
      // addresses will only be available via capabilities.
      test: () => false,
      text: addressesEngineText,
    },
    {
      checked: true,
      id: 'creditcards',
      // credit cards will only be available via capabilities.
      test: () => false,
      text: creditCardsEngineText,
    },
  ];

  const newPasswordLabel = ftlMsgResolver.getMsg(
    'signup-new-password-label',
    'Password'
  );
  const confirmPasswordLabel = ftlMsgResolver.getMsg(
    'signup-confirm-password-label',
    'Repeat password'
  );
  const submitButtonText = ftlMsgResolver.getMsg(
    'signup-submit-button',
    'Create account'
  );
  const ageCheckLabel = ftlMsgResolver.getMsg(
    'signup-age-check-input-label',
    'How old are you?'
  );

  const onFocus = () => {
    if (!isFocused && onFocusMetricsEvent) {
      logViewEvent('flow', onFocusMetricsEvent, {
        entrypoint_variation: 'react',
      });
      setIsFocused(true);
    }
  };

  const onBlurAgeInput = () => {
    const ageCheckError = ftlMsgResolver.getMsg(
      'signup-age-check-input-error',
      'You must enter your age to sign up'
    );
    if (!age) {
      setAgeCheckErrorText(ageCheckError);
    }
  };

  const onSubmit = () => {
    /**
     * TODO: form submission logic
     *       - metrics events:
     *           - flow.signup.submit/signup.submit
     *           - flwo.signup.attempt
     *           - flow.signup.success/signup.success/signup.signup.success (?)
     *       - password validation
     *       - age (COPPA) check (age>12). If COPPA fail:
     *           - mark the user as too young
     *           - navigate to a page informing the user
     *             they are unable to sign up.
     *       - newsletter opt-in
     *       - account signup - set password
     *       - handle errors
     **/

    alert('Form submitted');
  };

  return (
    // TODO: if force_auth && AuthErrors.is(error, 'DELETED_ACCOUNT') :
    //       - forceMessage('Account no longer exists. Recreate it?')
    <>
      <FtlMsg id="signup-heading">
        <h1 className="card-header">Set your password</h1>
      </FtlMsg>

      {/* AccountSuggestion is only shown to Pocket clients */}
      {isAccountSuggestionBannerVisible && (
        <div className="info mt-4">
          <FtlMsg id="signup-info-banner-for-pocket">
            <p className="info-text">
              Why do I need to create this account?{' '}
              <LinkExternal
                href="https://support.mozilla.org/kb/pocket-firefox-account-migration"
                className="underline"
              >
                Find out here
              </LinkExternal>
            </p>
          </FtlMsg>
          <FtlMsg id="signup-info-banner-dismiss-button">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setIsAccountSuggestionBannerVisible(false)}
            >
              <IconClose className="fill-black w-3 h-3" role="img" />
            </button>
          </FtlMsg>
        </div>
      )}

      <div className="mt-4 mb-6">
        <p className="break-all">{email}</p>

        {canChangeEmail && (
          <FtlMsg id="signup-change-email-link">
            <a href="/" className="link-blue text-sm">
              Change email
            </a>
          </FtlMsg>
        )}
      </div>

      <FormPasswordWithBalloons
        {...{
          formState,
          errors,
          trigger,
          register,
          getValues,
          newPasswordErrorText,
          setNewPasswordErrorText,
          onFocus,
          email,
          newPasswordLabel,
          confirmPasswordLabel,
          submitButtonText,
          onFocusMetricsEvent,
        }}
        onSubmit={handleSubmit(onSubmit)}
        loading={false}
        showConfirmPwdBalloon
      >
        {/* Everything below gets passed to FormPassword as children.
            We might want to review how this is handled */}
        {/* TODO: improve a11y - original component had a SR-only label
        "How old are you? To learn why we ask for your age, follow the “why do we ask” link below. */}
        <InputText
          name="userAge"
          label={ageCheckLabel}
          inputMode="numeric"
          className="text-start"
          pattern="[0-9]*"
          maxLength={3}
          onChange={(e) => {
            // TODO: allow only digits in input field
            setAge(parseInt(e.target.value));
            // clear error tooltip if user types in the field
            if (ageCheckErrorText) {
              setAgeCheckErrorText('');
            }
          }}
          onBlurCb={onBlurAgeInput}
          errorText={ageCheckErrorText}
          anchorStart
          required
        />
        <FtlMsg id="signup-coppa-check-explanation-link">
          <LinkExternal
            href="https://www.ftc.gov/business-guidance/resources/childrens-online-privacy-protection-rule-not-just-kids-sites"
            className="link-blue text-start text-sm mb-4"
          >
            Why do we ask?
          </LinkExternal>
        </FtlMsg>

        {isCWTSEnabled && (
          <>
            <FtlMsg id="signup-choose-what-to-sync-heading">
              <h2 className="text-base">Choose what to sync</h2>
            </FtlMsg>
            <div className="flex flex-wrap text-start ltr:mobileLandscape:ml-6 rtl:mobileLandscape:mr-6 mb-1 text-sm">
              {engines.map((engine) => (
                <div
                  key={engine.id}
                  className="mb-4 relative flex-50% rtl:mobileLandscape:pr-6 ltr:mobileLandscape:pl-6 rtl:pr-3 ltr:pl-3 flex items-center"
                >
                  <Checkbox
                    label={engine.text}
                    prefixDataTestId={engine.id}
                    defaultChecked={engine.checked}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {/* TODO: When are newsletters enabled? */}
        {areNewslettersEnabled && (
          <section className="flex flex-col text-start text-sm gap-4 my-4">
            <FtlMsg id="signup-newsletter-subscription-heading">
              <p>
                Practical knowledge is coming to your inbox. Sign up for more:
              </p>
            </FtlMsg>
            {newsletters.map((newsletter) => (
              <Checkbox key={newsletter.slug} label={newsletter.label} />
            ))}
          </section>
        )}
      </FormPasswordWithBalloons>

      {isPocketClient ? (
        <FtlMsg id="signup-pocket-terms-privacy-agreement">
          <p className="text-xs text-grey-500 mt-4">
            By proceeding, you agree to:
            <br />
            Pocket’s{' '}
            <LinkExternal
              data-testid="pocket-tos-external-link"
              href="https://getpocket.com/tos/"
              className="link-grey"
            >
              Terms of Service
            </LinkExternal>{' '}
            and{' '}
            <LinkExternal
              data-testid="pocket-privacy-notice-external-link"
              className="link-grey"
              href="https://getpocket.com/privacy/"
            >
              Privacy Notice
            </LinkExternal>
            <br />
            Firefox’s{' '}
            <a
              data-testid="fxa-tos-link"
              href="/legal/terms"
              className="link-grey"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              data-testid="fxa-privacy-link"
              href="/legal/privacy"
              className="link-grey"
            >
              Privacy Notice
            </a>
          </p>
        </FtlMsg>
      ) : (
        <FtlMsg id="signup-default-terms-privacy-agreement">
          <p className="text-xs text-grey-500 mt-4">
            By proceeding, you agree to the{' '}
            <a
              data-testid="fxa-tos-link"
              href="/legal/terms"
              className="link-grey"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              data-testid="fxa-privacy-link"
              href="/legal/privacy"
              className="link-grey"
            >
              Privacy Notice
            </a>
            .
          </p>
        </FtlMsg>
      )}
    </>
  );
};

export default Signup;
