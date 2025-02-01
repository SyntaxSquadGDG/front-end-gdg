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
import useOnlineStatus from '@app/_hooks/useonline';
import Button from '../general/button';

const Plans = ({ activePlan }) => {
  const t = useTranslations();
  const { modalStack, openModal } = useModal();
  const isActivePlan = ['basic', 'pro', 'enterprise'].includes(activePlan);

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
      <section className={clsx('relative', 'font-content')}>
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 items-center gap-72px text-mainColor1">
          <PlanItem
            head={t('pricing.plans.plan1.head')}
            description={t('pricing.plans.plan1.description')}
            featuresHead={t('pricing.plans.plan1.featuresHead')}
            price={t('pricing.plans.plan1.price')}
            features={plan1Features}
            active={activePlan === 'basic'}
            setActivePage={setActivePage}
            plan={'basic'}
          />
          <PlanItem
            head={t('pricing.plans.plan2.head')}
            description={t('pricing.plans.plan2.description')}
            featuresHead={t('pricing.plans.plan2.featuresHead')}
            price={t('pricing.plans.plan2.price')}
            features={plan2Features}
            active={activePlan === 'pro'}
            setActivePage={setActivePage}
            plan={'pro'}
          />
          <PlanItem
            head={t('pricing.plans.plan3.head')}
            description={t('pricing.plans.plan3.description')}
            featuresHead={t('pricing.plans.plan3.featuresHead')}
            price={t('pricing.plans.plan3.price')}
            features={plan3Features}
            active={activePlan === 'enterprise'}
            setActivePage={setActivePage}
            plan={'enterprise'}
          />
        </div>
        {isActivePlan && (
          <div className="flex justify-between items-start lg:items-center mt-48px lg:flex-row flex-col gap-24px">
            <h2 className={'text-24px font-medium'}>{t('plans.info')}</h2>
            <Button
              variant="outline"
              onClick={() => openModal(`unsubscribePlans${activePlan}`)}
              text={t('plans.cancelButton')}
            />
            {/* <button
              className="text-20px font-bold p-14px rounded-[8px] border-[1px] border-solid border-black"
              onClick={() => openModal(`unsubscribePlans${activePlan}`)}>
              {t('plans.cancelButton')}
            </button> */}
          </div>
        )}
        <UnsubscribeModal plan={activePlan} />
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

