import React, { memo } from 'react';
import { IconProps, DEFAULT_ICON_SIZE } from './constants';

export const IconDiscord = memo(
  ({ size = DEFAULT_ICON_SIZE, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 51 43"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4.778"
        d="M33.866 33.444c0 2.39 3.584 7.167 4.778 7.167 3.583 0 6.768-3.982 8.361-7.166C48.6 29.461 48.2 19.51 43.422 5.971c-3.48-2.424-7.167-3.2-10.75-3.583L30.35 6.983a28.459 28.459 0 00-9.682 0l-2.33-4.594c-3.583.382-7.269 1.159-10.75 3.583-4.777 13.538-5.176 23.49-3.583 27.472 1.594 3.185 4.778 7.167 8.361 7.167 1.195 0 4.778-4.778 4.778-7.166m-3.583-1.195c8.361 2.389 15.528 2.389 23.889 0M15.95 21.5a2.389 2.389 0 104.777 0 2.389 2.389 0 00-4.777 0zm14.333 0a2.389 2.389 0 104.778 0 2.389 2.389 0 00-4.778 0z"
      />
    </svg>
  ),
);
