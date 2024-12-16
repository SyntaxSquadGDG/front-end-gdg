import { contentFont } from '@/app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';

const ActivityItem = () => {
  return (
    <div className="flex gap-[16px] items-start">
      <div className="overflow-hidden shrink-0">
        <img
          src="/images/defaults/employee.png"
          alt=""
          className="w-[48px] h-[48px] rounded-full overflow-hidden shrink-0"
        />
      </div>
      <div className={clsx(contentFont.className, 'flex flex-col gap-[10px]')}>
        <p className="text-[16px]">
          Ahmed add 4 files in folder (folder name) lorem ipsum dolor set amet
        </p>
        <p className="text-textGray2 text-[12px]">{'2024-1-1 2:30 P.M'}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
