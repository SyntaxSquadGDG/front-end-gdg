import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import HeadText from '../common/head';
import DescriptionText from '../common/description';
import GuestButton from '@app/_components/general/guest-button';
import ImageDiv from '../common/image';

const Services = async () => {
  const t = await getTranslations();
  return (
    <section className={clsx('minHeightSection relative')}>
      <div className="bg-guestLinear w-[100%] h-[100%] minHeightSection absolute top-0 left-0 z-[1px]" />
      <div
        className={clsx(
          'relative z-[5px] container mx-auto flex items-center minHeightSection flex-col lg:flex-row',
          'py-sectionPadding gap-sectionGap',
        )}>
        <div className="">
          <HeadText>{t('home.services.head')}</HeadText>
          <DescriptionText>{t('home.services.description')}</DescriptionText>
          <div className="flex items-center gap-[32px] flex-col lg:flex-row">
            <GuestButton
              className={'w-[100%] lg:w-fit'}
              link={true}
              href={'/services'}>
              {t('general.readMore')}
            </GuestButton>
          </div>
        </div>
        <ImageDiv src={'/images/guest/home/services.png'}>
          <img
            src="/images/guest/home/mouse-click.png"
            className="absolute bottom-0 right-0"
            alt=""
          />
        </ImageDiv>
      </div>
    </section>
  );
};

export default Services;

