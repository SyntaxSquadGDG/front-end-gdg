import GuestButton from '@app/_components/general/guest-button';
import { contentFont, headFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import HeadText from '../common/head';
import DescriptionText from '../common/description';
import ImageDiv from '../common/image';

const Landing = async () => {
  const t = await getTranslations();
  return (
    <section className={clsx('minHeightSection relative')}>
      <div className='bg-[url("/images/patterns/wave.png")] bg-no-repeat bg-contain bg-left-bottom w-[100%] h-[100%] minHeightSection absolute top-0 left-0 z-[1px]' />
      <div
        className={clsx(
          'relative z-[5px] container mx-auto flex items-center minHeightSection flex-col lg:flex-row',
          'py-sectionPadding gap-sectionGap',
        )}>
        <div className="">
          <HeadText>{t('home.landing.head')}</HeadText>
          <DescriptionText size={32}>
            {t('home.landing.description')}
          </DescriptionText>
          <div className="flex items-center gap-[32px] flex-col lg:flex-row">
            <GuestButton className={'w-[100%] lg:w-fit'}>
              {t('home.landing.getTour')}
            </GuestButton>
            <GuestButton className={'w-[100%] lg:w-fit'}>
              {t('home.landing.requestDemo')}
            </GuestButton>
          </div>
        </div>
        <ImageDiv src={'/images/guest/home/landing.png'} />
      </div>
    </section>
  );
};

export default Landing;

