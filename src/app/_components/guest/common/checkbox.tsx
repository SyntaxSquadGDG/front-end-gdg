'use client';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React, { useId } from 'react';

const Checkbox = ({ label, value, onChange }) => {
  const checkboxId = useId();

  return (
    <>
      <input
        type="checkbox"
        id={checkboxId}
        checked={value}
        className="hidden"
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        className={clsx(contentFont.className, 'flex items-center gap-[8px]')}>
        <div
          className={clsx(
            'w-[19px] h-[19px] border-[2px] border-solid border-white relative cursor-pointer rounded-[2px]',
            value && 'bg-green-400',
          )}
          onClick={() => onChange(!value)}>
          {value && (
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              ✔
            </div>
          )}
        </div>
        <label
          className="text-[18px] text-textLight cursor-pointer"
          htmlFor={checkboxId}>
          {label}
        </label>
      </div>
    </>
  );
};

export default Checkbox;

