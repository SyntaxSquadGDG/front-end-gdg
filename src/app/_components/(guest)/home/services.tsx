import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import HeadText from '../common/head';
import DescriptionText from '../common/description';
import GuestButton from '@app/_components/(guest)/common/guest-button';
import ImageDiv from '../common/image';
import OverlaySection from '../common/overlay-section';
import Transition from '@app/_components/transitions/transitions';

const Services = async () => {
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
          <Transition from="left" delay={0.1}>
            <DescriptionText>{t('home.services.description')}</DescriptionText>
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
        <Transition from="right">
          <ImageDiv src={'/images/guest/home/services.png'}>
            <img
              src="/images/guest/home/mouse-click.png"
              className="absolute bottom-0 right-0"
              alt="Services"
            />
          </ImageDiv>
        </Transition>
      </div>
    </section>
  );
};

export default Services;

