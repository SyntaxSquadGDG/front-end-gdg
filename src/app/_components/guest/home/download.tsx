import clsx from 'clsx';
import React from 'react';
import HeadText from '../common/head';
import { getTranslations } from 'next-intl/server';
import GoogleButton from '../common/google-button';

const Download = async () => {
  const t = await getTranslations();
  return (
    <section className={clsx('relative')}>
      <div className='bg-[url("/images/patterns/wave2.png")] bg-no-repeat bg-cover bg-left-bottom w-[100%] h-[100%] absolute top-0 left-0 z-[1px] opacity-20' />
      <div
        className={clsx(
          'relative z-[5px] container mx-auto flex items-center flex-col lg:flex-row',
          'gap-sectionGap',
        )}>
        <div className="flex flex-col pt-sectionPadding items-center w-[100%]">
          <HeadText>{t('home.download')}</HeadText>
          <GoogleButton className={'mt-[40px] mb-[84px]'} />
          <div className="flex items-end gap-[48px]">
            <div>
              <img src="/images/guest/home/device1.png" alt="" />
            </div>
            <div>
              <img src="/images/guest/home/device2.png" alt="" />
            </div>
            <div>
              <img src="/images/guest/home/device3.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;

