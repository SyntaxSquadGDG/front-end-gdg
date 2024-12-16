import { getTranslations } from 'next-intl/server';
import React from 'react';
import PlanItem from './plan-item';
import HeadText from '../common/head';
import clsx from 'clsx';
import OverlaySection from '../common/overlay-section';

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
        <HeadText>{t('pricing.plans.head')}</HeadText>
        <div className="flex items-center justify-between gap-[72px] text-textLight mt-[92px]">
          <PlanItem
            head={t('pricing.plans.plan1.head')}
            description={t('pricing.plans.plan1.description')}
            featuresHead={t('pricing.plans.plan1.featuresHead')}
            price={t('pricing.plans.plan1.price')}
            features={plan1Features}
          />
          <PlanItem
            head={t('pricing.plans.plan2.head')}
            description={t('pricing.plans.plan2.description')}
            featuresHead={t('pricing.plans.plan2.featuresHead')}
            price={t('pricing.plans.plan2.price')}
            features={plan2Features}
          />
          <PlanItem
            head={t('pricing.plans.plan3.head')}
            description={t('pricing.plans.plan3.description')}
            featuresHead={t('pricing.plans.plan3.featuresHead')}
            price={t('pricing.plans.plan3.price')}
            features={plan3Features}
          />
        </div>
      </div>
    </section>
  );
};

export default Plans;

