import EducationSVG from '@app/_components/svgs/guest/solutions/education';
import EnterprisesSVG from '@app/_components/svgs/guest/solutions/enterprises';
import FinanceSVG from '@app/_components/svgs/guest/solutions/finance';
import GovernmentSVG from '@app/_components/svgs/guest/solutions/government';
import HealthSVG from '@app/_components/svgs/guest/solutions/health';
import HrSVG from '@app/_components/svgs/guest/solutions/hr';
import LegalSVG from '@app/_components/svgs/guest/solutions/legal';
import LibrariesSVG from '@app/_components/svgs/guest/solutions/libraries';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import Solution from '../common/solution';
import HeadText from '../common/head';

const Solutions = async () => {
  const t = await getTranslations();
  const data = [
    {
      text: t('solutions.solutions.solution1'),
      src: '/images/guest/solutions/government.png',
      icon: GovernmentSVG,
    },
    {
      text: t('solutions.solutions.solution2'),
      src: '/images/guest/solutions/legal.png',
      icon: LegalSVG,
    },
    {
      text: t('solutions.solutions.solution3'),
      src: '/images/guest/solutions/enterprises.png',
      icon: EnterprisesSVG,
    },
    {
      text: t('solutions.solutions.solution4'),
      src: '/images/guest/solutions/health.png',
      icon: HealthSVG,
    },
    {
      text: t('solutions.solutions.solution5'),
      src: '/images/guest/solutions/education.png',
      icon: EducationSVG,
    },
    {
      text: t('solutions.solutions.solution6'),
      src: '/images/guest/solutions/finance.png',
      icon: FinanceSVG,
    },
    {
      text: t('solutions.solutions.solution7'),
      src: '/images/guest/solutions/libraries.png',
      icon: LibrariesSVG,
    },
    {
      text: t('solutions.solutions.solution8'),
      src: '/images/guest/solutions/hr.png',
      icon: HrSVG,
    },
  ];
  return (
    <section className={clsx('minHeightSection relative')}>
      <div className="bg-guestLinear w-[100%] h-[100%] minHeightSection absolute top-0 left-0 z-[1px]" />
      <div
        className={clsx(
          'relative z-[5px] container mx-auto minHeightSection text-center flex flex-col items-center',
          'py-sectionPadding',
        )}>
        <HeadText>{t('solutions.solutions.head')}</HeadText>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-[64px] gap-[88px]">
          {data.map((item) => {
            return (
              <Solution
                key={item.text}
                SVG={item.icon}
                src={item.src}
                text={item.text}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solutions;

