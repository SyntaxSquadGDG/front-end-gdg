import React from 'react';
import clsx from 'clsx';
import { contentFont, headFont } from '@app/_utils/fonts';

const SquareInfoBig = ({ SVG, head, description }) => {
  return (
    <div
      className={clsx(
        'font-content',
        'py-32px px-24px rounded-[16px] gradient-borders flex items-center justify-center flex-col text-center text-textLight',
      )}>
      <SVG />
      <h3 className={clsx('font-head', 'mt-40px mb-32px text-20px font-bold')}>
        {head}
      </h3>
      <p className="text-16px">{description}</p>
    </div>
  );
};

export default SquareInfoBig;

