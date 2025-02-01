'use client';
import type { IconInterface } from '@/app/_types/navbar';
import clsx from 'clsx';
import React from 'react';

const ActivitySVG = ({ active, className }: IconInterface) => {
  if (active) {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        className="shrink-0"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 16.0002H9.33333L13.3333 26.6668L18.6667 5.3335L22.6667 16.0002H28"
          stroke="url(#paint0_linear_15_369)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_15_369"
            x1="4"
            y1="16.0002"
            x2="28"
            y2="16.0002"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--secondaryColor1)" />
            <stop offset="0.504277" stopColor="var(--secondaryColor1)" />
            <stop offset="1" stopColor="var(--secondaryColor2)" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className="shrink-0"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 16.0002H9.33333L13.3333 26.6668L18.6667 5.3335L22.6667 16.0002H28"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={clsx('stroke-iconLight', className)}
      />
    </svg>
  );
};

export default ActivitySVG;

