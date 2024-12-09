import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';

const RectangleInfo = ({ head, description, children }) => {
  return (
    <div className="p-[16px] rounded-[16px] border-[1px] border-solid border-guestSecondary1 flex items-center gap-[24px] max-xs:flex-col">
      <div>{children}</div>
      <div
        className={clsx(
          'flex gap-[8px] flex-col text-textLight items-start max-xs:items-center max-xs:text-center',
          contentFont.className,
        )}>
        <h3 className="text-[20px] font-medium">{head}</h3>
        <p className="text-[16px]">{description}</p>
      </div>
    </div>
  );
};

export default RectangleInfo;

