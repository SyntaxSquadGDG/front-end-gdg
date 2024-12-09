import clsx from 'clsx';
import React from 'react';
import HeadText from '../common/head';
import { getTranslations } from 'next-intl/server';
import { contentFont } from '@app/_utils/fonts';
import TeamSVG from '@app/_components/svgs/guest/about/team';
import TargetSVG from '@app/_components/svgs/guest/about/target';
import SuccessSVG from '@app/_components/svgs/guest/about/success';
import CircularInfo from '../common/circular-info';

const Accelerated = async () => {
  const t = await getTranslations();
  const data = [
    {
      head: t('about.accelerated.accelerated1Head'),
      description: t('about.accelerated.accelerated1Description'),
      icon: TeamSVG,
    },
    {
      head: t('about.accelerated.accelerated2Head'),
      description: t('about.accelerated.accelerated2Description'),
      icon: TargetSVG,
    },
    {
      head: t('about.accelerated.accelerated3Head'),
      description: t('about.accelerated.accelerated3Description'),
      icon: SuccessSVG,
    },
  ];
  return (
    <section className={clsx('relative minHeightSection')}>
      <div className="bg-guestLinear w-[100%] h-[100%] minHeightSection absolute top-0 left-0 z-[1px]" />
      <div
        className={clsx(
          'relative z-[5px] container mx-auto flex items-center justify-center  flex-col text-textLight text-center',
          'py-sectionPadding minHeightSection',
        )}>
        <HeadText>{t('about.accelerated.head')}</HeadText>
        <div
          className={clsx(
            'mt-[40px] mb-[48px] text-[24px]',
            contentFont.className,
          )}>
          <p>{t('about.accelerated.description1')}</p>
          <p>{t('about.accelerated.description2')}</p>
        </div>
        <div className="flex items-center gap-[44px] flex-col lg:flex-row">
          {data.map((item) => {
            return (
              <CircularInfo
                key={item.head}
                SVG={item.icon}
                description={item.description}
                head={item.head}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Accelerated;

