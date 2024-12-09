import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import HeadText from '../common/head';
import DescriptionText from '../common/description';
import GuestButton from '@app/_components/general/guest-button';

const Services2 = async () => {
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
          <DescriptionText size={24}>
            {t('home.services.description2')}
          </DescriptionText>
          <div className="flex items-center gap-[32px] flex-col lg:flex-row">
            <GuestButton
              className={'w-[100%] lg:w-fit'}
              link={true}
              href={'/services'}>
              {t('general.readMore')}
            </GuestButton>
          </div>
        </div>
        <div className="flex flex-col items-center gap-[32px] shrink-0">
          <div className="flex gap-[32px]">
            <div className="sm:w-[264px] sm:h-[264px] h-[96px] w-[96px] rounded-full self-end">
              <img
                src="/images/guest/home/service1.png"
                className="w-[100%] h-[100%] rounded-full"
                alt=""
              />
            </div>
            <div className="sm:w-[264px] sm:h-[264px] h-[96px] w-[96px] rounded-full mb-[32px]">
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
      </div>
    </section>
  );
};

export default Services2;

