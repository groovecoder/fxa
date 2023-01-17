/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { useState } from 'react';
import { UseFormMethods } from 'react-hook-form';
import InputPassword from '../InputPassword';
import PasswordValidator from '../../lib/password-validator';
import { logViewEvent, settingsViewName } from '../../lib/metrics';
import PasswordStrengthBalloon from '../PasswordStrengthBalloon';
import { FtlMsg } from 'fxa-react/lib/utils';
import { ReactComponent as IconKey } from './icon-key-grey-50.svg';
import { useFtlMsgResolver } from '../../models';

type FormPasswordWithBalloonsProps = {
  formState: UseFormMethods['formState'];
  errors: UseFormMethods['errors'];
  onSubmit: any; // TODO: fix this type
  trigger: UseFormMethods['trigger'];
  register: UseFormMethods['register'];
  getValues: UseFormMethods['getValues'];
  email: string;
  onFocusMetricsEvent?: string;
  loading: boolean;
  newPasswordLabel?: string;
  confirmPasswordLabel?: string;
  submitButtonText?: string;
  children?: React.ReactNode;
  showConfirmPwdBalloon?: boolean;
};

export const FormPasswordWithBalloons = ({
  formState,
  errors,
  onSubmit,
  email,
  trigger,
  register,
  getValues,
  onFocusMetricsEvent,
  loading,
  newPasswordLabel,
  confirmPasswordLabel,
  submitButtonText,
  children,
  showConfirmPwdBalloon,
}: FormPasswordWithBalloonsProps) => {
  const passwordValidator = new PasswordValidator(email);
  const [hasNewPwdFocused, setHasNewPwdFocused] = useState(false);
  const [isNewPwdBalloonVisible, setIsNewPwdBalloonVisible] = useState(false);
  const [isConfirmPwdBalloonVisible, setIsConfirmPwdBalloonVisible] =
    useState(false);
  const [passwordMatchErrorText, setPasswordMatchErrorText] = useState<
    string | undefined
  >(undefined);
  const ftlMsgResolver = useFtlMsgResolver();

  const defaultButtonText = ftlMsgResolver.getMsg(
    'form-reset-password-with-balloon-submit-button',
    'Reset password'
  );

  const onNewPwdFocus = () => {
    setIsNewPwdBalloonVisible(true);
    if (!hasNewPwdFocused && onFocusMetricsEvent) {
      logViewEvent(settingsViewName, onFocusMetricsEvent);
      setHasNewPwdFocused(true);
    }
  };

  const onNewPwdBlur = () => {
    setIsNewPwdBalloonVisible(false);
  };

  const onConfirmPwdFocus = () => {
    setIsConfirmPwdBalloonVisible(true);
  };

  const onConfirmPwdBlur = () => {
    setIsConfirmPwdBalloonVisible(false);
  };

  return (
    <>
      <form {...{ onSubmit }} className="flex flex-col gap-4">
        {/* Hidden email field is to allow Fx password manager
           to correctly save the updated password. Without it,
           the password manager tries to save the old password
           as the username. */}
        <input type="email" value={email} className="hidden" readOnly />
        <div className="relative">
          <FtlMsg
            id="form-reset-password-with-balloon-new-password"
            attrs={{ label: true }}
          >
            <InputPassword
              name="newPassword"
              className="text-start"
              label={newPasswordLabel || 'New password'}
              onFocusCb={onFocusMetricsEvent ? onNewPwdFocus : undefined}
              onBlurCb={isNewPwdBalloonVisible ? onNewPwdBlur : undefined}
              onChange={() => {
                trigger(['newPassword', 'confirmPassword']);
              }}
              hasErrors={
                formState.dirtyFields.newPassword ? errors.newPassword : false
              }
              inputRef={register({
                required: true,
                validate: {
                  length: (value: string) => value.length > 7,
                  notEmail: (value: string) => {
                    return !passwordValidator.isSameAsEmail(
                      value.toLowerCase()
                    );
                  },
                  uncommon: async (value: string) => {
                    // @ts-ignore
                    const list = await import('fxa-common-password-list');
                    const input = value.toLowerCase();
                    return (
                      !list.test(input) && !passwordValidator.isBanned(input)
                    );
                  },
                },
              })}
              prefixDataTestId="new-password"
            />
          </FtlMsg>
          {isNewPwdBalloonVisible && (
            <PasswordStrengthBalloon
              {...{
                hasUserTakenAction: formState.dirtyFields.newPassword,
                isTooShort: errors.newPassword?.types?.length,
                isSameAsEmail: errors.newPassword?.types?.notEmail,
                isCommon: errors.newPassword?.types?.uncommon,
              }}
            />
          )}
        </div>

        <div className="relative">
          <FtlMsg
            id="form-reset-password-with-balloon-confirm-password"
            attrs={{ label: true }}
          >
            <InputPassword
              name="confirmPassword"
              label={confirmPasswordLabel || 'Re-enter password'}
              className="text-start"
              onFocusCb={showConfirmPwdBalloon ? onConfirmPwdFocus : undefined}
              onBlurCb={
                showConfirmPwdBalloon && isConfirmPwdBalloonVisible
                  ? onConfirmPwdBlur
                  : undefined
              }
              onChange={() => {
                if (passwordMatchErrorText) {
                  setPasswordMatchErrorText(undefined);
                }
                trigger(['newPassword', 'confirmPassword']);
              }}
              // Password confirmation field is disabled until new password is valid
              disabled={
                !formState.dirtyFields.newPassword || errors.newPassword
              }
              hasErrors={errors.confirmPassword && passwordMatchErrorText}
              errorText={passwordMatchErrorText}
              inputRef={register({
                required: true,
                validate: (value: string) => value === getValues().newPassword,
              })}
              anchorStart
              tooltipPosition="bottom"
              prefixDataTestId="verify-password"
            />
          </FtlMsg>

          {showConfirmPwdBalloon && isConfirmPwdBalloonVisible && (
            <div className="input-balloon flex gap-2 items-start text-xs">
              <IconKey className="w-10" aria-hidden="true" focusable="false" />
              <FtlMsg id="form-password-with-balloons-confirm-pwd-balloon">
                <p>
                  You need this password to access any encrypted data you store
                  with us.
                  <br className="mb-3" />A reset means potentially losing data
                  like passwords and bookmarks.
                </p>
              </FtlMsg>
            </div>
          )}
        </div>

        {children}

        <button
          type="submit"
          className="cta-primary cta-xl"
          disabled={!formState.isDirty || !formState.isValid || loading}
        >
          {submitButtonText || defaultButtonText}
        </button>
      </form>
    </>
  );
};

export default FormPasswordWithBalloons;
