'use client';
import { useLocale } from 'next-intl';
import React from 'react';
import { getLangDir } from 'rtl-detect';

const PathArrowSVG = () => {
  const locale = useLocale();
  const direction = getLangDir(locale);

  if (direction === 'ltr') {
    return (
      <svg
        width="22"
        height="44"
        viewBox="0 0 22 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.49531 12.0634L6.44048 10.1201L17.0353 20.7113C17.2061 20.881 17.3416 21.0828 17.4341 21.3051C17.5266 21.5274 17.5742 21.7658 17.5742 22.0065C17.5742 22.2473 17.5266 22.4857 17.4341 22.708C17.3416 22.9303 17.2061 23.1321 17.0353 23.3018L6.44048 33.8984L4.49714 31.9551L14.4411 22.0093L4.49531 12.0634Z"
          fill="#7D7D7D"
        />
      </svg>
    );
  }

  return (
    <svg
      width="22"
      height="44"
      viewBox="0 0 22 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.5047 12.0634L15.5595 10.1201L4.96469 20.7113C4.79391 20.881 4.65837 21.0828 4.56588 21.3051C4.4734 21.5274 4.42578 21.7658 4.42578 22.0065C4.42578 22.2473 4.4734 22.4857 4.56588 22.708C4.65837 22.9303 4.79391 23.1321 4.96469 23.3018L15.5595 33.8984L17.5029 31.9551L7.55886 22.0093L17.5047 12.0634Z"
        fill="#7D7D7D"
      />
    </svg>
  );
};

export default PathArrowSVG;

