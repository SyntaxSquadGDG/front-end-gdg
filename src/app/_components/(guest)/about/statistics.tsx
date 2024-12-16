import ProductivitySVG from '@app/_components/svgs/guest/about/productivity';
import SearchSVG from '@app/_components/svgs/guest/about/search';
import TimeSVG from '@app/_components/svgs/guest/about/time';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import SquareInfo from '../common/square-info';

const Statistics = async () => {
  const t = await getTranslations();
  const data = [
    {
      head: t('about.statistics.statistics1Head'),
      description: t('about.statistics.statistics1Description'),
      icon: ProductivitySVG,
    },
    {
      head: t('about.statistics.statistics2Head'),
      description: t('about.statistics.statistics2Description'),
      icon: SearchSVG,
    },
    {
      head: t('about.statistics.statistics3Head'),
      description: t('about.statistics.statistics3Description'),
      icon: TimeSVG,
    },
  ];
  return (
    <section className={clsx('relative')}>
      <div className="bg-guestLinear w-[100%] h-[100%] absolute top-0 left-0 z-[1px]" />
      <div
        className={clsx(
          'relative z-[5px] container mx-auto flex items-center justify-center lg:flex-row flex-col text-textLight',
          'py-sectionPadding gap-sectionGap',
        )}>
        {data.map((item) => {
          return (
            <SquareInfo
              key={item.description}
              SVG={item.icon}
              description={item.description}
              head={item.head}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Statistics;

