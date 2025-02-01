import Transition from '@app/_components/transitions/transitions';
import { contentFont, headFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';
import { useTranslations } from 'use-intl';

const DemoFormSuccess = () => {
  const t = useTranslations();
  return (
    <Transition from={'down'}>
      <div className="flex flex-col w-[100%] items-center justify-center">
        <div>
          <img src="/images/guest/demo/success.png" alt="" />
        </div>
        <h3
          className={clsx(
            'mt-56px mb-32px text-36px font-semibold',
            'font-head',
          )}>
          {t('demo.form.successHead')}
        </h3>
        <p className={clsx('text-24px font-medium', 'font-content')}>
          {t('demo.form.successDescription')}
        </p>
      </div>
    </Transition>
  );
};

export default DemoFormSuccess;

