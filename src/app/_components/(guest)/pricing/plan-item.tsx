import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';
import PlanItemFeature from './plan-item-feature';

const PlanItem = ({ head, price, description, featuresHead, features }) => {
  return (
    <div
      className={clsx(
        'px-[46px] py-64px rounded-[20px] gradient-borders flex flex-col items-start',
        'font-content',
      )}>
      <h2 className="text-24px font-semibold">{head}</h2>
      <h3 className="text-30px font-semibold mt-26px mb-8px">{price}</h3>
      <p className="text-18px">{description}</p>
      <p className="text-18px mt-32px mb-24px">{featuresHead}</p>
      <div className="flex flex-col gap-16px">
        {features.map((feature, index) => {
          return <PlanItemFeature key={index} text={feature} />;
        })}
      </div>
    </div>
  );
};

export default PlanItem;

