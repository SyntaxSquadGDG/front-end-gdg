import { getTranslations } from 'next-intl/server';
import React from 'react';
import PlanItem from './plan-item';
import HeadText from '../common/head';
import clsx from 'clsx';
import OverlaySection from '../common/overlay-section';
import Transition from '@app/_components/transitions/transitions';

const Plans = async () => {
  const t = await getTranslations();
  const plan1Features = [
    t('pricing.plans.plan1.feature1'),
    t('pricing.plans.plan1.feature2'),
    t('pricing.plans.plan1.feature3'),
  ];
  const plan2Features = [
    t('pricing.plans.plan2.feature1'),
    t('pricing.plans.plan2.feature2'),
    t('pricing.plans.plan2.feature3'),
    t('pricing.plans.plan2.feature4'),
  ];
  const plan3Features = [
    t('pricing.plans.plan3.feature1'),
    t('pricing.plans.plan3.feature2'),
    t('pricing.plans.plan3.feature3'),
    t('pricing.plans.plan3.feature4'),
    t('pricing.plans.plan3.feature5'),
  ];

  return (
    <section className={clsx('minHeightSection relative')}>
      <OverlaySection className={'bg-guestLinear'} />
      <div
        className={clsx(
          'relative z-[5px] container mx-auto minHeightSection flex flex-col items-center',
          'py-sectionPadding',
        )}>
        <Transition from="up">
          <HeadText className="text-center">{t('pricing.plans.head')}</HeadText>
        </Transition>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center gap-72px text-textLight mt-96px">
          <Transition from="down" delay={0}>
            <PlanItem
              head={t('pricing.plans.plan1.head')}
              description={t('pricing.plans.plan1.description')}
              featuresHead={t('pricing.plans.plan1.featuresHead')}
              price={t('pricing.plans.plan1.price')}
              features={plan1Features}
            />
          </Transition>
          <Transition from="down" delay={0.1}>
            <PlanItem
              head={t('pricing.plans.plan2.head')}
              description={t('pricing.plans.plan2.description')}
              featuresHead={t('pricing.plans.plan2.featuresHead')}
              price={t('pricing.plans.plan2.price')}
              features={plan2Features}
            />
          </Transition>
          <Transition from="down" delay={0.2}>
            <PlanItem
              head={t('pricing.plans.plan3.head')}
              description={t('pricing.plans.plan3.description')}
              featuresHead={t('pricing.plans.plan3.featuresHead')}
              price={t('pricing.plans.plan3.price')}
              features={plan3Features}
            />
          </Transition>
        </div>
      </div>
    </section>
  );
};

export default Plans;

