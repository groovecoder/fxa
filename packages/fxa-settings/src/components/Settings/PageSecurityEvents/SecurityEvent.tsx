/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { FtlMsg } from 'fxa-react/lib/utils';

export function SecurityEvent({
  name,
  createdAt,
  verified,
}: {
  name: string;
  createdAt: number;
  verified?: boolean;
}) {
  const createdAtDateText = Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(createdAt));

  const formattedName = `security-events-${name.split('.').join('-')}`;

  return (
    <li className="mt-5 ml-4" data-testid={formattedName}>
      <div className="absolute w-3 h-3 bg-green-600 rounded-full mt-1.5 -left-1.5 border border-green-700"></div>
      <time className="text-grey-900 text-s mobileLandscape:mt-3">
        {createdAtDateText}
      </time>
      <FtlMsg id={formattedName}>
        <p className="text-grey-400 text-xs mobileLandscape:mt-3">
          {formattedName}
        </p>
      </FtlMsg>
    </li>
  );
}
export default SecurityEvent;
