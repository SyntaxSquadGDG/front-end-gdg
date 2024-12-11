import React from 'react';
import clsx from 'clsx';
import { contentFont, headFont } from '@app/_utils/fonts';

const SquareInfoBig = ({ SVG, head, description }) => {
  return (
    <div
      className={clsx(
        contentFont.className,
        'py-[32px] px-[24px] rounded-[16px] border-[1px] border-solid border-guestSecondary1 flex items-center justify-center flex-col text-center text-textLight',
      )}>
      <SVG />
      <h3
        className={clsx(
          headFont.className,
          'mt-[40px] mb-[32px] text-[20px] font-bold',
        )}>
        {head}
      </h3>
      <p className="text-[16px]">{description}</p>
    </div>
  );
};

export default SquareInfoBig;

