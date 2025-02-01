'use client';
import clsx from 'clsx';
import React from 'react';

const PlansSVG = ({ active, className }) => {
  if (active) {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className="shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19.0875 12.1293C18.9029 11.6099 18.5621 11.1603 18.1121 10.8419C17.662 10.5236 17.1245 10.3521 16.5733 10.351H14.5093C13.9204 10.3479 13.3514 10.5633 12.9121 10.9555C12.4728 11.3477 12.1946 11.8888 12.1312 12.4742C12.0678 13.0596 12.2237 13.6478 12.5688 14.1249C12.9139 14.602 13.4237 14.9342 13.9995 15.0573L17.1424 15.743C17.785 15.8837 18.353 16.2569 18.7372 16.7909C19.1214 17.3249 19.2947 17.9821 19.2238 18.6361C19.153 19.2901 18.8429 19.8949 18.3532 20.3342C17.8636 20.7735 17.2288 21.0164 16.571 21.0162H14.795C13.6338 21.0162 12.6464 20.2756 12.2807 19.2402M15.6841 10.351V7.68359M15.6841 23.6836V21.0185M4.56641 30.8516V25.1373H10.2807"
          stroke="url(#paint0_linear_2254_993)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30.6015 13.2657C31.2083 16.5004 30.7239 19.8451 29.2242 22.7748C27.7245 25.7045 25.2945 28.0532 22.3156 29.4525C19.3366 30.8517 15.9774 31.2222 12.7651 30.5058C9.55283 29.7894 6.66935 28.0267 4.56725 25.4942M1.39925 18.7331C0.792449 15.4983 1.27691 12.1536 2.7766 9.22398C4.27628 6.29432 6.70629 3.94555 9.68523 2.54631C12.6642 1.14707 16.0234 0.776576 19.2357 1.49298C22.448 2.20938 25.3314 3.97212 27.4335 6.50453"
          stroke="url(#paint1_linear_2254_993)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M27.433 1.14648V6.86077H21.7188"
          stroke="url(#paint2_linear_2254_993)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2254_993"
            x1="4.56641"
            y1="19.2676"
            x2="19.2394"
            y2="19.2676"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--secondaryColor1)" />
            <stop offset="0.504277" stopColor="var(--secondaryColor1)" />
            <stop offset="1" stopColor="var(--secondaryColor2)" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_2254_993"
            x1="1.14453"
            y1="15.9994"
            x2="30.8563"
            y2="15.9994"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--secondaryColor1)" />
            <stop offset="0.504277" stopColor="var(--secondaryColor1)" />
            <stop offset="1" stopColor="var(--secondaryColor2)" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_2254_993"
            x1="21.7188"
            y1="4.00363"
            x2="27.433"
            y2="4.00363"
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
      className="shrink-0"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.0875 12.1293C18.9029 11.6099 18.5621 11.1603 18.1121 10.8419C17.662 10.5236 17.1245 10.3521 16.5733 10.351H14.5093C13.9204 10.3479 13.3514 10.5633 12.9121 10.9555C12.4728 11.3477 12.1946 11.8888 12.1312 12.4742C12.0678 13.0596 12.2237 13.6478 12.5688 14.1249C12.9139 14.602 13.4237 14.9342 13.9995 15.0573L17.1424 15.743C17.785 15.8837 18.353 16.2569 18.7372 16.7909C19.1214 17.3249 19.2947 17.9821 19.2238 18.6361C19.153 19.2901 18.8429 19.8949 18.3532 20.3342C17.8636 20.7735 17.2288 21.0164 16.571 21.0162H14.795C13.6338 21.0162 12.6464 20.2756 12.2807 19.2402M15.6841 10.351V7.68359M15.6841 23.6836V21.0185M4.56641 30.8516V25.1373H10.2807"
        className={clsx('stroke-iconLight', className)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.6015 13.2657C31.2083 16.5004 30.7239 19.8451 29.2242 22.7748C27.7245 25.7045 25.2945 28.0532 22.3156 29.4525C19.3366 30.8517 15.9774 31.2222 12.7651 30.5058C9.55283 29.7894 6.66935 28.0267 4.56725 25.4942M1.39925 18.7331C0.792449 15.4983 1.27691 12.1536 2.7766 9.22398C4.27628 6.29432 6.70629 3.94555 9.68523 2.54631C12.6642 1.14707 16.0234 0.776576 19.2357 1.49298C22.448 2.20938 25.3314 3.97212 27.4335 6.50453"
        className={clsx('stroke-iconLight', className)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.433 1.14648V6.86077H21.7188"
        className={clsx('stroke-iconLight', className)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlansSVG;

