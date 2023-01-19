/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { RouteComponentProps } from '@reach/router';

import FlowContainer from '../FlowContainer';
import { useLocalization } from '@fluent/react';
import { useAccount } from '../../../models';
import { SecurityEvent as SecurityEventSection } from './SecurityEvent';
import { useState, useEffect } from 'react';

export const PageSecurityEvents = (_: RouteComponentProps) => {
  const account = useAccount();
  const [securityEvents, setSecurityEvents] = useState(account.securityEvents);

  const { l10n } = useLocalization();

  useEffect(() => {
    account.getSecurityEvents().then((events) => {
      setSecurityEvents(events);
    });
  });

  return (
    <FlowContainer
      title={l10n.getString('security-events-title', null, 'Recent Activity')}
    >
      <ol className="mt-5 relative border-l border-gray-100">
        {!!securityEvents &&
          securityEvents.map((securityEvent) => (
            <SecurityEventSection
              {...{
                key: securityEvent.name + securityEvent.createdAt,
                name: securityEvent.name,
                createdAt: securityEvent.createdAt,
              }}
            />
          ))}
      </ol>
    </FlowContainer>
  );
};

export default PageSecurityEvents;
