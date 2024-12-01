'use client';
import { contentFont } from '@/app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';

const StackUsers = ({ employeesCount }) => {
  return (
    <div className={clsx('flex items-center w-fit', contentFont.className)}>
      <img
        src="/images/defaults/employee.png"
        className="w-[27px] h-[27px] rounded-full border-[2px] border-solid border-[#FFFFFF] overflow-hidden"
      />
      <img
        src="/images/defaults/employee.png"
        className="w-[27px] h-[27px] rounded-full border-[2px] border-solid border-[#FFFFFF] overflow-hidden ml-[-12px]"
      />
      <img
        src="/images/defaults/employee.png"
        className="w-[27px] h-[27px] rounded-full border-[2px] border-solid border-[#FFFFFF] overflow-hidden ml-[-12px]"
      />
      <div className="text-[12px] font-medium px-[7px] py-[4px] rounded-[8px] bg-[#FFFFFF] ml-[-8px]">
        +{employeesCount - 3}
      </div>
    </div>
  );
};

export default StackUsers;

