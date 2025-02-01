import { contentFont, headFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';
import CircularIconDiv from './circular-icon-div';

const CircularInfo = ({ head, description, SVG }) => {
  return (
    <div className="flex flex-col text-center justify-center">
      <CircularIconDiv SVG={SVG} />
      <h3
        className={clsx(
          'linearGuestText2 text-24px font-semibold mt-16px mb-20px',
          'font-head',
        )}>
        {head}
      </h3>
      <p className={clsx('text-16px', 'font-content')}>{description}</p>
    </div>
  );
};

export default CircularInfo;

