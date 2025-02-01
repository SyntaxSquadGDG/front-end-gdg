import React from 'react';
import CircularIconDiv from './circular-icon-div';
import clsx from 'clsx';
import { contentFont } from '@app/_utils/fonts';

const SquareInfo = ({ SVG, head, description }) => {
  return (
    <div
      className={clsx(
        'font-content',
        'py-14px px-40px rounded-[16px] gradient-borders flex items-center justify-center flex-col text-center text-textLight',
      )}>
      <CircularIconDiv SVG={SVG} />
      <h3 className={clsx('mt-28px mb-10px text-24px font-semibold')}>
        {head}
      </h3>
      <p className="text-20px">{description}</p>
    </div>
  );
};

export default SquareInfo;

