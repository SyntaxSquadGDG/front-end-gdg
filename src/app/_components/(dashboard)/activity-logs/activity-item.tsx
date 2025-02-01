import { contentFont } from '@/app/_utils/fonts';
import { convertToChatTime } from '@app/_utils/formats';
import clsx from 'clsx';
import React from 'react';

const ActivityItem = ({ item }) => {
  return (
    <div className="flex gap-16px items-start max-xs:flex-col">
      <div className="overflow-hidden shrink-0">
        <img
          src="/images/defaults/employee.png"
          alt=""
          className="w-[48px] h-[48px] rounded-full overflow-hidden shrink-0"
        />
      </div>
      <div className={clsx('font-content', 'flex flex-col gap-10px')}>
        <p className="text-16px">{item.text}</p>
        <p className="text-textGray2 text-12px">
          {convertToChatTime(item.lastModified)}
        </p>
      </div>
    </div>
  );
};

export default ActivityItem;

