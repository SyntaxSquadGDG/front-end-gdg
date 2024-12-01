'use client';

import type { IconInterface } from '@/app/_types/navbar';
import React from 'react';

const SectionsSVG = ({ active }: IconInterface) => {
  if (active) {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M27 11H21V5C21 4.73478 20.8946 4.48043 20.7071 4.29289C20.5196 4.10536 20.2652 4 20 4H5C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V20C4 20.2652 4.10536 20.5196 4.29289 20.7071C4.48043 20.8946 4.73478 21 5 21H11V27C11 27.2652 11.1054 27.5196 11.2929 27.7071C11.4804 27.8946 11.7348 28 12 28H27C27.2652 28 27.5196 27.8946 27.7071 27.7071C27.8946 27.5196 28 27.2652 28 27V12C28 11.7348 27.8946 11.4804 27.7071 11.2929C27.5196 11.1054 27.2652 11 27 11ZM6 6H19V19H6V6Z"
          fill="url(#paint0_linear_20_654)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_20_654"
            x1="4"
            y1="16"
            x2="28"
            y2="16"
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
        d="M28 20V12C28 11.7348 27.8946 11.4804 27.7071 11.2929C27.5196 11.1054 27.2652 11 27 11H21V5C21 4.73478 20.8946 4.48043 20.7071 4.29289C20.5196 4.10536 20.2652 4 20 4H5C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V20C4 20.2652 4.10536 20.5196 4.29289 20.7071C4.48043 20.8946 4.73478 21 5 21H11V27C11 27.2652 11.1054 27.5196 11.2929 27.7071C11.4804 27.8946 11.7348 28 12 28H27C27.2652 28 27.5196 27.8946 27.7071 27.7071C27.8946 27.5196 28 27.2652 28 27V20ZM20.4137 26L15.4137 21H19.5863L24.5863 26H20.4137ZM21 19.5863V15.4137L26 20.4137V24.5863L21 19.5863ZM26 17.5863L21.4137 13H26V17.5863ZM6 6H19V13V19H6V6ZM13 21.4137L17.5863 26H13V21.4137Z"
        className="fill-textLight"
      />
    </svg>
  );
};

export default SectionsSVG;

