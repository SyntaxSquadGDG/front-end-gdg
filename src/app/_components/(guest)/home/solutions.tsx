import React from 'react';
import Solution from '../common/solution';
import { getTranslations } from 'next-intl/server';
import HealthSVG from '@app/_components/svgs/guest/solutions/health';
import clsx from 'clsx';
import EducationSVG from '@app/_components/svgs/guest/solutions/education';
import FinanceSVG from '@app/_components/svgs/guest/solutions/finance';
import HeadText from '../common/head';
import GuestButton from '@app/_components/(guest)/common/guest-button';
import OverlaySection from '../common/overlay-section';
import Transition from '@app/_components/transitions/transitions';

const Solutions = async () => {
  const t = await getTranslations();
  const data = [
    {
      text: t('home.solutions.solution1'),
      src: '/images/guest/home/solution1.png',
      svg: HealthSVG,
    },
    {
      text: t('home.solutions.solution2'),
      src: '/images/guest/home/solution2.png',
      svg: EducationSVG,
    },
    {
      text: t('home.solutions.solution3'),
      src: '/images/guest/home/solution3.png',
      svg: FinanceSVG,
    },
  ];
  return (
    <section className={clsx('minHeightSection relative')}>
      <OverlaySection className={'bg-guestLinear'} />
      <div
        className={clsx(
          'relative z-[5px] container mx-auto flex items-center minHeightSection flex-col lg:flex-row',
          'py-sectionPadding gap-sectionGap',
        )}>
        <div className="w-[100%] flex flex-col gap-64px items-center">
          <Transition from={'up'}>
            <HeadText>{t('home.solutions.explore')}</HeadText>
          </Transition>
          <Transition from="down" className="w-full">
            <div className="flex gap-80px items-center flex-col lg:flex-row w-[100%]">
              {data.map((item, index) => {
                return (
                  <Solution
                    key={index}
                    src={item.src}
                    text={item.text}
                    SVG={item.svg}
                  />
                );
              })}
            </div>
          </Transition>
          <Transition from="down" delay={0.1}>
            <GuestButton
              className={'w-[100%] lg:w-fit'}
              link={true}
              href={'/solutions'}
              variant="light">
              {t('general.readMore')}
            </GuestButton>
          </Transition>
        </div>
      </div>
    </section>
  );
};

export default Solutions;

