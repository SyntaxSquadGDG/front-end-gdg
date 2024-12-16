'use client';
import { contentFont } from '@/app/_utils/fonts';
import clsx from 'clsx';
import React from 'react';

const StackUsers = ({ employeesCount }) => {
  // Limit the number of displayed avatars to 3
  const avatarsToDisplay = Math.min(employeesCount, 3);

  return (
    <div className={clsx('flex items-center w-fit', contentFont.className)}>
      {/* Render avatars based on the number of employees */}
      {Array.from({ length: avatarsToDisplay }).map((_, index) => (
        <img
          key={index}
          src="/images/defaults/employee.png"
          className={clsx(
            'w-[27px] h-[27px] rounded-full border-[2px] border-solid border-[#FFFFFF] overflow-hidden',
            index > 0 && 'ml-[-12px]', // Apply margin-left only after the first avatar
          )}
        />
      ))}

      {/* Render "+X" only if there are more than 3 employees */}
      {employeesCount > 3 && (
        <div className="text-[12px] font-medium px-[7px] py-[4px] rounded-[8px] bg-[#FFFFFF] ml-[-8px]">
          +{employeesCount - 3}
        </div>
      )}
    </div>
  );
};

export default StackUsers;

