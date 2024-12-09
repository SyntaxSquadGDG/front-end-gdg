'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';

const Input = ({ readOnly, value }) => {
  return (
    <input
      type="text"
      defaultValue={value}
      readOnly={readOnly}
      className={clsx(
        readOnly && 'read-only',
        'rounded-[8px] p-[16px] text-[16px] font-normal text-black border-[1px] border-solid border-mainColor3 w-[100%] outline-none',
        contentFont.className,
      )}
    />
  );
};

export default Input;

