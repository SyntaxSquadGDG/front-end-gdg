'use client';
import CheckedCheckboxSVG from '@app/_components/svgs/general/checked-checkbox';
import { contentFont } from '@app/_utils/fonts';
import clsx from 'clsx';
import React, { useId } from 'react';

const Checkbox = ({
  alwaysTrue = false,
  label,
  value,
  onChange,
  disabled = false,
}) => {
  const checkboxId = useId();

  return (
    <>
      <input
        type="checkbox"
        id={checkboxId}
        checked={alwaysTrue ? true : value ? value : false}
        className="hidden"
        disabled={disabled}
        onChange={alwaysTrue ? () => {} : (e) => onChange(e.target.checked)}
      />
      <div
        className={clsx(contentFont.className, 'flex items-center gap-[16px]')}>
        <div
          className={clsx(
            'w-[18px] h-[18px] border-[2px] border-solid border-mainColor1 relative rounded-[2px]',
            !alwaysTrue && 'cursor-pointer',
            (value || alwaysTrue) && 'bg-mainColor1 border-none',
            disabled && 'opacity-15',
          )}
          onClick={alwaysTrue ? () => {} : () => onChange(!value)}>
          {(value || alwaysTrue) && (
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <CheckedCheckboxSVG />
            </div>
          )}
        </div>
        <label
          className="text-[16px] cursor-pointer text-mainColor1"
          htmlFor={checkboxId}>
          {label}
        </label>
      </div>
    </>
  );
};

export default Checkbox;

