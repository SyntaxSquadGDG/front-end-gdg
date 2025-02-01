'use client';
import CloseModalSVG from '@app/_components/svgs/general/close-modal';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';

const CloseModalButton = ({ onClose }) => {
  return (
    <div>
      <button
        onClick={() => onClose()}
        className={clsx(
          'font-content',
          'absolute right-[10px] top-[8px] w-[26px] h-[26px] rounded-full flex items-center justify-center font-bold text-textLight bg-mainColor1 z-50 hover:opacity-70 duration-500',
        )}>
        <CloseModalSVG />
      </button>
    </div>
  );
};

export default CloseModalButton;

