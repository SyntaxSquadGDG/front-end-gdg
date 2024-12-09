import clsx from 'clsx';
import React from 'react';
import HeadText from '../common/head';
import { getTranslations } from 'next-intl/server';
import DescriptionText from '../common/description';
import GuestButton from '@app/_components/general/guest-button';

const Demo = async () => {
  const t = await getTranslations();
  return (
    <section className={clsx('relative')}>
      <div
        className={clsx(
          'relative z-[5px] container mx-auto flex items-center flex-col lg:flex-row',
          'gap-sectionGap py-sectionPadding',
        )}>
        <div>
          <HeadText variant="light">{t('home.demo.head')}</HeadText>
          <DescriptionText size={22}>
            {t('home.demo.description')}
          </DescriptionText>
          <GuestButton
            link={true}
            href={'/demo'}
            className={'w-[100%] lg:w-fit'}>
            {t('home.demo.request')}
          </GuestButton>
        </div>
        <div className="shrink-0">
          <img src="/images/guest/home/demo.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Demo;

