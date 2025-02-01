import Transition from '@app/_components/transitions/transitions';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const PlansInclude = async () => {
  const t = await getTranslations();

  const data = [
    t('pricing.include.feature1'),
    t('pricing.include.feature2'),
    t('pricing.include.feature3'),
    t('pricing.include.feature4'),
    t('pricing.include.feature5'),
    t('pricing.include.feature6'),
    t('pricing.include.feature7'),
    t('pricing.include.feature8'),
  ];

  return (
    <section className={clsx('relative py-sectionPadding')}>
      <div
        className={clsx(
          'container text-textLight flex flex-col gap-40px',
          'font-content',
        )}>
        <Transition from="left">
          <h2 className="text-40px font-semibold">
            {t('pricing.include.head')}
          </h2>
          <div className="w-[100%] bg-goldLinear h-[1px]" />
        </Transition>
        <ul className="list-disc grid grid-cols-1 md:grid-cols-2 gap-y-40px gap-x-40px pl-20px">
          {data.map((item, index) => {
            return (
              <Transition key={index} from="down" delay={index * 0.1}>
                <li className="text-20px font-medium">{item}</li>
              </Transition>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default PlansInclude;

