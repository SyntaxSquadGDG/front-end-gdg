import { contentFont, headFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import RectangleInfo from '../common/rectangle-info';
import ImproveSVG from '@app/_components/svgs/guest/improve';
import AiSVG from '@app/_components/svgs/guest/ai';
import DocumentsSVG from '@app/_components/svgs/guest/documents';
import OverlaySection from '../common/overlay-section';
import ImageDiv from '../common/image';

const Different = async () => {
  const t = await getTranslations();
  const data = [
    {
      head: t('about.different.different1Head'),
      description: t('about.different.different1Description'),
      icon: ImproveSVG,
    },
    {
      head: t('about.different.different2Head'),
      description: t('about.different.different2Description'),
      icon: AiSVG,
    },
    {
      head: t('about.different.different3Head'),
      description: t('about.different.different3Description'),
      icon: DocumentsSVG,
    },
  ];
  return (
    <section className={clsx('relative minHeightSection')}>
      <OverlaySection
        className={'bg-[url("/images/patterns/wave2.png")] opacity-10'}
      />
      <div
        className={clsx(
          'relative z-[5px] container mx-auto flex items-center justify-center lg:flex-row flex-col text-textLight',
          'py-sectionPadding minHeightSection gap-sectionGap',
        )}>
        <ImageDiv src={'/images/guest/about/light.png'} direction="middle" />
        <div className="w-[100%]">
          <h2
            className={clsx(
              headFont.className,
              'text-[36px] font-semibold linearGuestText2',
            )}>
            {t('about.different.head')}
          </h2>
          <p
            className={clsx(
              contentFont.className,
              'mb-[32px] mt-[24px] text-[18px]',
            )}>
            {t('about.different.description')}
          </p>
          <div className="flex flex-col gap-[32px]">
            {data.map((item) => {
              return (
                <RectangleInfo
                  description={item.description}
                  head={item.head}
                  key={item.head}>
                  <item.icon />
                </RectangleInfo>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Different;

