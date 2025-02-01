'use client';

import { contentFont, headFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const TempSection = ({ src, head, description, redirect }) => {
  const t = useTranslations();
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    // Redirect to home after 5 seconds (5000 milliseconds)
    const timer = setTimeout(() => {
      router.push(redirect); // Redirect to the home page
    }, 5000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col text-center">
      <div className="flex items-center justify-center w-[100%]">
        <img src={src} alt="" />
      </div>
      <h3
        className={clsx(
          'text-40px font-bold linearGuestText2 mt-48px mb-24px text-center',
          'font-head',
        )}>
        {head}
      </h3>
      <p className={clsx('text-24px font-medium text-center', 'font-content')}>
        {description}
      </p>
    </div>
  );
};

export default TempSection;

