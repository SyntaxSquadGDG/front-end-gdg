import GuestButton from '@app/_components/(guest)/common/guest-button';
import { contentFont, headFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';
import HeadText from '../common/head';
import DescriptionText from '../common/description';
import ImageDiv from '../common/image';
import OverlaySection from '../common/overlay-section';
import Transition from '@app/_components/transitions/transitions';
import { useTranslations } from 'next-intl';

const Landing = () => {
  const t = useTranslations();
  return (
    <section className={clsx('minHeightSection relative')}>
      <OverlaySection className='bg-[url("/images/patterns/wave.png")]' />
      <div
        className={clsx(
          'relative z-[5px] container mx-auto flex items-center minHeightSection flex-col lg:flex-row',
          'py-sectionPadding gap-sectionGap',
        )}>
        <div className="w-[100%]">
          <Transition from="left">
            <HeadText>{t('home.landing.head')}</HeadText>
          </Transition>
          <Transition from="left" delay={0.1}>
            <DescriptionText size={32}>
              {t('home.landing.description')}
            </DescriptionText>
          </Transition>
          <Transition from="left" delay={0.15}>
            <div className="flex items-center gap-32px flex-col lg:flex-row">
              <GuestButton
                className={'w-[100%] lg:w-fit'}
                href={'/tour'}
                link={true}>
                {t('home.landing.getTour')}
              </GuestButton>
              <GuestButton
                className={'w-[100%] lg:w-fit'}
                href={'/demo'}
                link={true}>
                {t('home.landing.requestDemo')}
              </GuestButton>
            </div>
          </Transition>
        </div>
        <Transition from="right" className="w-full">
          <ImageDiv src={'/images/guest/home/landing.png'} alt="Landing" />
        </Transition>
      </div>
    </section>
  );
};

export default Landing;

