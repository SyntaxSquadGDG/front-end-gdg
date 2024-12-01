'use client';
import type { IconInterface } from '@/app/_types/navbar';
import React from 'react';

const ActivitySVG = ({ active }: IconInterface) => {
  if (active) {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
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
            <stop stopColor="#CDAD8F" />
            <stop offset="0.504277" stopColor="#CDAD8F" />
            <stop offset="1" stopColor="#FAE1CB" />
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
        className="stroke-textLight"
      />
    </svg>
  );
};

export default ActivitySVG;

