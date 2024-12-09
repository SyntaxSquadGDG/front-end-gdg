import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';

const Solution = ({ text, src, SVG }) => {
  return (
    <div className="rounded-[16px] overflow-hidden relative h-[400px] flex justify-end flex-col flex-grow w-[100%]">
      <img
        src={src}
        alt=""
        className="w-[100%] h-[100%] object-cover absolute left-0 top-0"
      />
      <div
        className={clsx(
          'relative z-[5] h-[150px] w-[calc(100%-50px)] ml-auto flex items-center justify-center pl-[32px] text-mainColor1 text-[30px] font-medium  text-center',
          contentFont.className,
        )}>
        {text}
        <div className="w-[98px] h-[98px] rounded-full bg-mainColor1 flex items-center justify-center absolute right-[50%] translate-x-[50%] top-[-70px]">
          <SVG />
        </div>
      </div>
      <div className="w-[125%] h-[420px] bg-goldLinear absolute bottom-[-60%] left-[50px] rounded-[50%]" />
    </div>
  );
};

export default Solution;

