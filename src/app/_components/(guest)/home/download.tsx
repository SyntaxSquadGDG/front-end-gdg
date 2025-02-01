import clsx from 'clsx';
import React from 'react';
import HeadText from '../common/head';
import { getTranslations } from 'next-intl/server';
import GoogleButton from '../common/google-button';
import OverlaySection from '../common/overlay-section';
import Transition from '@app/_components/transitions/transitions';

const Download = async () => {
  const t = await getTranslations();
  return (
    <section className={clsx('relative')}>
      <OverlaySection
        className={'bg-[url("/images/patterns/wave2.png")] opacity-10'}
      />
      <div
        className={clsx(
          'relative z-[5px] container mx-auto flex items-center flex-col lg:flex-row',
          'gap-sectionGap',
        )}>
        <div className="flex flex-col pt-sectionPadding items-center w-[100%]">
          <Transition from="up">
            <HeadText>{t('home.download')}</HeadText>
          </Transition>
          <Transition from="up" delay={0.1}>
            <GoogleButton className={'mt-40px mb-[84px]'} />
          </Transition>
          <div className="flex items-end gap-48px">
            <Transition from={'down'} delay={0.1}>
              <div>
                <img src="/images/guest/home/device1.png" alt="" />
              </div>
            </Transition>
            <Transition from={'down'} delay={0}>
              <div>
                <img src="/images/guest/home/device2.png" alt="" />
              </div>
            </Transition>
            <Transition from={'down'} delay={0.2}>
              <div>
                <img src="/images/guest/home/device3.png" alt="" />
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;

