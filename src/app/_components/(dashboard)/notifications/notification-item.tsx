import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';

const NotificationItem = ({ head, description, time }) => {
  return (
    <div className={clsx(contentFont.className, 'flex flex-col gap-[24px]')}>
      <div className="flex justify-between items-center">
        <p className="text-[24px] font-medium">{head}</p>
        <p className="text-secondText text-[16px]">{time}</p>
      </div>
      <p className="text-[16px]">{description}</p>
    </div>
  );
};

export default NotificationItem;

