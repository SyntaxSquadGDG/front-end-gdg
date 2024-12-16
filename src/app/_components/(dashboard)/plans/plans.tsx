'use client';
import React, { useState } from 'react';
import PlanItem from './plan-item';
import clsx from 'clsx';
import { contentFont } from '@app/_utils/fonts';
import { useTranslations } from 'next-intl';
import SubscribeForm from './subscribe-form';
import TempSection from '../general/temp-section';
import { useModal } from '@app/_contexts/modal-provider';
import UnsubscribeModal from './unsubscribe-modal';
import SubscribeModal from './subscribe-modal';

const Plans = () => {
  const t = useTranslations();
  const { modalStack, openModal } = useModal();

  const [activePage, setActivePage] = useState(1);
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

  if (activePage === 1) {
    return (
      <section className={clsx('relative', contentFont.className)}>
        <div className="flex items-center justify-between xl:flex-row flex-col gap-[72px] text-mainColor1">
          <PlanItem
            head={t('pricing.plans.plan1.head')}
            description={t('pricing.plans.plan1.description')}
            featuresHead={t('pricing.plans.plan1.featuresHead')}
            price={t('pricing.plans.plan1.price')}
            features={plan1Features}
            active={true}
            setActivePage={setActivePage}
          />
          <PlanItem
            head={t('pricing.plans.plan2.head')}
            description={t('pricing.plans.plan2.description')}
            featuresHead={t('pricing.plans.plan2.featuresHead')}
            price={t('pricing.plans.plan2.price')}
            features={plan2Features}
            active={false}
            setActivePage={setActivePage}
          />
          <PlanItem
            head={t('pricing.plans.plan3.head')}
            description={t('pricing.plans.plan3.description')}
            featuresHead={t('pricing.plans.plan3.featuresHead')}
            price={t('pricing.plans.plan3.price')}
            features={plan3Features}
            active={false}
            setActivePage={setActivePage}
          />
        </div>
        <div className="flex justify-between items-start lg:items-center mt-[48px] lg:flex-row flex-col gap-[24px]">
          <h2 className={'text-[24px] font-medium'}>{t('plans.info')}</h2>
          <button
            className="text-[20px] font-bold p-[14px] rounded-[8px] border-[1px] border-solid border-black"
            onClick={() => openModal('unsubscribePlans')}>
            {t('plans.cancelButton')}
          </button>
        </div>
        <UnsubscribeModal />
        <SubscribeModal />
      </section>
    );
  }

  if (activePage === 2) {
    return <SubscribeForm setActivePage={setActivePage} />;
  }

  if (activePage === -1) {
    return (
      <TempSection
        src={'/images/plans/success.png'}
        description={t('plans.payment.successText')}
        redirect={'/dashboard'}
      />
    );
  }
};

export default Plans;

