import React from 'react';
import HeadText from './head';
import { getTranslations } from 'next-intl/server';
import clsx from 'clsx';
import { contentFont } from '@app/_utils/fonts';
import OverlaySection from './overlay-section';

const Landing = ({ head, description }) => {
  return (
    <section className={clsx('relative ')}>
      <OverlaySection
        className={'bg-[url("/images/patterns/wave.png")]'}
        fullSection={false}
      />
      <div
        className={clsx(
          'relative z-[5px] container mx-auto flex items-center justify-center flex-col text-center',
          'py-[240px] ',
        )}>
        <HeadText>{head}</HeadText>
        <p
          className={clsx(
            contentFont.className,
            'text-[30px] font-medium mt-[32px] text-textLight',
          )}>
          {description}
        </p>
      </div>
    </section>
  );
};

export default Landing;

