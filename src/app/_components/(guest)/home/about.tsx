import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import HeadText from '../common/head';
import DescriptionText from '../common/description';
import GuestButton from '@app/_components/(guest)/common/guest-button';
import ImageDiv from '../common/image';
import { contentFont } from '@app/_utils/fonts';
import RectangleInfo from '../common/rectangle-info';
import AiSVG from '@app/_components/svgs/guest/ai';
import DocumentsSVG from '@app/_components/svgs/guest/documents';
import OverlaySection from '../common/overlay-section';

const About = async () => {
  const t = await getTranslations();
  return (
    <section className={clsx('minHeightSection relative')}>
      <OverlaySection
        className={'bg-[url("/images/patterns/wave2.png")] opacity-10'}
      />

      <div
        className={clsx(
          'relative z-[5px] container mx-auto flex items-center minHeightSection flex-col lg:flex-row',
          'py-sectionPadding gap-sectionGap',
        )}>
        <ImageDiv src={'/images/guest/home/about.png'} direction="left" />
        <div className="w-[100%]">
          <HeadText>{t('home.about.head')}</HeadText>
          <p
            className={clsx(
              'my-[32px] text-[16px] text-textLight',
              contentFont.className,
            )}>
            {t('home.about.description')}
          </p>
          <div className="flex flex-col gap-[32px] mb-[56px]">
            <RectangleInfo
              head={t('home.about.info1Head')}
              description={t('home.about.info1Description')}>
              <AiSVG />
            </RectangleInfo>
            <RectangleInfo
              head={t('home.about.info2Head')}
              description={t('home.about.info2Description')}>
              <DocumentsSVG />
            </RectangleInfo>
          </div>

          <GuestButton
            className={'w-[100%] lg:w-fit'}
            link={true}
            href={'/about'}>
            {t('general.readMore')}
          </GuestButton>
        </div>
      </div>
    </section>
  );
};

export default About;
