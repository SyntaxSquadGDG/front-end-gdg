import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';

const NotificationItem = ({ head, description, time }) => {
  return (
    <div className={clsx('font-content', 'flex gap-24px flex-col')}>
      <div className="flex justify-between items-center flex-col sm:flex-row gap-12px">
        <p className="text-24px font-medium sm:text-start text-center">
          {head}
        </p>
        <p className="text-secondText text-16px sm:text-end text-center">
          {time}
        </p>
      </div>
      <p className="text-16px sm:text-start text-center">{description}</p>
    </div>
  );
};

export default NotificationItem;

