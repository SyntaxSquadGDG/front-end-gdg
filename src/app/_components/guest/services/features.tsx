import AccessSVG from '@app/_components/svgs/guest/services/access';
import ManagementSVG from '@app/_components/svgs/guest/services/management';
import MetadataSVG from '@app/_components/svgs/guest/services/metadata';
import OcrSVG from '@app/_components/svgs/guest/services/ocr';
import SearchSVG from '@app/_components/svgs/guest/services/search';
import VersionsSVG from '@app/_components/svgs/guest/services/versions';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import OverlaySection from '../common/overlay-section';
import HeadText from '../common/head';
import SquareInfoBig from '../common/square-info-big';

const Features = async () => {
  const t = await getTranslations();
  const data = [
    {
      head: t('services.features.service1Head'),
      description: t('services.features.service1Description'),
      icon: ManagementSVG,
    },
    {
      head: t('services.features.service2Head'),
      description: t('services.features.service2Description'),
      icon: VersionsSVG,
    },
    {
      head: t('services.features.service3Head'),
      description: t('services.features.service3Description'),
      icon: AccessSVG,
    },
    {
      head: t('services.features.service4Head'),
      description: t('services.features.service4Description'),
      icon: MetadataSVG,
    },
    {
      head: t('services.features.service5Head'),
      description: t('services.features.service5Description'),
      icon: OcrSVG,
    },
    {
      head: t('services.features.service6Head'),
      description: t('services.features.service6Description'),
      icon: SearchSVG,
    },
  ];
  return (
    <section className={clsx('minHeightSection relative')}>
      <OverlaySection className={'bg-guestLinear'} />
      <div
        className={clsx(
          'relative z-[5px] container mx-auto minHeightSection text-center flex flex-col items-center',
          'py-sectionPadding',
        )}>
        <HeadText>{t('services.features.head')}</HeadText>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-[64px] gap-[88px]">
          {data.map((item) => {
            return (
              <SquareInfoBig
                key={item.head}
                SVG={item.icon}
                head={item.head}
                description={item.description}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;

