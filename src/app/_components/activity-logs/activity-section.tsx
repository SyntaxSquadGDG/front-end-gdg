'use client';
import React from 'react';
import ActivityItem from './activity-item';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { headFont } from '@/app/_utils/fonts';

const ActivitySection = () => {
  const t = useTranslations();
  return (
    <div
      className={clsx(
        'w-[100%] rounded-tl-[24px] rounded-br-[24px] shadow-activityLog p-[24px]',
        'xl:fixed xl:right-[32px] xl:top-[230px] xl:h-[calc(100vh-230px-32px)] overflow-y-auto xl:w-[400px]',
      )}>
      <div className="flex justify-between items-center mb-[24px]">
        <p className={clsx(headFont.className, 'text-[26px] font-medium')}>
          {t('activity.activity')}
        </p>
        <Link
          href="/activity"
          className={clsx(
            headFont.className,
            'text-[14px] font-bold underline',
          )}>
          {t('general.viewAll')}
        </Link>
      </div>
      <div className="flex flex-col gap-[16px]">
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
      </div>
    </div>
  );
};

export default ActivitySection;

