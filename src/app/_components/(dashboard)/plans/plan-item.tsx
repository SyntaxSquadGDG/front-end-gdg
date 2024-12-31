'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';
import PlanItemFeature from './plan-item-feature';
import Button from '../general/button';
import { useTranslations } from 'next-intl';
import { useModal } from '@app/_contexts/modal-provider';
import SubscribeModal from './subscribe-modal';

const PlanItem = ({
  head,
  price,
  description,
  featuresHead,
  features,
  active,
  plan,
  setActivePage,
}) => {
  const t = useTranslations();
  const { openModal, modalStack } = useModal();

  function handleSubscribeClick() {
    openModal(`subscribePlans${plan}`);
    // setActivePage(2);
  }

  function handleUnSubscribeClick() {
    openModal(`unsubscribePlans${plan}`);
    // setActivePage(2);
  }

  return (
    <div
      className={clsx(
        'px-[46px] py-[64px] rounded-[20px] border-[1px] border-solid border-mainColor1 flex flex-col items-start w-[100%]',
        contentFont.className,
      )}>
      <h2 className="text-[24px] font-semibold">{head}</h2>
      <h3 className="text-[30px] font-semibold mt-[26px] mb-[8px]">{price}</h3>
      <p className="text-[18px]">{description}</p>
      <p className="text-[18px] mt-[32px] mb-[24px]">{featuresHead}</p>
      <div className="flex flex-col gap-[16px]">
        {features.map((feature, index) => {
          return <PlanItemFeature key={index} text={feature} />;
        })}
      </div>
      <div className="mt-[32px] flex items-center justify-center w-[100%]">
        <Button
          variant={active ? 'outline' : 'fill'}
          text={active ? t('plans.cancel') : t('plans.subscribe')}
          onClick={() =>
            active ? handleUnSubscribeClick() : handleSubscribeClick()
          }
        />
      </div>

      <SubscribeModal plan={plan} />
    </div>
  );
};

export default PlanItem;

