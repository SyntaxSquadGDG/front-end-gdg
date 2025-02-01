import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import HeadText from '../common/head';
import DescriptionText from '../common/description';
import GuestButton from '@app/_components/(guest)/common/guest-button';
import OverlaySection from '../common/overlay-section';
import Transition from '@app/_components/transitions/transitions';

const Services2 = async () => {
  const t = await getTranslations();
  return (
    <section className={clsx('minHeightSection relative')}>
      <OverlaySection className={'bg-guestLinear'} />
      <div
        className={clsx(
          'relative z-[5px] container mx-auto flex items-center minHeightSection flex-col lg:flex-row',
          'py-sectionPadding gap-sectionGap',
        )}>
        <div className="w-[100%]">
          <Transition from="left">
            <HeadText>{t('home.services.head')}</HeadText>
          </Transition>
          <Transition from="left" delay="0.1">
            <DescriptionText size={24}>
              {t('home.services.description2')}
            </DescriptionText>
          </Transition>
          <Transition from="left" delay={0.15}>
            <div className="flex items-center gap-32px flex-col lg:flex-row">
              <GuestButton
                className={'w-[100%] lg:w-fit'}
                link={true}
                href={'/services'}>
                {t('general.readMore')}
              </GuestButton>
            </div>
          </Transition>
        </div>
        <Transition from="right" className="w-full">
          <div className="flex flex-col items-center gap-32px w-[100%]">
            <div className="flex gap-32px">
              <div className="sm:w-[264px] sm:h-[264px] h-[96px] w-[96px] rounded-full self-end">
                <img
                  src="/images/guest/home/service1.png"
                  className="w-[100%] h-[100%] rounded-full"
                  alt=""
                />
              </div>
              <div className="sm:w-[264px] sm:h-[264px] h-[96px] w-[96px] rounded-full mb-32px">
                <img
                  src="/images/guest/home/service2.png"
                  className="w-[100%] h-[100%] rounded-full"
                  alt=""
                />
              </div>
            </div>
            <div className="sm:w-[264px] sm:h-[264px] h-[96px] w-[96px] rounded-full relative">
              <img
                src="/images/guest/home/service3.png"
                className="w-[100%] h-[100%] rounded-full"
                alt=""
              />
              <img
                src="/images/guest/home/mouse-click.png"
                className="absolute bottom-0 right-0"
                alt=""
              />
            </div>
          </div>
        </Transition>
      </div>
    </section>
  );
};

export default Services2;

