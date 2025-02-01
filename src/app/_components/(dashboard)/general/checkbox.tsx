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
        className={clsx(
          'font-content',
          'flex items-center gap-16px',
          'hover:opacity-70 duration-500',
        )}>
        <div
          className={clsx(
            'w-[18px] h-[18px] border-[2px] border-solid border-mainColor1 relative rounded-[2px]',
            (value || alwaysTrue) && 'bg-mainColor1 border-none',
            disabled && 'opacity-35',
            disabled || alwaysTrue ? 'cursor-not-allowed' : 'cursor-pointer',
          )}
          onClick={alwaysTrue || disabled ? () => {} : () => onChange(!value)}>
          {(value || alwaysTrue) && (
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <CheckedCheckboxSVG />
            </div>
          )}
        </div>
        <label
          className={clsx(
            'text-16px text-mainColor1',
            disabled && 'opacity-35',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          )}
          htmlFor={checkboxId}>
          {label}
        </label>
      </div>
    </>
  );
};

export default Checkbox;

